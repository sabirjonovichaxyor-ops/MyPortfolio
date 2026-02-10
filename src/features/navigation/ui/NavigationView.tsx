import { useEffect, useState } from "react";
import {
  Moon,
  Sun,
  Home,
  User,
  ChevronDown,
  Menu,
  X,
  Briefcase,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import { useThemeContext } from "../../theme/model/theme-context";
import { LanguageSwitcher } from "../../language/ui/LanguageSwitcher";
import { SectionKey } from "../../sections/model/types";

/* -------------------- TYPES -------------------- */

interface AboutItem {
  id: SectionKey;
}

interface Props {
  activeSection: SectionKey;
  setActiveSection: (section: SectionKey) => void;
  aboutOpen: boolean;
  setAboutOpen: (v: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
  aboutItems: AboutItem[];
  aboutRef: React.RefObject<HTMLDivElement>;
  isAboutActive: boolean;
}

/* -------------------- COMPONENT -------------------- */

export function NavigationView({
  activeSection,
  setActiveSection,
  aboutOpen,
  setAboutOpen,
  mobileOpen,
  setMobileOpen,
  aboutItems,
  aboutRef,
  isAboutActive,
}: Props) {
  const { theme, toggleTheme } = useThemeContext();
  const { t } = useTranslation("common");

  const authorName = t("author.name");
  const logoInitial = authorName?.trim()?.charAt(0).toUpperCase() ?? "A";

  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navClasses = `fixed top-0 left-0 right-0 z-50 
    backdrop-blur-xl transition-all duration-700 ease-in-out
    border-b dark:bg-gradient-to-r from-gray-950/95 dark:to-black/85 ${
      isScrolled
        ? "bg-gradient-to-r from-gray-30/60 to-white/70 dark:from-gray-950/60 dark:to-black/70 border-gray-200/20 dark:border-gray-800/20 shadow-md shadow-gray-200/10 dark:shadow-gray-900/10"
        : "bg-transparent border-transparent"
    }
  `;

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setActiveSection("home")}
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <span className="text-white font-bold text-xl">
                  {logoInitial}
                </span>
              </div>
            </div>

            <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-cyan-700 to-purple-600 dark:from-white dark:via-cyan-300 dark:to-purple-400">
              {authorName}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            <button
              onMouseEnter={() => setHoveredItem("home")}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => setActiveSection("home")}
              className={`relative flex items-center gap-2 
                px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group
                ${
                  activeSection === "home"
                    ? "bg-gradient-to-r from-cyan-500/10 to-purple-500/10 text-cyan-600 dark:text-cyan-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400"
                }`}
            >
              <Home
                className={`w-6 h-4 transition-transform ${
                  hoveredItem === "home" ? "scale-110" : ""
                }`}
              />
              {t("nav.home")}

              <span
                className={`absolute bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 transform origin-left transition-transform duration-300 ${
                  activeSection === "home" || hoveredItem === "home"
                    ? "scale-x-100"
                    : "scale-x-0"
                }`}
              />
            </button>

            <button
              onMouseEnter={() => setHoveredItem("projects")}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => setActiveSection("projects")}
              className={`relative flex items-center gap-2 
                px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group
                ${
                  activeSection === "projects"
                    ? "bg-gradient-to-r from-cyan-500/10 to-purple-500/10 text-cyan-600 dark:text-cyan-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400"
                }`}
            >
              <Briefcase
                className={`w-5 h-4 transition-transform ${
                  hoveredItem === "projects" ? "scale-110 rotate-6" : ""
                }`}
              />
              {t("nav.projects")}

              <span
                className={`absolute bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 transform origin-left transition-transform duration-300 ${
                  activeSection === "projects" || hoveredItem === "projects"
                    ? "scale-x-100"
                    : "scale-x-0"
                }`}
              />
            </button>


            {/* About */}
            <div className="relative" ref={aboutRef}>
              <button
                onMouseEnter={() => setHoveredItem("about")}
                onMouseLeave={() => setHoveredItem(null)}
                aria-expanded={aboutOpen}
                onClick={() => setAboutOpen(!aboutOpen)}
                className={`relative flex items-center gap-2 
                  px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group
                  ${
                    aboutOpen || isAboutActive
                      ? "bg-gradient-to-r from-cyan-500/10 to-purple-500/10 text-cyan-600 dark:text-cyan-400"
                      : "text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400"
                  }`}
              >
                <User
                  className={`w-6 h-4 transition-transform ${
                    hoveredItem === "about" ? "scale-110" : ""
                  }`}
                />
                {t("nav.about")}
                <ChevronDown
                  className={`w-6 h-4 transition-all duration-300 ${
                    aboutOpen ? "rotate-180 text-cyan-500" : ""
                  }`}
                />

                {/* Animated underline */}
                <span
                  className={`absolute bottom-1.5 left-4 right-4 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 transform origin-left transition-transform duration-300 ${
                    aboutOpen || isAboutActive || hoveredItem === "about"
                      ? "scale-x-100"
                      : "scale-x-0"
                  }`}
                />
              </button>

              {/* Dropdown */}
              {aboutOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 rounded-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl border border-gray-200/30 dark:border-gray-700/30 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="px-5 py-3 border-b border-gray-200/20 dark:border-gray-700/20 bg-gradient-to-r from-cyan-500/5 to-purple-500/5">
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t("nav.aboutSections")}
                    </p>
                  </div>

                  <ul className="py-2">
                    {aboutItems.map((item: AboutItem) => (
                      <li key={item.id}>
                        <button
                          onMouseEnter={() => setHoveredItem(item.id)}
                          onMouseLeave={() => setHoveredItem(null)}
                          onClick={() => {
                            setActiveSection(item.id);
                            setAboutOpen(false);
                          }}
                          className={`flex items-center gap-3 w-full px-4 py-3 text-left text-sm transition-all duration-200 group
                            ${
                              activeSection === item.id
                                ? "bg-gradient-to-r from-cyan-500/10 to-purple-500/10 text-cyan-600 dark:text-cyan-400"
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 hover:pl-5"
                            }`}
                        >
                          <div
                            className={`w-2 h-2 rounded-full transition-colors ${
                              activeSection === item.id
                                ? "bg-gradient-to-r from-cyan-500 to-purple-500"
                                : "bg-gray-300 dark:bg-gray-600 group-hover:bg-cyan-400"
                            }`}
                          />
                          <span className="flex-1">
                            {t(`nav.${item.id}`)}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          

          {/* Right side */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />

            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-gradient-to-r from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 text-gray-700 dark:text-gray-300 hover:from-gray-200 hover:to-gray-100 dark:hover:from-gray-700 dark:hover:to-gray-800 transition-all duration-300 shadow-md hover:shadow-lg group"
            >
              <div className="relative">
                {theme === "light" ? (
                  <Moon className="w-5 h-5 transition-transform group-hover:rotate-12" />
                ) : (
                  <Sun className="w-5 h-5 transition-transform group-hover:rotate-45" />
                )}
              </div>
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-3 rounded-xl bg-gradient-to-r from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 text-gray-700 dark:text-gray-300 hover:from-gray-200 hover:to-gray-100 dark:hover:from-gray-700 dark:hover:to-gray-800 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {mobileOpen ? (
                <X className="w-5 h-5 transition-transform rotate-90" />
              ) : (
                <Menu className="w-5 h-5 transition-transform" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
