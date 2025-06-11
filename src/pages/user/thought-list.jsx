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

  return (
    <div>
      <h2>Seus Pensamentos</h2>
      <table>
        <thead>
          <tr><td>Data e Hora</td><td>Fatores Desencadeantes</td><td>Preocupação</td><td>Duração</td><td>Desconforto</td><td>Tipo</td><td>Controle da Situação</td><td>Ações</td></tr>
        </thead>
        <tbody>
            {thoughts.map((thought) => (
              <tr key={thought.id}>
                <td>{thought.datetime}</td>
                <td>{thought.triggers}</td>
                <td>{thought.worry}</td>
                <td> {thought.duration}</td>
                <td>{thought.discomfort}</td>
                <td>{thought.type}</td>
                <td>{thought.coping}</td>
                <td><Link to = {`/thought/edit/${thought.id}`}>Editar</Link><Link to = {`/thought/delete/${thought.id}`}>Apagar</Link></td>

              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default ThoughtList;
