import React, { useEffect, Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./css/style.scss";
import "./charts/ChartjsConfig";
// Import pages

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Analisis = lazy(() => import("./pages/Analisis"));
const JenisData = lazy(() => import("./pages/JenisData"));

function App() {
  const location = useLocation();
  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <Suspense
      fallback={
        <div className="text-pink-400 h-screen w-screen font-bold flex justify-center items-center">
          Page is Loading...
        </div>
      }
    >
      <Routes>
        <Route exact path="/jenisbarang" element={<JenisData />} />
        <Route exact path="/datamaster" element={<Analisis />} />
        <Route exact path="/analytics" element={<Analisis />} />
        <Route exact path="/" element={<Dashboard />} />
      </Routes>
    </Suspense>
  );
}

export default App;
