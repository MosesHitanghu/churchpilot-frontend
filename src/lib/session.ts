import { normalizeUidFields, type Account } from "./api";

const SESSION_KEY = "church-admin-account";

export const getSessionAccount = (): Account | null => {
  const raw = window.localStorage.getItem(SESSION_KEY);
  if (!raw) {
    return null;
  }

  try {
    const account = normalizeUidFields(JSON.parse(raw)) as Account;
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(account));
    return account;
  } catch {
    window.localStorage.removeItem(SESSION_KEY);
    return null;
  }
};

export const setSessionAccount = (account: Account) => {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(normalizeUidFields(account)));
};

export const clearSessionAccount = () => {
  window.localStorage.removeItem(SESSION_KEY);
};
