import { useState, useEffect } from "react";
import { Sun, Moon, Heart, Star } from "lucide-react";

const themes = [
  {
    name: "boyLight",
    label: "Boy • Light",
    icon: <Sun className="w-5 h-5 text-blue-500" />,
  },
  {
    name: "boyDark",
    label: "Boy • Dark",
    icon: <Moon className="w-5 h-5 text-cyan-400" />,
  },
  {
    name: "girlLight",
    label: "Girl • Light",
    icon: <Heart className="w-5 h-5 text-pink-500" />,
  },
  {
    name: "girlDark",
    label: "Girl • Dark",
    icon: <Star className="w-5 h-5 text-fuchsia-400" />,
  },
];

export default function ThemeToggle() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "boyLight",
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const current = themes.find((t) => t.name === theme);

  return (
    <div className="dropdown dropdown-end">
      {/* Button that shows current theme */}
      <div
        tabIndex={0}
        role="button"
        className="btn btn-square bg-transparent border-none flex items-center gap-2"
      >
        {current.icon}
      </div>

      {/* Dropdown menu with all themes */}
      <ul
        tabIndex={0}
        className="dropdown-content z-[9999] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        {themes.map((t) => (
          <li key={t.name}>
            <button
              onClick={() => setTheme(t.name)}
              className={`flex items-center gap-2 ${
                theme === t.name ? "active bg-primary text-base-100" : ""
              }`}
            >
              {t.icon}
              <span>{t.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
