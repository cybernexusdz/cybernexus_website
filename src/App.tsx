import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MeetTheTeamPage from "./pages/MeetTheTeam";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

const App: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const theme = localStorage.getItem("theme") || "boyDark";
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  const [theme, setTheme] = useState<string>(
    localStorage.getItem("theme") || "boyDark",
  );

  const handleScrollComponent = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Navbar
        theme={theme}
        setTheme={setTheme}
        handleScrollComponent={handleScrollComponent}
      />
      <div className="mt-20">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
