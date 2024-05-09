import "antd/dist/reset.css";
import React, { useState } from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Homepage from "./pages/Homepage";
import MedicinePage from "./pages/MedicinePage";
import PurchasesPage from "./pages/PurchasesPage";
import BillsPage from "./pages/BillsPage";


function App() {
  const [billItems, setBillItems] = useState([]);
  

  // Function to handle adding items to the bill
  const handleAddToBill = (item) => {
    setBillItems([...billItems, item]);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage onAddToBill={handleAddToBill} />} />
        <Route path="/items" element={<MedicinePage />} />
        <Route path="/purchases" element={<PurchasesPage billItems={billItems} />} />
        <Route path="/bills" element={<BillsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
