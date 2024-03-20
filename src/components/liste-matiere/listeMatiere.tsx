import { useEffect, useState } from "react";
import { forgeToken, getToken } from "../../services/authenticationService"; 
import axios from "axios";
import { Select } from "antd";
import './listeMatiere.css'


const apiURL:string = process.env.REACT_APP_API_URL as string;

// Interface qui spécifie le type de propriété attendues par ListeMatiereProps
interface ListeMatiereProps {
  onSelectMatiere: (value: string) => void; 
}

// function qui prends en objet les propriétées de ListeMatiereProps 
function ListeMatiere({ onSelectMatiere }: ListeMatiereProps) {
  const [data, setData] = useState<any[]>([]); 

// Effet pour récupérer les données de l'API
useEffect(() => {
  // fonction responsable de récupérer les données de l'API
  const fetchData = async () => {
    // Appel la fonction forgeToken pour obtenir le token d'authentification pour accéder à l'API.
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
    // Met à jour l'état data du composant avec les données récupérées depuis l'API
    setData(response.data);
  };

  // fonction pour démarrer le processus de récupération des données
  fetchData();
}, // tableau vide pour éxécuter l'effet que 1 fois
[]);


  // Initialisation d'un tableau pour stocker les matières (servira à ne pas doubler les noms des matières)
  const matiereUnique: string[] = [];
  // parcours toutes les données pour extraire les noms 
  data.forEach(item => {
    const matiereNom = item.material.name;
    // Si le nom de la matière est pas dans le tableau, alors le pusher dans le tableau
    if (!matiereUnique.includes(matiereNom)) {
      matiereUnique.push(matiereNom);
    }
  });

  // Tri des matières par ordre alphabethique
  matiereUnique.sort((a, b) => a.localeCompare(b));

  // transforme les noms des matières en composant pour le select
  const options = matiereUnique.map((matiereNom, index) => ({
    key: index, // Clé unique pour chaque option
    value: matiereNom // Valeur affichée de l'option
  }));

  // Création d'un tableau contenant les valeurs d'identification de chaque matière
  const idMatiereValues = data.map(item => item.value);

  return (
    <Select
      className='matiere'  
      options={options}
      onChange={(value) => onSelectMatiere(value)} // evenement pour changer la valeur suivant la selection
      id={idMatiereValues.join('')} // Identifiant unique basé sur les valeurs d'identifiant des matières
    />
  );

}

export default ListeMatiere;


