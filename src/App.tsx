import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WorkshopsPage from "./pages/WorkshopsPage";
import ShipGame from "./components/shipgame/ShipGame";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

const App: React.FC = () => {
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
          <Route path="/workshops" element={<WorkshopsPage />} />
          <Route path="/workshop" element={<Navigate to="/workshops" replace />} />
          <Route path="/shipgame" element={<ShipGame />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
