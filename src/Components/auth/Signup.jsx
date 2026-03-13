import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLanguage } from "../../utils/language";

export default function Signup() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    division: "",
    depot: "",
    role: "employee",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.some((u) => u.email === form.email);
    if (exists) {
      alert(t("signup.userExists"));
      return;
    }

    users.push(form);
    localStorage.setItem("users", JSON.stringify(users));

    alert(t("signup.accountCreated"));
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-msrtc-light p-10">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl overflow-hidden border-t-4 border-msrtc-red">

        {/* Header */}
        <div className="bg-msrtc-red text-white text-center py-5 px-6">
          <img
            src="/img3.png"
            alt="MSRTC"
            className="h-12 w-auto mx-auto mb-2"
          />
          <h1 className="text-2xl font-bold">{t("signup.title")}</h1>
          <p className="text-sm opacity-90">
            Maharashtra State Transport Division
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignup} className="p-8 space-y-5">
          <Input label={t("signup.name")} name="name" onChange={handleChange} />
          <Input
            label={t("signup.email")}
            name="email"
            type="email"
            onChange={handleChange}
          />
          <Input
            label={t("signup.password")}
            name="password"
            type="password"
            onChange={handleChange}
          />
          <Input
            label={t("signup.division")}
            name="division"
            onChange={handleChange}
          />
          <Input
            label={t("signup.depot")}
            name="depot"
            onChange={handleChange}
          />

          {/* Role Dropdown */}
          <div>
            <label className="block text-sm font-semibold mb-1">Role</label>
            <select
              name="role"
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-600"
            >
              <option value="employee">{t("signup.tto")}</option>
              <option value="owner">{t("signup.owner/")}</option>
            </select>
          </div>

          <button className="w-full bg-msrtc-blue hover:bg-msrtc-red text-white font-semibold py-2.5 rounded-lg shadow-md">
            {t("signup.createAccount")}
          </button>

          <p className="text-center text-sm">
            {t("signup.haveAccount")}{" "}
            <Link
              to="/login"
              className="text-msrtc-red font-semibold hover:underline"
            >
              {t("signup.login")}
            </Link>
          </p>
        </form>

        {/* Footer */}
        <div className="bg-msrtc-light text-center text-xs text-gray-600 py-3">
          © {new Date().getFullYear()} MSRTC — Salary System
        </div>
      </div>
    </div>
  );
}

function Input({ label, name, type = "text", onChange }) {
  const { t } = useLanguage();
  const placeholder = t("signup.placeholder").replace("${label}", label);
  return (
    <div>
      <label className="block text-sm font-semibold mb-1">{label}</label>
      <input
        type={type}
        name={name}
        required
        onChange={onChange}
        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-600"
        placeholder={placeholder}
      />
    </div>
  );
}