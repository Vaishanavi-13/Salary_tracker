import { useState } from "react";

export default function Calculator({ onClose }) {

  const [value,setValue] = useState("");

  const click = (v)=>{

    if(v==="="){
      try{
        setValue(eval(value))
      }
      catch{
        setValue("Error")
      }
    }
    else if(v==="C"){
      setValue("")
    }
    else{
      setValue(value+v)
    }
  }

  const btns=[
    "7","8","9","/",
    "4","5","6","*",
    "1","2","3","-",
    "0",".","=","+",
    "C"
  ]

  return(

    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

      <div className="bg-white p-4 rounded w-64">

        <div className="flex justify-between mb-2">

          <h2 className="font-bold">Calculator</h2>

          <button onClick={onClose}>✖</button>

        </div>

        <input
          value={value}
          readOnly
          className="w-full border p-2 mb-2 text-right"
        />

        <div className="grid grid-cols-4 gap-2">

          {btns.map((b,i)=>(
            <button
              key={i}
              onClick={()=>click(b)}
              className="bg-gray-200 p-2 rounded"
            >
              {b}
            </button>
          ))}

        </div>

      </div>

    </div>
  );
}