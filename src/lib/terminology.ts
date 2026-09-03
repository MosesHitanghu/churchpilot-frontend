import { useEffect, useMemo, useState } from "react";

import { api } from "./api";

export type TerminologyKey =
  | "location"
  | "locations"
  | "zone"
  | "zones"
  | "missionalFamily"
  | "missionalFamilies"
  | "particulars"
  | "remissions"
  | "branches";

export type TerminologySettings = Record<TerminologyKey, string>;

export const terminologyDefaults: TerminologySettings = {
  location: "Location",
  locations: "Locations",
  zone: "Zone",
  zones: "Zones",
  missionalFamily: "Missional Family",
  missionalFamilies: "Missional Families",
  particulars: "Particulars",
  remissions: "Remissions",
  branches: "Branches",
};

export const terminologyOptions: {
  key: TerminologyKey;
  label: string;
}[] = [
  { key: "location", label: "Location" },
  { key: "locations", label: "Locations" },
  { key: "zone", label: "Zone" },
  { key: "zones", label: "Zones" },
  { key: "missionalFamily", label: "Missional Family" },
  { key: "missionalFamilies", label: "Missional Families" },
  { key: "particulars", label: "Particulars" },
  { key: "remissions", label: "Remissions" },
  { key: "branches", label: "Branches" },
];

export const terminologyChangedEvent = "churchpilot:terminology-changed";
export const terminologyMaxLength = 20;

function terminologyStorageKey(ministryId?: string | null) {
  return ministryId ? `churchpilot:terminology:${ministryId}` : "";
}

function cleanTerminologyValue(value: unknown, fallback: string) {
  if (typeof value !== "string") {
    return fallback;
  }
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, terminologyMaxLength) : fallback;
}

/**
 * Turn a (usually plural) term into its singular form. Handles the irregular
 * cases in the default vocabulary — e.g. "Missional Families" -> "Missional
 * Family", "Branches" -> "Branch" — so consumers never hand-roll `.replace()`.
 */
export function singularize(word: string): string {
  if (!word) {
    return word;
  }
  if (/ies$/i.test(word)) {
    return word.replace(/ies$/i, "y");
  }
  if (/(s|x|z|ch|sh)es$/i.test(word)) {
    return word.replace(/es$/i, "");
  }
  if (/ss$/i.test(word)) {
    return word;
  }
  if (/s$/i.test(word)) {
    return word.replace(/s$/i, "");
  }
  return word;
}

/**
 * Turn a term into its plural form. Idempotent for values that are already
 * plural (e.g. "Zones", "Missional Families" are returned unchanged) so it is
 * safe regardless of whether a ministry typed a singular or plural word.
 */
export function pluralize(word: string): string {
  if (!word) {
    return word;
  }
  if (/s$/i.test(word)) {
    return word;
  }
  if (/[^aeiou]y$/i.test(word)) {
    return word.replace(/y$/i, "ies");
  }
  if (/(x|z|ch|sh)$/i.test(word)) {
    return `${word}es`;
  }
  return `${word}s`;
}

function mergeTerminology(
  partial: Partial<TerminologySettings> | null | undefined,
): TerminologySettings {
  const withLegacyFallbacks = {
    ...partial,
    locations: partial?.locations ?? pluralize(partial?.location || ""),
    zone: partial?.zone ?? singularize(partial?.zones || ""),
    missionalFamily:
      partial?.missionalFamily ?? singularize(partial?.missionalFamilies || ""),
  };
  return terminologyOptions.reduce<TerminologySettings>(
    (settings, option) => ({
      ...settings,
      [option.key]: cleanTerminologyValue(
        withLegacyFallbacks?.[option.key],
        terminologyDefaults[option.key],
      ),
    }),
    terminologyDefaults,
  );
}

export function loadTerminology(ministryId?: string | null): TerminologySettings {
  const key = terminologyStorageKey(ministryId);
  if (!key) {
    return terminologyDefaults;
  }
  try {
    const stored = window.localStorage.getItem(key);
    if (!stored) {
      return terminologyDefaults;
    }
    const parsed = JSON.parse(stored) as Partial<TerminologySettings>;
    return mergeTerminology(parsed);
  } catch {
    return terminologyDefaults;
  }
}

function writeTerminologyCache(ministryId: string, settings: TerminologySettings) {
  try {
    window.localStorage.setItem(
      terminologyStorageKey(ministryId),
      JSON.stringify(settings),
    );
  } catch {
    // Ignore storage access errors; state still reflects the change.
  }
  window.dispatchEvent(
    new CustomEvent(terminologyChangedEvent, { detail: { ministryId } }),
  );
}

/**
 * Fetch the authoritative wording for a ministry from the server. Returns the
 * merged settings, or `null` when the ministry has no custom wording / on error.
 */
export async function fetchTerminology(
  ministryId?: string | null,
): Promise<TerminologySettings | null> {
  if (!ministryId) {
    return null;
  }
  try {
    const response = await api.get<{ terminology: Partial<TerminologySettings> | null }>(
      `/accounts/${ministryId}/terminology`,
    );
    const remote = response.data?.terminology;
    if (!remote) {
      return null;
    }
    return mergeTerminology(remote);
  } catch {
    return null;
  }
}

/**
 * Persist wording for a ministry. Updates the local cache immediately (so the UI
 * reflects the change without waiting for the network) then writes to the server.
 * Rejects if the server write fails — the cache stays updated so the UI is
 * consistent, and callers can surface the error.
 */
export async function saveTerminology(
  ministryId: string,
  settings: TerminologySettings,
  requesterId: string = ministryId,
): Promise<void> {
  const sanitized = mergeTerminology(settings);
  writeTerminologyCache(ministryId, sanitized);
  await api.patch(`/accounts/${ministryId}/terminology`, {
    requester_id: requesterId,
    terminology: sanitized,
  });
}

export function useTerminology(ministryId?: string | null) {
  const [settings, setSettings] = useState<TerminologySettings>(() =>
    loadTerminology(ministryId),
  );

  useEffect(() => {
    let active = true;
    setSettings(loadTerminology(ministryId));

    // Refresh from the server (source of truth) and update the cache.
    fetchTerminology(ministryId).then((remote) => {
      if (!active || !remote || !ministryId) {
        return;
      }
      writeTerminologyCache(ministryId, remote);
      setSettings(remote);
    });

    const handleTerminologyChange = (event: Event) => {
      const detail = (event as CustomEvent<{ ministryId?: string }>).detail;
      if (!detail?.ministryId || detail.ministryId === ministryId) {
        setSettings(loadTerminology(ministryId));
      }
    };
    window.addEventListener(terminologyChangedEvent, handleTerminologyChange);
    window.addEventListener("storage", handleTerminologyChange);
    return () => {
      active = false;
      window.removeEventListener(
        terminologyChangedEvent,
        handleTerminologyChange,
      );
      window.removeEventListener("storage", handleTerminologyChange);
    };
  }, [ministryId]);

  return useMemo(
    () => ({
      settings,
      term: (key: TerminologyKey) => settings[key],
      termOne: (key: TerminologyKey) => singularize(settings[key]),
      termMany: (key: TerminologyKey) => pluralize(settings[key]),
    }),
    [settings],
  );
}
