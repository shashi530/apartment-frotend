import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route } from "react-router";
import { Link } from "react-router-dom";
import Login from "./components/login";
import SignUp from "./components/signup";
import { Home } from './components/home';
import { Searchbar } from './components/search';

function App() {
  return (
    <div className="App">
      <div className="outer">
        <div className="inner">
        <Routes>
            <Route path="/" element={<Login/>} />
         
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
            <Route path="/search" element={<Searchbar/>} />
           
        </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;