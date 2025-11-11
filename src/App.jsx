import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ShipGame from "./pages/ShipGame.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shipgame" element={<ShipGame />} />
    </Routes>
  );
}

export default App;
