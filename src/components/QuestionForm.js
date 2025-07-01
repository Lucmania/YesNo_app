import React, { useState } from 'react';
import './QuestionForm.css';

function isValidQuestion(question) {
  // Valida si la pregunta está entre signos de interrogación o termina con ?
  const trimmed = question.trim();
  return (
    /^¿.+\?$/.test(trimmed) || /\?$/.test(trimmed)
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