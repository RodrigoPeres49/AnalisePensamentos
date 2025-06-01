import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.js';
import '../../App.css';

function User() {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUserName(user.nome_completo || user.usuario || 'Usuário'); // tenta nome_completo, senão usuario, senão "Usuário"
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedUser');
    alert('Você saiu!')
    navigate('/login');
  };

  return (
    <div className='area green'>
      <h2>Bem vindo {userName}</h2>
      <a href='think' className='purple offwhite-text'>Adicionar Pensamento</a>
      <a href='#' className='pink-text' onClick={handleLogout}> Sair </a>
    </div>
  );
}

export default User;
