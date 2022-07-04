const KEY = "session";
export function loadSession() {
  try {
    const serializedState = localStorage.getItem(KEY);
    if (!serializedState) return '';
    return JSON.parse(serializedState);
  } catch (e) {
    return '';
  }
}

export async function saveSession(state: any) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(KEY, serializedState);
  } catch (e) {
    // Ignore
  }
}

