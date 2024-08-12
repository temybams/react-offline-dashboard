import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import AddContact from "./pages/AddContact";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="add-contact" element={<AddContact />} />
      </Route>
    </Routes>
  );
};

export default App;
