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
        <Route
          path="/"
          element={
            isUserLoggedIn() ? <Navigate to="/user" /> : <Navigate to="/login" />
          }
        />

        {/* Rotas públicas */}
        <Route path="/login" element={<p.Login />} />
        <Route path="/register" element={<p.Register />} />

        {/* Área do usuário */}
        <Route
          path="/user"
          element={
            isUserLoggedIn() ? <p.User /> : <Navigate to="/login" />
          }
        />

        {/* Rotas protegidas adicionais */}
        <Route
          path="/thought"
          element={
            isUserLoggedIn() ? <p.Thought /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/thought-list"
          element={
            isUserLoggedIn() ? <p.ThoughtList /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
}

export default Main;


