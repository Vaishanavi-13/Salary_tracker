export default function ExcelTable({ rows = [], onCellChange, readOnly=false }) {
  const columns = Array.from({ length: 16 }, (_, i) => `col${i + 1}`);

  return (
    <div className="overflow-x-auto border rounded-lg bg-white">
      <table className="border-collapse w-full text-sm">
        
        {/* Header */}
        <thead className="bg-gray-200 sticky top-0 z-10">
          <tr>
            {columns.map((col, i) => (
              <th
                key={col}
                className="border border-gray-400 px-3 py-2 font-semibold text-center"
              >
                Col {i + 1}
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={16}
                className="text-center py-8 text-gray-500"
              >
                No data available
              </td>
            </tr>
          ) : (
            rows.map((row, rIndex) => (
              <tr key={rIndex} className="odd:bg-white even:bg-gray-50">
                {columns.map((colKey, cIndex) => (
                  <td
                    key={cIndex}
                    className="border border-gray-300 px-2 py-1"
                  >
                    <input
                      type="text"
                      value={row[colKey] || ""}
                      readOnly={readOnly}
                      onChange={(e) =>
                        onCellChange &&
                        onCellChange(rIndex, colKey, e.target.value)
                      }
                      className={`
                        w-full bg-transparent outline-none
                        ${readOnly ? "cursor-default" : "focus:bg-yellow-50"}
                      `}
                    />
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>

      </table>
    </div>
  );
}