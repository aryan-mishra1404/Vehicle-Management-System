import VehicleList from "./pages/VehicleList";
import SidePanel from "./components/SidePanel";
import { Navigate, Route, Routes } from "react-router-dom";
import DocumentList from "./pages/DocumentList";
import Reports from "./pages/Reports";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import Location from "./pages/Location";
import DieselSheet from "./pages/DieselSheet";
import WeightSheet from "./pages/WeightSheet";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated")
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(localStorage.getItem("isAuthenticated"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // if (isAuthenticated === null) {
  //   return null; // Show a loading spinner or placeholder here if needed
  // }
  console.log(isAuthenticated, "check auth");

  return (
    <div className="w-[100%] h-[100vh]">
      {isAuthenticated === "true" && <Navbar />}
      <div className="flex">
        {isAuthenticated === "true" && <SidePanel />}
        <Routes>
          {!isAuthenticated || isAuthenticated === "false" ? (
            <Route path="*" element={<Navigate to="/login" replace />} />
          ) : (
            <>
              <Route path="/vehicles" element={<VehicleList />} />
              <Route path="/vehicle/:id" element={<VehicleList />} />
              <Route path="/location" element={<Location />} />
              <Route path="/documents" element={<DocumentList />} />

              <Route path="/party-sheet" element={<Reports />} />
              <Route path="/diesel-sheet" element={<DieselSheet />} />
              <Route path="/weight-sheet" element={<WeightSheet />} />
            </>
          )}
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
