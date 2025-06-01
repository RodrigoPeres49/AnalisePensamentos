import '../App.js';
import '../App.css';
import * as p from './index.js';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Verifica se há um usuário logado
const isUserLoggedIn = () => {
  return localStorage.getItem('loggedUser') !== null;
};

function Main() {
  return (
    <Router>
      <Routes>
        {/* Rota inicial decide com base no login */}
        <Route
          path="/"
          element={
            isUserLoggedIn() ? <Navigate to="/user" /> : <Navigate to="/login" />
          }
        />

        <Route path="/login" element={<p.Login />} />
        <Route path="/register" element={<p.Register />} />
        
        {/* Rota protegida da área do usuário */}
        <Route
          path="/user"
          element={
            isUserLoggedIn() ? <p.User /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
}

export default Main;


