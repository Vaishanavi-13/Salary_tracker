import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLanguage } from "../../utils/language";

export default function Login() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.email === form.email && u.password === form.password
    );

    if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user)); // ✅ Save logged-in user
        navigate("tto"); // go to TTO page
      } else {
      alert("Invalid credentials");
    }


    localStorage.setItem("sessionUser", JSON.stringify(user));
    

    if (user.role === "owner") {
    navigate("/role-select");   // TTO goes here
  } else {
    navigate("/ats");           // Employee
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-msrtc-light">
      {/* Card */}
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl overflow-hidden border-t-4 border-msrtc-red">
        {/* Header */}
        <div className="bg-msrtc-red text-white text-center py-5 px-6">
          {/* logo placeholder - put msrtc-logo.svg in public/ */}
          <img src="/img3.png" alt="MSRTC" className="h-12 w-auto mx-auto mb-2" />
              <h1 className="text-2xl font-bold tracking-wide">
            {t('login.title')}
          </h1>
          <p className="text-sm opacity-90">
            Maharashtra State Transport Division
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="p-8 space-y-5">
          
          <div>
            <label className="block text-sm font-semibold mb-1">
              {t('login.email')}
            </label>
            <input
              type="email"
              name="email"
              required
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder={t('login.emailPlaceholder')}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              {t('login.password')}
            </label>
            <input
              type="password"
              name="password"
              required
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder={t('login.passwordPlaceholder')}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-msrtc-blue hover:bg-msrtc-red text-white
                       font-semibold py-2.5 rounded-lg transition duration-200 shadow-md"
          >
            {t('login.loginButton')}
          </button>

          <p className="text-center text-sm">
            {t('login.noAccount')}{' '}
            <Link to="/signup" className="text-msrtc-red font-semibold hover:underline">
              {t('login.signup')}
            </Link>
          </p>
        </form>

        {/* Footer */}
        <div className="bg-gray-50 text-center text-xs text-gray-600 py-3">
          © {new Date().getFullYear()} Maharashtra State Transport — Salary System
        </div>
      </div>
    </div>
  );
}