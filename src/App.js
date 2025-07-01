import React, { useState } from 'react';
import './App.css';
import QuestionForm from './components/QuestionForm';
import AnswerDisplay from './components/AnswerDisplay';
import ParticleBackground from './components/ParticleBackground';

function App() {
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleQuestionSubmit = async (question) => {
    setLoading(true);
    setError('');
    setAnswer(null);

    try {
      const response = await fetch('https://yesno.wtf/api');
      const data = await response.json();
      setAnswer(data);
    } catch (err) {
      setError('Error al obtener la respuesta. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <ParticleBackground />
      <header className="App-header">
        <h1>¿Sí, No o Tal vez?</h1>
        <p>Haz una pregunta y obtén una respuesta animada</p>
      </header>
      
      <main className="App-main">
        <QuestionForm onSubmit={handleQuestionSubmit} />
        
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Pensando en tu pregunta...</p>
          </div>
        )}
        
        {error && (
          <div className="error">
            <p>{error}</p>
          </div>
        )}
        
        {answer && <AnswerDisplay answer={answer} />}
      </main>
    </div>
  );
}

export default App;
