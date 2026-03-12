import { useEffect, useState } from "react";
import { useLanguage } from "../../utils/language";
import Calculator from "../calculator/Calculator";
import TimeCalculator from "../calculator/TimeCalculator";

export default function TTO() {

  const { t } = useLanguage();

  const [sheetRole] = useState(
    localStorage.getItem("sheetRole") || "driver"
  );

  const [sheets, setSheets] = useState([]);
  const [currentSheet, setCurrentSheet] = useState(1);
  const [showCalc, setShowCalc] = useState(false);
  const [showTimeCalc, setShowTimeCalc] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#000000");

  const columnKeys = [
    "date","start","end","total","serviceNo","route","vehicleNo",
    "dutyType","shift","overtime","night","outstation","fuel",
    "kmStart","kmEnd","kmTotal","allowance","sign","remark","other"
  ];

  const columnNames = columnKeys.map(k => {
    const trans = t(`tto.columns.${k}`);
    if (trans && trans !== `tto.columns.${k}`) return trans;
    return k.replace(/([A-Z])/g, " $1").replace(/^./, s=>s.toUpperCase());
  });

  // Load Sheets
  useEffect(() => {

    const stored =
      JSON.parse(localStorage.getItem(`${sheetRole}_sheets`)) || [];

    setSheets(stored);

  }, [sheetRole]);

  const sheetIndex = sheets.findIndex(s => s.sheetId === currentSheet);
  const sheet = sheetIndex !== -1 ? sheets[sheetIndex] : null;

  const createEmptySheet = (id) => {

    const emptyRow = (i) =>
      Object.fromEntries(
        columnKeys.map(k => [k, k === "date" ? String(i+1) : ""])
      );

    const currentUser =
      JSON.parse(localStorage.getItem("currentUser")) || {};

    return {
      sheetId: id,
      driverName: "",
      batchNo: "",
      division: currentUser.division || "",
      depot: currentUser.depot || "",
      month: "",
      ttoName: currentUser.name || "",
      rows: Array.from({ length: 30 }, (_, i) => emptyRow(i)),
      colors: {}
    };
  };

  useEffect(() => {

    if (sheetIndex === -1) {

      const newSheet = createEmptySheet(currentSheet);

      const updated = [...sheets, newSheet];

      setSheets(updated);

      localStorage.setItem(
        `${sheetRole}_sheets`,
        JSON.stringify(updated)
      );

    }

  }, [currentSheet, sheetIndex, sheets, sheetRole]);

  const saveSheets = (updated) => {

    setSheets(updated);

    localStorage.setItem(
      `${sheetRole}_sheets`,
      JSON.stringify(updated)
    );

  };

  const updateHeader = (field, value) => {

    const updated = [...sheets];

    updated[sheetIndex][field] = value;

    saveSheets(updated);
  };

  const updateCell = (rowIndex, colKey, value) => {

    const updated = [...sheets];

    updated[sheetIndex].rows[rowIndex][colKey] = value;

    const cellKey = `${rowIndex}-${colKey}`;

    updated[sheetIndex].colors[cellKey] = selectedColor;

    saveSheets(updated);
  };

  const addRow = () => {

    const updated = [...sheets];

    const empty =
      Object.fromEntries(
        columnKeys.map(k => [
          k,
          k === "date"
            ? String(updated[sheetIndex].rows.length + 1)
            : ""
        ])
      );

    updated[sheetIndex].rows.push(empty);

    saveSheets(updated);
  };

  const printSheet = () => window.print();

  return (

    <div className="min-h-screen bg-gray-100">

      <div className="p-6 space-y-4">

        {/* Role Title */}

      <div className="text-center">
            <h1 className="text-3xl font-bold text-red-600 tracking-wide">
              {sheetRole === "driver" ? t('tto.driverDutySheet') : t('tto.conductorDutySheet')}
            </h1>

      </div>

        {/* Header */}

<div className="bg-white border-2 border-black rounded-lg p-4">

  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">

    {[
  [
    sheetRole === "driver" ? t('tto.headerFields.driverName') : t('tto.headerFields.conductorName'),
    "driverName"
  ],
  [t('tto.headerFields.batchNo'), "batchNo"],
  [t('tto.headerFields.division'), "division"],
  [t('tto.headerFields.depot'), "depot"],
  [t('tto.headerFields.month'), "month"],
  [t('tto.headerFields.ttoName'), "ttoName"],
].map(([label,key])=>(

      <div key={key}>

        <label className="font-semibold block mb-1">{label}:</label>

        <input
          value={sheet?.[key] || ""}
          onChange={(e)=>updateHeader(key,e.target.value)}
          className="w-full border border-gray-400 rounded-md px-2 py-1 text-center font-bold
          focus:outline-none focus:ring-2 focus:ring-red-400"
        />

      </div>

    ))}

  </div>

</div>

        {/* Tools */}

        <div className="bg-white rounded-xl shadow-md p-4 flex flex-wrap gap-3 items-center">

          <button
            onClick={addRow}
            className="px-5 py-2 rounded-lg font-semibold text-white shadow
            bg-red-600 hover:bg-red-700 hover:scale-105 transition-all duration-200"
          >
            {t('tto.addRow')}
          </button>

          <button
            onClick={printSheet}
            className="px-5 py-2 rounded-lg font-semibold text-white shadow
            bg-orange-500 hover:bg-orange-600 hover:scale-105 transition-all duration-200"
          >
            {t('tto.print')}
          </button>

          <button
            onClick={()=>setShowTimeCalc(true)}
            className="px-5 py-2 rounded-lg font-semibold text-white shadow
            bg-yellow-500 hover:bg-yellow-600 hover:scale-105 transition-all duration-200"
          >
            {t('tto.timeCalc')}
          </button>

          <button
            onClick={()=>setShowCalc(true)}
            className="px-5 py-2 rounded-lg font-semibold text-white shadow
            bg-green-600 hover:bg-green-700 hover:scale-105 transition-all duration-200"
          >
            {t('tto.calc')}
          </button>

          {/* Color Picker */}

          <div className="relative flex items-center">

            <button
              className="flex items-center gap-3 px-5 py-2 rounded-lg font-semibold text-white shadow
              bg-purple-600 hover:bg-purple-700 hover:scale-105 transition-all duration-200"
            >
              {t('tto.textColor')}

              <span
                className="w-6 h-6 rounded border-2 border-white"
                style={{ backgroundColor: selectedColor }}
              ></span>

            </button>

            <input
              type="color"
              value={selectedColor}
              onChange={(e)=>setSelectedColor(e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />

          </div>

          {/* Sheet Navigation */}

          <div className="ml-auto flex items-center gap-2">

            <button
              onClick={()=>setCurrentSheet(p=>Math.max(1,p-1))}
              className="px-4 py-2 rounded-lg font-semibold text-white shadow
              bg-gray-600 hover:bg-gray-700 transition"
            >
              ◀
            </button>

            <span className="font-bold text-gray-700 px-2">
              {t('tto.sheetLabel')} {currentSheet}
            </span>

            <button
              onClick={()=>setCurrentSheet(p=>p+1)}
              className="px-4 py-2 rounded-lg font-semibold text-white shadow
              bg-gray-600 hover:bg-gray-700 transition"
            >
              ▶
            </button>

          </div>

        </div>

        {/* Sheet */}

        <div className="bg-white border-2 border-black rounded-lg overflow-x-auto">

          <table className="border-collapse w-full text-xs">

            <thead className="bg-gray-200">

              <tr>

                <th className="border border-black px-2 py-2">Index</th>

                {columnNames.map((label,i)=>(
                  <th key={i} className="border border-black px-2 py-2">
                    {label}
                  </th>
                ))}

              </tr>

            </thead>

            <tbody>

              {sheet?.rows.map((row,rIndex)=>(
                <tr key={rIndex}>

                  <td className="border border-black text-center font-bold bg-gray-100">
                    {rIndex+1}
                  </td>

                  {Object.entries(row).map(([key,cell],cIndex)=>{

                    const cellKey=`${rIndex}-${key}`;

                    const cellColor =
                      sheet?.colors?.[cellKey] || "black";

                    return(

                      <td key={cIndex} className="border border-black">

                        <input
                          value={cell}
                          onChange={(e)=>
                            updateCell(rIndex,key,e.target.value)
                          }
                          className="w-full text-center font-bold outline-none"
                          style={{color:cellColor}}
                        />

                      </td>

                    )

                  })}

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

      {showCalc && <Calculator onClose={()=>setShowCalc(false)} />}
      {showTimeCalc && <TimeCalculator onClose={()=>setShowTimeCalc(false)} />}

    </div>
  );
}