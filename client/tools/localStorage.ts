const KEY = "access_token";

export const loadToken = () => {
  try {
    const serializedState = localStorage.getItem(KEY);
    if (!serializedState) return "";
    return JSON.parse(serializedState);
  } catch (e) {
    return '';
  }
};

export const saveToken =  (token: any) => {
  try {
    const serializedState =  JSON.stringify(token);
    localStorage.setItem(KEY, serializedState);
  } catch (e) {
    // Ignore
    console.log(e);
  }
};

export const deletToken = () => {
  localStorage.removeItem(KEY);
};
