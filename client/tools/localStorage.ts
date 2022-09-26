const KEY = "access_token";

export const loadToken = () => {
  try {
    const serializedState = localStorage.getItem(KEY);
    if (!serializedState) return "";
    return JSON.parse(serializedState);
  } catch (e) {
    return "";
  }
};

export const saveToken = async (token: any) => {
  try {
    const serializedState = JSON.stringify(token);
    localStorage.setItem(KEY, serializedState);
  } catch (e) {
    // Ignore
  }
};

export const deletToken = () => {
  localStorage.removeItem(KEY);
};
