import { useEffect, useState } from "react";
import { useLanguage } from "../../utils/language";

export default function ATS() {

  const { t } = useLanguage();

  const [sheetRole] = useState(
    localStorage.getItem("sheetRole") || "driver"
  );

  const [sheets, setSheets] = useState([]);
  const [currentSheet, setCurrentSheet] = useState(1);

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

  useEffect(() => {

    const stored =
      JSON.parse(localStorage.getItem(`${sheetRole}_sheets`)) || [];

    setSheets(stored);

  }, [sheetRole]);

  const sheet = sheets[currentSheet - 1];

  const printSheet = () => window.print();

  return (

    <div className="min-h-screen bg-gray-100">

      <div className="p-6 space-y-4">

        {/* Title */}

        <div className="text-center">

          <h1 className="text-3xl font-bold text-red-600 tracking-wide">

            {sheetRole === "driver"
              ? t('tto.driverDutySheet')
              : t('tto.conductorDutySheet')}

          </h1>

        </div>

        {/* Header */}

        <div className="bg-white border-2 border-black rounded-lg p-4">

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">

            {[
              [
                sheetRole === "driver"
                  ? t('tto.headerFields.driverName')
                  : t('tto.headerFields.conductorName'),
                "driverName"
              ],
              [t('tto.headerFields.batchNo'), "batchNo"],
              [t('tto.headerFields.division'), "division"],
              [t('tto.headerFields.depot'), "depot"],
              [t('tto.headerFields.month'), "month"],
              [t('tto.headerFields.ttoName'), "ttoName"],
            ].map(([label,key]) => (

              <div key={key}>

                <label className="font-semibold block mb-1">
                  {label}:
                </label>

                <input
                  value={sheet?.[key] || ""}
                  readOnly
                  className="w-full border border-gray-400 rounded-md px-2 py-1
                  text-center font-bold bg-gray-100"
                />

              </div>

            ))}

          </div>

        </div>

        {/* Tools */}

        <div className="bg-white rounded-xl shadow-md p-4 flex flex-wrap gap-3 items-center">

          <button
            onClick={printSheet}
            className="px-5 py-2 rounded-lg font-semibold text-white shadow
            bg-orange-500 hover:bg-orange-600 transition"
          >
            {t('tto.print')}
          </button>

          {/* Sheet Navigation */}

          <div className="ml-auto flex items-center gap-2">
            <button
              className="px-4 py-2 rounded-lg font-semibold text-white shadow
              bg-gray-600 hover:bg-gray-700"
              onClick={() => setCurrentSheet(p => Math.max(1, p - 1))}
            >
            ◀
            </button>

            <button
            className="px-4 py-2 rounded-lg font-semibold text-white shadow
              bg-gray-600 hover:bg-gray-700"
              onClick={() => setCurrentSheet(p => Math.min(sheets.length, p + 1))}
            >
            ▶
            </button>

          </div>

        </div>

        {/* Sheet Table */}

        <div className="bg-white border-2 border-black rounded-lg overflow-x-auto">

          <table className="border-collapse w-full text-xs">

            <thead className="bg-gray-200">

              <tr>

                <th className="border border-black px-2 py-2">
                  Index
                </th>

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
                          readOnly
                          className="w-full text-center font-bold bg-gray-50 outline-none"
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

    </div>
  );
}