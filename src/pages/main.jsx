import '../App.js';
import '../App.css';
import * as p from './index.js';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const isUserLoggedIn = () => {
  return localStorage.getItem('loggedUser') !== null;
};

function Main() {
  return (
    <Router>
      <Routes>
         
        {/* ROTAS PRINCIPAL, LOGIN E REGISTRO */}

        <Route path="/" element={isUserLoggedIn() ? <Navigate to="/user" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<p.Login />} />
        <Route path="/register" element={<p.Register />} />

        {/* USUARIO */}

        <Route path="/user" element={isUserLoggedIn() ? <p.User /> : <Navigate to="/login" />} />

        {/* PENSAMENTOS */}

        <Route path="/thought" element={isUserLoggedIn() ? <p.Thought /> : <Navigate to="/login" />} />
        <Route path="/thought-list" element={isUserLoggedIn() ? <p.ThoughtList /> : <Navigate to="/login" />} />
        <Route path="/thought/edit/:id" element={<p.ThoughtEdit />} />
        
      </Routes>
    </Router>
  );
}

export default Main;



