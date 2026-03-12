// ---------- Generic Helpers ----------
export const saveData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const loadData = (key, defaultValue = null) => {
  try {
    const data = JSON.parse(localStorage.getItem(key));
    return data ?? defaultValue;
  } catch {
    return defaultValue;
  }
};

export const removeData = (key) => {
  localStorage.removeItem(key);
};

// ---------- Users ----------
export const getUsers = () => loadData("users", []);

export const saveUsers = (users) => saveData("users", users);

export const addUser = (user) => {
  const users = getUsers();
  users.push(user);
  saveUsers(users);
};

// ---------- Session ----------
export const getSessionUser = () => loadData("sessionUser", null);

export const setSessionUser = (user) => saveData("sessionUser", user);

export const clearSession = () => removeData("sessionUser");

// ---------- Sheets ----------
export const getSheets = () => loadData("sheets", []);

export const saveSheets = (sheets) => saveData("sheets", sheets);

export const updateSheet = (updatedSheet) => {
  const sheets = getSheets();
  const index = sheets.findIndex(s => s.sheetId === updatedSheet.sheetId);

  if (index !== -1) sheets[index] = updatedSheet;
  else sheets.push(updatedSheet);

  saveSheets(sheets);
};