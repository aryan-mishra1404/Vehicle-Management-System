import VehicleList from "./pages/VehicleList";
import SidePanel from "./components/SidePanel";
import { Route, Routes } from "react-router-dom"; // Ensure correct imports
import DocumentList from "./pages/DocumentList";
import Reports from "./pages/Reports";

function App() {
  return (
    <>
      <div className="border-4 flex w-[100%] h-[100vh] box-border">
        <SidePanel />
        {/* Ensure you are wrapping your routes within <Routes> */}

        <Routes>
          <Route path="/vehicles" element={<VehicleList />} />
          <Route path="/vehicle/:id" element={<VehicleList />} />
          <Route path="/documents" element={<DocumentList />} />
          <Route path="/reports" element={<Reports />} />

        </Routes>

      </div>
    </>
  );
}

export default App;