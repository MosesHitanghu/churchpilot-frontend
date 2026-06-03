import { normalizeUidFields, type Account } from "./api";

const SESSION_KEY = "church-admin-account";

export const getSessionAccount = (): Account | null => {
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) {
      return null;
    }

    const account = normalizeUidFields(JSON.parse(raw)) as Account;
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(account));
    return account;
  } catch {
    try {
      window.localStorage.removeItem(SESSION_KEY);
    } catch {
      // Ignore storage access errors so the app can still render.
    }
    return null;
  }
};

export const setSessionAccount = (account: Account) => {
  try {
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(normalizeUidFields(account)));
  } catch {
    // Ignore storage access errors. The current render can still use state.
  }
};

export const clearSessionAccount = () => {
  try {
    window.localStorage.removeItem(SESSION_KEY);
  } catch {
    // Ignore storage access errors during logout.
  }
};
