import { createContext, useContext, useEffect, useState } from "react";

const translations = {
  en: {
    navbarTitle: "Salary Register System",
    navbarSubtitle: "Maharashtra State Transport Division",
    navbar: { logout: "Logout" },
    landing: { welcome: "Welcome to MSRTC Salary System" },
    login: {
      title: "Salary Register Portal",
      email: "Email Address",
      password: "Password",
      loginButton: "Login",
      noAccount: "Don’t have an account?",
      signup: "Sign Up",
      invalidCredentials: "Invalid credentials",
      emailPlaceholder: "Enter your email",
      passwordPlaceholder: "Enter your password",
    },
    signup: {
      title: "Create Account",
      name: "Full Name",
      email: "Email Address",
      password: "Password",
      division: "Division",
      depot: "Depot",
      role: "Role",
      tto: "ATS",
      owner: "TTO",
      createAccount: "Create Account",
      haveAccount: "Already have an account?",
      login: "Login",
      userExists: "User already exists with this email",
      accountCreated: "Account created successfully",
      placeholder: "Enter ${label}",
    },
    ats: {
      title: "Salary Register Dashboard",
      subtitle: "Maharashtra State Transport Division — View Only",
      sheetTitle: "Sheet 1 — Monthly Records",
      readOnly: "Read Only Mode",
      noRecords: "No records available",
    },
    tto: {
      header: "Maharashtra State Transport — Salary Register",
      subheader: "Traffic & Transport Office (TTO)",
      driverDutySheet: "Driver Duty Sheet",
      conductorDutySheet: "Conductor Duty Sheet",
      addRow: "+ Add Row",
      print: "🖨 Print",
      timeCalc: "🕒 Time Calculator",
      calc: "🧮 Calculator",
      textColor: "Text Color",
      sheetLabel: "Sheet",
      headerFields: {
        driverName: "Driver Name",
        conductorName: "Conductor Name",
        batchNo: "Batch No",
        division: "Division",
        depot: "Depo",
        month: "Month",
        ttoName: "TTO Name",
      },
      columns: {
        date: "Date",
        start: "Start",
        end: "End",
        total: "Total",
        serviceNo: "Service No",
        route: "Route",
        vehicleNo: "Vehicle No",
        dutyType: "Duty Type",
        shift: "Shift",
        overtime: "Overtime",
        night: "Night",
        outstation: "Outstation",
        fuel: "Fuel",
        kmStart: "KM Start",
        kmEnd: "KM End",
        kmTotal: "KM Total",
        allowance: "Allowance",
        sign: "Sign",
        remark: "Remark",
        other: "Other",
      }
    },
  },
  mr: {
    navbarTitle: "पगार नोंद प्रणाली",
    navbarSubtitle: "महाराष्ट्र राज्य परिवहन विभाग",
    navbar: { logout: "बाहेर पडा" },
    landing: { welcome: "MSRTC पगार प्रणालीमध्ये स्वागत आहे" },
    login: {
      title: "पगार नोंद पोर्टल",
      email: "ईमेल पत्ता",
      password: "पासवर्ड",
      loginButton: "लॉगिन",
      noAccount: "खाते नाही का?",
      signup: "नोंदणी करा",
      invalidCredentials: "अवैध प्रमाणपत्रे",
      emailPlaceholder: "आपला ईमेल टाका",
      passwordPlaceholder: "आपला पासवर्ड टाका",
    },
    signup: {
      title: "खाते तयार करा",
      name: "पूर्ण नाव",
      email: "ईमेल पत्ता",
      password: "पासवर्ड",
      division: "विभाग",
      depot: "डेपो",
      role: "भूमिका",
      tto: "एटीएस",
      owner: "टिटिओ",
      createAccount: "खाते तयार करा",
      haveAccount: "आधीच खाते आहे?",
      login: "लॉगिन",
      userExists: "या ईमेलने आधीच वापरकर्ता आहे",
      accountCreated: "खाते यशस्वीरित्या तयार केले",
      placeholder: "${label} टाका",
    },
    ats: {
      title: "पगार नोंद डॅशबोर्ड",
      subtitle: "महाराष्ट्र राज्य परिवहन विभाग — फक्त पहा",
      sheetTitle: "शीट 1 — मासिक नोंदी",
      readOnly: "केवळ वाचन मोड",
      noRecords: "कोणतीही नोंदी उपलब्ध नाहीत",
    },
    tto: {
      header: "महाराष्ट्र राज्य परिवहन — पगार नोंद",
      subheader: "ट्राफिक आणि वाहतूक कार्यालय (TTO)",
      driverDutySheet: "चालक ड्युटी शीट",
      conductorDutySheet: "वाहक ड्युटी शीट",
      addRow: "+ ओळ जोडा",
      print: "🖨 छापा",
      timeCalc: "🕒 वेळ कॅल्क्युलेटर",
      calc: "🧮 कॅल्क्युलेटर",
      textColor: "मजकूर रंग",
      sheetLabel: "शीट",
      headerFields: {
        driverName: "चालकाचे नाव",
        conductorName: "वाहकाचे नाव",
        batchNo: "बॅच क्र.",
        division: "विभाग",
        depot: "डेपो",
        month: "महिना",
        ttoName: "TTO नाव",
      },
      columns: {
        date: "तारीख",
        start: "सुरू",
        end: "समाप्त",
        total: "एकूण",
        serviceNo: "सेवा क्र.",
        route: "मार्ग",
        vehicleNo: "वाहन क्र.",
        dutyType: "कर्तव्य प्रकार",
        shift: "शिफ्ट",
        overtime: "ओव्हरटाइम",
        night: "रात्र",
        outstation: "ऑउटस्टेशन",
        fuel: "इंधन",
        kmStart: "किमी सुरू",
        kmEnd: "किमी समाप्त",
        kmTotal: "किमी एकूण",
        allowance: "भत्ता",
        sign: "स्वाक्षरी",
        remark: "नोट",
        other: "इतर",
      }
    },
  },
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const stored = localStorage.getItem("lang");
    if (stored) setLang(stored);
  }, []);

  const toggleLang = () => {
    const newLang = lang === "en" ? "mr" : "en";
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  const t = (key) => {
    const parts = key.split(".");
    let node = translations[lang];
    for (const p of parts) {
      if (node && node[p] != null) node = node[p];
      else {
        node = null;
        break;
      }
    }
    if (typeof node === "string") return node;
    // fallback to key when not found
    return key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
