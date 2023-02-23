import "./App.css";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import FOOTER from "./components/Footer"
import Dashboard from "./components/Dashboard";
import ItemInfo from "./components/Item";
import AddNewitem from "./components/AddNewItem";
import React, { useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";
export const tokenContext = createContext();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");

  if (!token && localStorage.getItem("token")) {
    setToken(localStorage.getItem("token"));
    setIsLoggedIn(true);
  }

  return (
    <div className="App">
      <tokenContext.Provider
        value={{ token, setToken, isLoggedIn, setIsLoggedIn }}
      >
      
        <Navbar />
       
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/details/:id" element={<ItemInfo />} />
          <Route path="/newItem" element={<AddNewitem />} />
        </Routes>
        <FOOTER/>
      </tokenContext.Provider>
    </div>
  );
};

export default App;
