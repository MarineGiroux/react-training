import React from 'react';
import './validationLogin.css';
import { Button } from 'antd';
import { forgeToken, getToken } from '../../services/authenticationService';
import axios from 'axios';

const apiURL:string = process.env.REACT_APP_API_URL as string;
const apiEmail:string = process.env.REACT_APP_API_USER as string;
const apiMdP:string = process.env.REACT_APP_API_PASSWORD as string;

interface BoutonValidationProps {
  email: string; 
  mdp: string; 
  onClick: () => void; 
}

const BoutonValidation: React.FC<BoutonValidationProps> = ({ email, mdp, onClick }) => {
  const handleClick = async () => {
    if (email === apiEmail && mdp === apiMdP) {
      console.log("Email et mot de passe conformes !");
        await forgeToken();
        const token = getToken();
        const response = await axios.get(`${apiURL}/materials/custom`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log("Données de l'API:", response.data);
        onClick(); 
    } else {
      onClick(); 
    }
  };

  return (
    <Button type="primary" className="bouton" onClick={handleClick}>
      Se connecter
    </Button>
  );
};

export default BoutonValidation;