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
  const [previousPath, setPreviousPath] = useState(location.pathname);
  // this is utterly fucking retarded but my brain is so fryed right now
  // that i cant be asked to do it in a better way
  // it just stops the page from scrolling up when opening a members card
  useEffect(() => {
    const currentSegments = location.pathname.split("/").filter(Boolean);
    const previousSegments = previousPath.split("/").filter(Boolean);

    // Check if we're just opening/closing a member card within the same department
    const isSameDepartment =
      currentSegments[0] === "meet-the-team" &&
      previousSegments[0] === "meet-the-team" &&
      currentSegments[1] === previousSegments[1]; // Same department ID

    // Only scroll if we're not just toggling a member card
    if (!isSameDepartment) {
      window.scrollTo(0, 0);
    }

    setPreviousPath(location.pathname);
  }, [location.pathname]);

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
          <Route path="/meet-the-team" element={<MeetTheTeamPage />} />
          <Route
            path="/meet-the-team/:departmentId"
            element={<MeetTheTeamPage />}
          />
          <Route
            path="/meet-the-team/:departmentId/:memberId"
            element={<MeetTheTeamPage />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
