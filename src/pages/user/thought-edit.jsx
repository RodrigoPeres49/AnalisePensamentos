import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import '../../App.js';
import '../../App.css';

function ThoughtEdit() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [formData, setFormData] = useState({
    userId: '',
    triggers: '',
    worry: '',
    duration: '',
    discomfort: '',
    type: '',
    coping: '',
    datetime: '',
  });

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
      alert('Usuário não logado. Faça login para continuar.');
      navigate('/login');
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      userId: storedUserId,
    }));

    fetch(`http://localhost:5000/thought/${id}`)
        .then(res =>{
            if(!res.ok){
                throw new Error('Erro ao buscar o pensamento');
            }
            return res.json();
        })
        .then(data =>{
            setFormData({
                ...data,
                userId: storedUserId,
            });
        })
        .catch(() =>{
            alert('Erro ao carregar dados do pensamento');
            navigate('/user')
        });
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/thought/edit/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Pensamento salvo com sucesso!');
        setFormData(prev => ({
          ...prev,
          triggers: '',
          worry: '',
          duration: '',
          discomfort: '',
          type: '',
          coping: '',
          datetime: '',
        }));
        navigate('/user')
      } else {
        const msg = await response.text();
        alert(`Erro ao salvar: ${msg}`);
      }
    } catch (error) {
      alert('Erro na conexão com o servidor');
    }
  };


  return (
    <div>
      <form className='green' onSubmit={handleSubmit}>
        <h3>Insira os campos para adicionar os pensamentos:</h3>

        <input type="hidden" name="userId" value={formData.userId} />

        <div className='factors'>
          <label htmlFor="datetime">Data e Hora</label>
          <p>Quando esse pensamento ocorreu?</p>
          <input
            type="datetime-local"
            name="datetime"
            value={formData.datetime}
            onChange={handleChange}
          />
        </div>

        <div className='factors'>
          <label htmlFor="triggers">Fatores Desencadeantes</label>
          <p>O que você percebeu ou que ideia passou pela sua mente que desencadeou a preocupação?</p>
          <textarea
            name="triggers"
            value={formData.triggers}
            onChange={handleChange}
          />
        </div>

        <div className='factors'>
          <label htmlFor="worry">Preocupação</label>
          <p>O que está ocupando sua mente nesse momento de preocupação?</p>
          <textarea
            name="worry"
            value={formData.worry}
            onChange={handleChange}
          />
        </div>

        <div className='factors'>
          <label htmlFor="duration">Tempo de preocupação</label>
          <p>Por quanto tempo você sentiu essa preocupação? Minutos ou Horas</p>
          <textarea
            name="duration"
            value={formData.duration}
            onChange={handleChange}
          />
        </div>

        <div className='factors'>
          <label htmlFor="discomfort">Desconforto</label>
          <p>Em uma escala de 0 a 100, o quanto você se sente desconfortável durante essa preocupação?</p>
          <textarea
            name="discomfort"
            value={formData.discomfort}
            onChange={handleChange}
          />
        </div>

        <div className='factors'>
          <label htmlFor="type">Classificando a Preocupação</label>
          <p>Essa é uma preocupação produtiva ou improdutiva?</p>
          <textarea
            name="type"
            value={formData.type}
            onChange={handleChange}
          />
        </div>

        <div className='factors'>
          <label htmlFor="coping">Controle da situação</label>
          <p>Como você está agindo para controlar a situação que está causando preocupação?</p>
          <textarea
            name="coping"
            value={formData.coping}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className='purple offwhite-text'>Adicionar</button>
        <a className='purple offwhite-text' href='/user'>Voltar</a>
      </form>
    </div>
  );
}

export default ThoughtEdit;