import React, { ChangeEvent } from 'react';
import './InputLogin.css';
import { Input } from 'antd';

// Interface qui spécifie le type de propriété attendues pour les inputs
interface InputLoginProps {
  onInputLogin?: (value: string) => void;
}


// constante InputLogin en composant fonctionnel REACT qui prends en objet les propriétées de InputLoginProps 
const InputLogin: React.FC<InputLoginProps> = ({ onInputLogin }) => {
  // Fonction qui sera executée à change fois que le contenu de Input changera 
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Si onInputLogin est définit, alors elle passe la valeur définit dans le input
    if (onInputLogin) {
      onInputLogin(e.target.value);
    }
  };

  // retourne un Input qui gère chaque changement de valeur avec handleChange
  return <Input type="text" className='login' onChange={handleChange} />;
};

export default InputLogin;