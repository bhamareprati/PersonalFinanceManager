import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Transaction from "./components/Transaction";
import Report from "./components/Report";  // ✅ Import Report correctly
import "./components/style.css"; 
import "./services/api";  // ✅ Attaches the login token to every request

// Sample chart data (for debugging)
const sampleData = [
  { name: "Income", value: 5000 },
  { name: "Expense", value: 2000 },
];

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/transaction" element={<Transaction />} />  {/* ✅ Fixed route case */}
        <Route path="/reports" element={<Report chartData={sampleData} />} />  {/* ✅ Fixed path */}
      </Routes>
    </Router>
  </React.StrictMode>
);
