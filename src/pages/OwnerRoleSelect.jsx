import { useNavigate } from "react-router-dom";

export default function OwnerRoleSelect() {

  const navigate = useNavigate();

  const handleDriver = () => {
    localStorage.setItem("sheetRole", "driver");
    navigate("/tto");
  };

  const handleConductor = () => {
    localStorage.setItem("sheetRole", "conductor");
    navigate("/tto");
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-lg shadow-lg text-center">

        <h2 className="text-2xl font-bold mb-6">
          Select Sheet Type
        </h2>

        <div className="flex gap-4">

          <button
            onClick={handleDriver}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Driver Sheet
          </button>

          <button
            onClick={handleConductor}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Conductor Sheet
          </button>

        </div>

      </div>

    </div>

  );
}