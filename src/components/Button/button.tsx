import React from 'react';
import './button.css';
import { Button } from 'antd';

interface BoutonProps {
  onClick: () => void; // Spécifiez le type de la prop onClick comme une fonction sans paramètre et sans valeur de retour
}

function Bouton({ onClick }: BoutonProps) {
  return (
    <Button  type="primary" className="bouton" onClick={onClick}>
      Afficher les choix
    </Button>
  );
}

export default Bouton;
