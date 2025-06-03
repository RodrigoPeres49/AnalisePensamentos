import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.js';
import '../../App.css';
import ThoughtList from './thought-list.jsx';

function User() {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUserName(user.nome_completo || user.usuario || 'Usuário');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('userId');
    alert('Você saiu!');
    navigate('/login');
  };

  return (
    <div className='area green'>
      <h2>Bem vindo {userName}</h2>
      <a href='/thought' className='purple offwhite-text'>Adicionar Pensamento</a>
      <a href='#' className='purple offwhite-text' onClick={handleLogout}> Sair </a>
      <div>
        <ThoughtList></ThoughtList>
      </div>
    </div>
  );
}

export default User;
