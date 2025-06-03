import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/users");
      const users = await response.json();

      const foundUser = users.find(
        (user) => user.usuario === formData.username && user.senha === formData.password
      );

      if (foundUser) {
        localStorage.setItem("loggedUser", JSON.stringify(foundUser));
        localStorage.setItem("userId", foundUser.id);

        alert("Login realizado com sucesso!");
        navigate("/user");
      } else {
        alert("Usuário ou senha incorretos.");
      }
    } catch (error) {
      alert("Erro ao tentar logar. Tente novamente.");
    }
  };

  return (
    <div>
      <form className="green" onSubmit={handleLogin}>
        <h2>Login</h2>

        <label htmlFor="username">Usuário</label>
        <input
          type="text"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Senha</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button className="purple offwhite-text" type="submit">
          Logar
        </button>

        <a className="pink-text" href="/register">
          Não possui conta? Clique aqui para cadastrar.
        </a>
      </form>
    </div>
  );
}

export default Login;
