import { useState } from "react";

export default function TimeCalculator({ onClose }) {

  const [start,setStart]=useState("");
  const [end,setEnd]=useState("");
  const [result,setResult]=useState("");

  const calc=()=>{

    if(!start||!end)return;

    const s=start.split(":");
    const e=end.split(":");

    const sm=+s[0]*60 + +s[1];
    const em=+e[0]*60 + +e[1];

    let diff=em-sm;

    if(diff<0) diff+=1440;

    const h=Math.floor(diff/60);
    const m=diff%60;

    setResult(`${h} hr ${m} min`);
  }

  return(

    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

      <div className="bg-white p-5 rounded w-80">

        <div className="flex justify-between mb-3">

          <h2 className="font-bold">Time Calculator</h2>

          <button onClick={onClose}>✖</button>

        </div>

        <input
          type="time"
          value={start}
          onChange={(e)=>setStart(e.target.value)}
          className="border p-2 w-full mb-2"
        />

        <input
          type="time"
          value={end}
          onChange={(e)=>setEnd(e.target.value)}
          className="border p-2 w-full mb-2"
        />

        <button
          onClick={calc}
          className="bg-blue-600 text-white w-full p-2 rounded"
        >
          Calculate
        </button>

        {result && (
          <div className="text-center font-bold mt-3">
            {result}
          </div>
        )}

      </div>

    </div>
  );
}