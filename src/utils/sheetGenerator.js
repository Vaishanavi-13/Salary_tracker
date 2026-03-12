// Create one empty row (16 columns)
export const createEmptyRow = () => {
  const row = {};
  for (let i = 1; i <= 16; i++) {
    row[`col${i}`] = "";
  }
  return row;
};

// Create rows for a month (default 31 days)
export const createMonthRows = (days = 31) => {
  const rows = [];
  for (let i = 0; i < days; i++) {
    rows.push(createEmptyRow());
  }
  return rows;
};

// Create a single sheet
export const createSheet = ({
  sheetId,
  month = "",
  days = 31,
}) => {
  return {
    sheetId,
    month,
    rows: createMonthRows(days),
  };
};

// Create multiple sheets (example: 200 sheets)
export const createSheets = ({
  totalSheets = 200,
  daysPerSheet = 31,
}) => {
  const sheets = [];
  for (let i = 1; i <= totalSheets; i++) {
    sheets.push(
      createSheet({
        sheetId: i,
        month: "",
        days: daysPerSheet,
      })
    );
  }
  return sheets;
};