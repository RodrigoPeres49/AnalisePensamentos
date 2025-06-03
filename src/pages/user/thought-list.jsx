import { useState, useEffect } from 'react';

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
      <ul>
        {thoughts.map((thought) => (
          <li key={thought.id}>
            <p><strong>Data e Hora:</strong> {thought.datetime}</p>
            <p><strong>Fatores Desencadeantes:</strong> {thought.triggers}</p>
            <p><strong>Preocupação:</strong> {thought.worry}</p>
            <p><strong>Duração:</strong> {thought.duration}</p>
            <p><strong>Desconforto:</strong> {thought.discomfort}</p>
            <p><strong>Tipo:</strong> {thought.type}</p>
            <p><strong>Controle da Situação:</strong> {thought.coping}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ThoughtList;
