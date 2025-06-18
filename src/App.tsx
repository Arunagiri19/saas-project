import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Registration from "./components/Reg";
import Edit from "./components/Edit";
import { useState } from "react";
import { Tenant } from "./type";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tenant] = useState<Tenant>({
    name: "",
    domain: "",
    email: "",
    plan: "Enterprise",
    status: "Active",
    createdDate: new Date().toISOString(), 
    products: 0,
    tags: [],
  });

  const handleSave = (updatedTenant: Tenant) => {
   
    console.log("Updated Tenant:", updatedTenant);
    setIsModalOpen(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/home/edit"
          element={
            <Edit
              isOpen={isModalOpen}
              onClose={handleClose}
              tenant={tenant}
              onSave={handleSave}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
