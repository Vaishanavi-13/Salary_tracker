import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "../utils/language";
import busImage1 from "../assets/img3.jpg";

export default function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();

  const { lang, toggleLang, t } = useLanguage();

  const handleLogout = () => {
    localStorage.removeItem("sessionUser");
    navigate("/");
  };

  // detect pages
  const showDriverTitle = location.pathname === "/driver-sheet";
  const showConductorTitle = location.pathname === "/conductor-sheet";

  return (
    <nav className="bg-msrtc-red text-white shadow-md relative">

      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Left — Logo & Title */}
        <div className="flex items-center gap-3">
          <img src={busImage1} alt="MSRTC" className="h-8 w-auto" />
          <div>
            <h1 className="text-xl font-bold tracking-wide">
              {t('navbarTitle')}
            </h1>
            <p className="text-xs opacity-90">
              {t('navbarSubtitle')}
            </p>
          </div>
        </div>

        {/* CENTER TITLE (Only for sheet pages) */}
        {showDriverTitle && (
          <div className="absolute left-1/2 transform -translate-x-1/2 text-xl font-bold bg-blue-600 px-4 py-1 rounded">
            Driver Duty Sheet
          </div>
        )}

        {showConductorTitle && (
          <div className="absolute left-1/2 transform -translate-x-1/2 text-xl font-bold bg-blue-600 px-4 py-1 rounded">
            Conductor Duty Sheet
          </div>
        )}

        {/* Right — Controls */}
        <div className="flex items-center gap-4">

          {/* Language toggle */}
          <button
            onClick={toggleLang}
            aria-label="Toggle language"
            className="bg-white text-msrtc-red font-semibold px-3 py-1 rounded hover:bg-msrtc-light transition"
          >
            {lang === 'en' ? 'मराठी' : 'EN'}
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="bg-msrtc-blue text-white font-semibold px-4 py-1.5 rounded
                       hover:bg-msrtc-red transition shadow-sm"
          >
            {t('navbar.logout')}
          </button>

        </div>
      </div>
    </nav>
  );
}