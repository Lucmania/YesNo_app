import React, { useEffect } from 'react';
import './AnswerDisplay.css';

const getColor = (answer) => {
  switch (answer) {
    case 'yes':
      return '#4caf50'; // verde
    case 'no':
      return '#f44336'; // rojo
    case 'maybe':
      return '#ff9800'; // naranja
    default:
      return '#333';
  }
};

const createConfetti = () => {
  const colors = ['#4caf50', '#2196f3', '#ff9800', '#e91e63', '#9c27b0'];
  const confettiCount = 50;
  
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.top = '-10px';
    confetti.style.borderRadius = '50%';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '1000';
    confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
    
    document.body.appendChild(confetti);
    
    setTimeout(() => {
      document.body.removeChild(confetti);
    }, 5000);
  }
};

const AnswerDisplay = ({ answer }) => {
  useEffect(() => {
    if (answer && answer.answer === 'yes') {
      setTimeout(createConfetti, 500);
    }
  }, [answer]);

  if (!answer) return null;
  
  return (
    <div className="answer-display" style={{ borderColor: getColor(answer.answer) }}>
      <h2 style={{ color: getColor(answer.answer) }}>{answer.answer.toUpperCase()}</h2>
      <img src={answer.image} alt={answer.answer} className="answer-gif" />
    </div>
  );
};

export default AnswerDisplay; 