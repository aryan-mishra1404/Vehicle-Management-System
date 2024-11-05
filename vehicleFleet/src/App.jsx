import VehicleList from "./pages/VehicleList";
import SidePanel from "./components/SidePanel";
import { Route, Routes } from "react-router-dom"; // Ensure correct imports
import DocumentList from "./pages/DocumentList";

function App() {
  return (
    <>
      <div className="border-4 flex w-[100%] h-[100vh] border-black bg-[#eae7c8] text-[#667C91] box-border">
        <SidePanel />
        {/* Ensure you are wrapping your routes within <Routes> */}

        <Routes>
          <Route path="/vehicles" element={<VehicleList />} />
          <Route path="/vehicle/:id" element={<VehicleList />} />
          <Route path="/documents" element={<DocumentList />} />

        </Routes>

      </div>
    </>
  );
}

export default App;