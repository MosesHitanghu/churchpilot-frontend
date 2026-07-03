import { useEffect, useMemo, useState } from "react";

export type TerminologyKey =
  | "location"
  | "zones"
  | "missionalFamilies"
  | "particulars"
  | "remissions"
  | "branches";

export type TerminologySettings = Record<TerminologyKey, string>;

export const terminologyDefaults: TerminologySettings = {
  location: "Location",
  zones: "Zones",
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
  { key: "zones", label: "Zones" },
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
    return terminologyOptions.reduce<TerminologySettings>(
      (settings, option) => ({
        ...settings,
        [option.key]: cleanTerminologyValue(
          parsed[option.key],
          terminologyDefaults[option.key],
        ),
      }),
      terminologyDefaults,
    );
  } catch {
    return terminologyDefaults;
  }
}

export function saveTerminology(
  ministryId: string,
  settings: TerminologySettings,
) {
  const sanitized = terminologyOptions.reduce<TerminologySettings>(
    (nextSettings, option) => ({
      ...nextSettings,
      [option.key]: cleanTerminologyValue(
        settings[option.key],
        terminologyDefaults[option.key],
      ),
    }),
    terminologyDefaults,
  );
  window.localStorage.setItem(
    terminologyStorageKey(ministryId),
    JSON.stringify(sanitized),
  );
  window.dispatchEvent(
    new CustomEvent(terminologyChangedEvent, { detail: { ministryId } }),
  );
}

export function useTerminology(ministryId?: string | null) {
  const [settings, setSettings] = useState<TerminologySettings>(() =>
    loadTerminology(ministryId),
  );

  useEffect(() => {
    setSettings(loadTerminology(ministryId));
    const handleTerminologyChange = (event: Event) => {
      const detail = (event as CustomEvent<{ ministryId?: string }>).detail;
      if (!detail?.ministryId || detail.ministryId === ministryId) {
        setSettings(loadTerminology(ministryId));
      }
    };
    window.addEventListener(terminologyChangedEvent, handleTerminologyChange);
    window.addEventListener("storage", handleTerminologyChange);
    return () => {
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
    }),
    [settings],
  );
}
