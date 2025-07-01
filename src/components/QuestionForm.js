import React, { useState } from 'react';
import './QuestionForm.css';

function isValidQuestion(question) {
  const trimmed = question.trim();
  
  if (!trimmed) return false;
  
  let content = trimmed;
  
  if (/^¿.+\?$/.test(trimmed)) {
    content = trimmed.slice(1, -1);
  }
  else if (/\?$/.test(trimmed)) {
    content = trimmed.slice(0, -1);
  }
  
  const realContent = content.trim();
  
  return (
    (/^¿.+\?$/.test(trimmed) || /\?$/.test(trimmed)) && 
    realContent.length > 0
  );
}

const QuestionForm = ({ onSubmit }) => {
  const [question, setQuestion] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setQuestion(e.target.value);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const trimmed = question.trim();
    
    if (!trimmed) {
      setError('Por favor escribe una pregunta');
      return;
    }
    
    const withoutQuestionMarks = trimmed.replace(/[¿?]/g, '').trim();
    if (!withoutQuestionMarks) {
      setError('La pregunta debe contener texto, no solo signos de interrogación');
      return;
    }
    
    if (!isValidQuestion(question)) {
      setError('La pregunta debe estar entre signos de interrogación (¿...?) o terminar con un signo de pregunta (?)');
      return;
    }
    
    onSubmit(question);
    setQuestion('');
  };

  return (
    <form className="question-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Escribe tu pregunta..."
        value={question}
        onChange={handleChange}
        maxLength={100}
        required
      />
      <button type="submit">Preguntar</button>
      {error && <div className="form-error">{error}</div>}
    </form>
  );
};

export default QuestionForm;
