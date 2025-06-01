import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";

function Login() {
    const [formData, setFormData] = useState({ user: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/users");
            const usuarios = await response.json();

            const usuarioEncontrado = usuarios.find(
                (u) => u.usuario === formData.user && u.senha === formData.password
            );

            if (usuarioEncontrado) {
                localStorage.setItem("loggedUser", JSON.stringify(usuarioEncontrado)); 
                alert("Login realizado com sucesso!");
                navigate("/user"); 
            } else {
                alert("Usuário ou senha incorretos.");
            }
        } catch (error) {
            console.error("Erro no login:", error);
            alert("Erro ao tentar logar. Tente novamente.");
        }
    };

    return (
        <div>
            <form className="green" onSubmit={handleLogin}>
                <h2>Login</h2>

                <label htmlFor="user">Usuário</label>
                <input
                    type="text"
                    name="user"
                    id="user"
                    value={formData.user}
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

                <button className="purple offwhite-text" type="submit">Logar</button>

                <a className="pink-text" href="/register">
                    Não possui conta? Clique aqui para cadastrar.
                </a>
            </form>
        </div>
    );
}

export default Login;
