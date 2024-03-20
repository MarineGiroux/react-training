import React from 'react';
import './validationLogin.css';
import { Button } from 'antd';
import { forgeToken, getToken } from '../../services/authenticationService';
import axios from 'axios';

// constantes qui appellent des logs et l'url de l'api
const apiURL:string = process.env.REACT_APP_API_URL as string;
const apiEmail:string = process.env.REACT_APP_API_USER as string;
const apiMdP:string = process.env.REACT_APP_API_PASSWORD as string;

// Interface qui spécifie le type de propriété attendues pour le bouton (onClick = clique)
interface BoutonValidationProps {
  email: string; 
  mdp: string; 
  onClick: () => void; 
}


// contante BoutonValidation en composant fonctionnel REACT qui prends en objet les propriétées de BoutonValidationProps 
const BoutonValidation: React.FC<BoutonValidationProps> = ({ email, mdp, onClick }) => {
  // Fonction handleClick qui est appellée lors du click sur le bouton
  const handleClick = async () => {
    // Si le mail et le MDP sont identiques au mailAPI et MDPAPI, alors connexion à l'API
    if (email === apiEmail && mdp === apiMdP) {
      console.log("Email et mot de passe conformes !");
        // Token d'authentification
        await forgeToken();
        // récupère le Token dans authentificationService
        const token = getToken();
        // Effectue une requête HTTP GET vers l'API pour obtenir des données personnalisées
        // axios.get : bibliotheque JS qui sert à envoyer la requëte HTTP GET à un serveur pour récupérer les données
        const response = await axios.get(`${apiURL}/materials/custom`, {
          // objet JS qui spécifies les options de la requete HTTP
          // headers : propriété qui indique les entêtes HTTP 
          headers: {
            // Authorization `Bearer ${token}` : entête utilisé pour transmettre les informations d'authentification
            Authorization: `Bearer ${token}`
          }
        });
        console.log("Données de l'API:", response.data);
        // Fonction onClick définie dans la propriété (BoutonValidationProps)
        onClick(); 
    } else {
      // Fonction onClick définie dans la propriété (BoutonValidationProps)
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