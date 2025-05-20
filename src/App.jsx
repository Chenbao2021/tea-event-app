import "./App.css";
import IceBreaker from "./screen/IceBreaker";
import { Routes, Route } from "react-router-dom";
import Welcome from "./screen/Welcome";
import RoboTranslator from "./components/RoboTranslator";

function App() {
  return (
    <>
      <div
        style={{
          position: "fixed",
          bottom: 16,
          right: 16,
          zIndex: 1000,
        }}
      >
        <RoboTranslator />
      </div>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/iceBreaker" element={<IceBreaker />} />
      </Routes>
    </>
  );
}

export default App;
