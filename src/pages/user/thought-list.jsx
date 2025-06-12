import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ThoughtList() {
  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Você precisa estar logado para ver os pensamentos.');
      return;
    }

    fetch(`http://localhost:5000/thoughts/${userId}`)
      .then(res => res.json())
      .then(data => {
        setThoughts(data);
        setLoading(false);
      })
      .catch(() => {
        alert('Erro ao buscar os pensamentos');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando pensamentos...</p>;

  if (thoughts.length === 0) return <p>Nenhum pensamento encontrado.</p>;

  // DELETAR PENSAMENTO

  const handleDelete = async (id) => {
  const confirm = window.confirm('Tem certeza que deseja apagar este pensamento?');
  if (!confirm) return;

  try {
    const response = await fetch(`http://localhost:5000/thought/delete/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setThoughts(prev => prev.filter(t => t.id !== id));
      alert('Pensamento apagado com sucesso!');
    } else {
      const msg = await response.text();
      alert(`Erro ao apagar pensamento: ${msg}`);
    }
  } catch (error) {
    alert('Erro na conexão com o servidor.');
  }
};

// REPRESENTAÇÂO DE DATA

const formatDateTime = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).replace(',', ' às');
};

  return (
    <div>
      <h2>Seus Pensamentos</h2>
      <table className='thoughts-table'>
        <thead>
          <tr>
            <td>
              Data e Hora
              <p>Quando esse pensamento ocorreu?</p>
            </td>
            <td>
              Fatores Desencadeantes
              <p>O que você percebeu ou que ideia passou pela sua mente que desencadeou a preocupação?</p>
            </td>
            <td>
              Preocupação
              <p>O que está ocupando sua mente nesse momento de preocupação?</p>
            </td>
            <td>
              Duração
              <p>Por quanto tempo você sentiu essa preocupação? Minutos ou Horas</p>
            </td>
            <td>
              Desconforto
              <p>Em uma escala de 0 a 100, o quanto você se sente desconfortável durante essa preocupação?</p>
            </td>
            <td>
              Classificando a Preocupação
              <p>Essa é uma preocupação produtiva ou improdutiva?</p>
            </td>
            <td>
              Controle da Situação
              <p>Como você está agindo para controlar a situação que está causando preocupação?</p>
            </td>
            <td>
              Ações
              <p>Editar ou Apagar Pensamento</p>
            </td>
          </tr>
        </thead>
        <tbody>
            {thoughts.map((thought) => (
              <tr key={thought.id}>
                <td>{formatDateTime(thought.datetime)}</td>
                <td>{thought.triggers}</td>
                <td>{thought.worry}</td>
                <td> {thought.duration}</td>
                <td>{thought.discomfort}</td>
                <td>{thought.type}</td>
                <td>{thought.coping}</td>
                <td><Link className='purple offwhite-text' to = {`/thought/edit/${thought.id}`}>Editar</Link><button className='purple offwhite-text' onClick={() => handleDelete(thought.id)}>Apagar</button></td>

              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default ThoughtList;
