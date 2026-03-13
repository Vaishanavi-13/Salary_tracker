import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../utils/language";
import busImage from "../assets/img4.jpg";

export default function Landing() {

  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login", { replace: true });
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (

    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center overflow-hidden">

      {/* Bus Animation */}

      <img
        src={busImage}
        alt="MSRTC Bus"
        className="bus-entry w-[450px] md:w-[550px] mb-10"
      />

      {/* Title */}

      <h1 className="text-4xl font-bold text-red-600 mb-4">
        MSRTC Duty Management System
      </h1>

      {/* Subtitle */}

      <p className="text-gray-600 text-lg">
        Smart Duty Sheet System for Drivers & Conductors
      </p>

    </div>

  );
}