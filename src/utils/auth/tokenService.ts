let memoryAccessToken: string | null = null;

// 🔥 NEW: Redux sync callback
let reduxSyncCallback: ((token: string | null) => void) | null = null;

export function getMemoryAccessToken(): string | null {
  return memoryAccessToken;
}

export function setMemoryAccessToken(token: string | null) {
  memoryAccessToken = token;

  // 🔥 whenever axios sets a token → update Redux also
  if (reduxSyncCallback) {
    reduxSyncCallback(token);
  }
}

export function clearMemoryAccessToken() {
  memoryAccessToken = null;

  // 🔥 sync Redux on logout
  if (reduxSyncCallback) {
    reduxSyncCallback(null);
  }
}

// 🔥 NEW: store.ts will call this once during app startup
export function registerReduxSyncCallback(cb: (token: string | null) => void) {
  reduxSyncCallback = cb;
}
