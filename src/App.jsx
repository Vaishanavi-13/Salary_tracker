import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { HashRouter as Router } from "react-router-dom"; // Use HashRouter

import Landing from "./Components/Landing";
import Navbar from "./Components/Navbar";
import Login from "./Components/auth/Login";
import Signup from "./Components/auth/Signup";
import TTO from "./Components/dashboard/TTO";
import ATS from "./Components/dashboard/ATS";
import OwnerRoleSelect from "./pages/OwnerRoleSelect";
import BusLoader from "./Components/BusLoader";

import { LanguageProvider } from "./utils/language";
import { getSessionUser } from "./utils/storage";

// ---------- Route Protection ----------
function ProtectedRoute({ children, role }) {
  const user = getSessionUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}

// ---------- Route Loader Wrapper ----------
function AppRoutes() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.pathname === "/") {
      setLoading(false);
      return;
    }

    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {loading && location.pathname !== "/" && <BusLoader />}
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Owner role selection */}
        <Route
          path="/role-select"
          element={
            <ProtectedRoute role="owner">
              <OwnerRoleSelect />
            </ProtectedRoute>
          }
        />

        {/* Owner sheet page */}
        <Route
          path="/tto"
          element={
            <ProtectedRoute role="owner">
              <TTO />
            </ProtectedRoute>
          }
        />

        {/* Employee dashboard */}
        <Route
          path="/ats"
          element={
            <ProtectedRoute role="employee">
              <ATS />
            </ProtectedRoute>
          }
        />

        {/* Unknown route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

// ---------- Main App ----------
export default function App() {
  return (
    <Router> {/* <-- Use HashRouter here */}
      <LanguageProvider>
        <AppRoutes />
      </LanguageProvider>
    </Router>
  );
}