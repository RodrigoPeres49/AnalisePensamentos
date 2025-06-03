import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.js';
import '../../App.css';

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        usuario: '',
        email: '',
        nome_completo: '',
        telefone: '',
        senha: '',
        confirmarSenha: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.senha !== formData.confirmarSenha) {
        alert('As senhas não coincidem!');
        return;
    }

    const novoUsuario = {
        usuario: formData.usuario,
        email: formData.email,
        nome_completo: formData.nome_completo,
        telefone: formData.telefone,
        senha: formData.senha
    };

    try {
        const response = await fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novoUsuario)
        });

        if (response.ok) {
            const data = await response.json();
            const userId = data.id;

            localStorage.setItem('userId', userId);

            alert('Usuário cadastrado com sucesso!');
            setFormData({
                usuario: '',
                email: '',
                nome_completo: '',
                telefone: '',
                senha: '',
                confirmarSenha: ''
            });
            navigate('/login');
        }
        else if(response.status === 409){
            alert('Nome de usuario já existe, favor inserir outro.')
        }
        else {
            alert('Erro ao cadastrar usuario,');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro na comunicação com o servidor');
    }
};


    return (
        <div>
            <form className='green' onSubmit={handleSubmit}>
                <h3>Cadastre-se</h3>

                <label htmlFor="usuario">Usuário:</label>
                <input type="text" name="usuario" id="usuario" value={formData.usuario} onChange={handleChange} />

                <label htmlFor="email">E-mail:</label>
                <input type="text" name="email" id="email" value={formData.email} onChange={handleChange} />

                <label htmlFor="nome_completo">Nome Completo:</label>
                <input type="text" name="nome_completo" id="nome_completo" value={formData.nome_completo} onChange={handleChange} />

                <label htmlFor="telefone">Telefone:</label>
                <input type="tel" name="telefone" id="telefone" value={formData.telefone} onChange={handleChange} placeholder="(99) 99999-9999" />

                <label htmlFor="senha">Senha:</label>
                <input type="password" name="senha" id="senha" value={formData.senha} onChange={handleChange} />

                <label htmlFor="confirmarSenha">Confirmar Senha:</label>
                <input type="password" name="confirmarSenha" id="confirmarSenha" value={formData.confirmarSenha} onChange={handleChange} />

                <input type="submit" value="Cadastrar" />
                <a className='purple offwhite-text' href="/login">Voltar</a>
            </form>
        </div>
    );
}

export default Register;