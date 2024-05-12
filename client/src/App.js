import "antd/dist/reset.css";
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Homepage from "./pages/Homepage";
import MedicinePage from "./pages/MedicinePage";
import PurchasesPage from "./pages/PurchasesPage";
import BillsPage from "./pages/BillsPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  const [billItems, setBillItems] = useState([]);

  // Function to handle adding items to the bill
  const handleAddToBill = (item) => {
    setBillItems([...billItems, item]);
  };

  return (
    <BrowserRouter>
      <Routes>

        <Route
           path="/" 
           element={
            <ProtectedRoute>
                 <Homepage onAddToBill={handleAddToBill} />
            </ProtectedRoute>
          
           } />
        <Route path="/items" element={
            <ProtectedRoute>
                 <MedicinePage />

            </ProtectedRoute>
                 
        } />
        <Route path="/purchases" element={
           <ProtectedRoute>
                 <PurchasesPage billItems={billItems} />
           </ProtectedRoute>
               
        } />
        <Route path="/bills" element={
        <BillsPage />
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={< Dashboard/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

export function ProtectedRoute({ children }) {
  if (localStorage.getItem('auth')) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
