type StorageKind = 'local' | 'session';

const getStorage = (kind: StorageKind): Storage | null => {
  if (typeof window === 'undefined') return null;

  try {
    return kind === 'local' ? window.localStorage : window.sessionStorage;
  } catch {
    // Storage can be blocked by browser privacy settings or sandboxed pages.
    return null;
  }
};

export const getStoredValue = (
  key: string,
  kind: StorageKind = 'local'
): string | null => {
  try {
    return getStorage(kind)?.getItem(key) ?? null;
  } catch {
    return null;
  }
};

export const setStoredValue = (
  key: string,
  value: string,
  kind: StorageKind = 'local'
): void => {
  try {
    getStorage(kind)?.setItem(key, value);
  } catch {
    // Persistence is optional; keep the in-memory state working.
  }
};

export const removeStoredValue = (
  key: string,
  kind: StorageKind = 'local'
): void => {
  try {
    getStorage(kind)?.removeItem(key);
  } catch {
    // Persistence is optional.
  }
};
