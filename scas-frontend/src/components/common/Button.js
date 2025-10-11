import React from 'react';
import './Button.css';

function Button({ text, onClick, type = 'primary', style = {} }) {
  return (
    <button
      className={`common-btn ${type}`}
      onClick={onClick}
      style={style}
    >
      {text}
    </button>
  );
}

export default Button;
