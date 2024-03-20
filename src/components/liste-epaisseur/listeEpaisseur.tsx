import { useEffect, useState } from "react";
import { forgeToken, getToken } from "../../services/authenticationService"; 
import axios from "axios";
import { Select } from "antd";
import './listeEpaisseur.css'

const apiURL:string = process.env.REACT_APP_API_URL as string;

// Interface qui spécifie le type de propriété attendues par ListeEpaisseurProps
interface ListeEpaisseurProps {
  matiereSelectionnee: string;
  formatSelectionnee:string;
  longueurSelectionnee:number;
  largeurSelectionnee:number;
  onSelectEpaisseur: (value: number) => void; 
}

// function qui prends en objet les propriétées de ListeEpaisseurProps 
function ListeEpaisseur({matiereSelectionnee, formatSelectionnee, longueurSelectionnee, largeurSelectionnee, onSelectEpaisseur} : ListeEpaisseurProps) {
  const [data, setData] = useState<any[]>([]); 
  const [epaisseurs, setEpaisseurs] = useState<number[]>([]);

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

  useEffect(() => {
    // Si la matière, le format, la longueur et la largeur sont valide alors 
    if(matiereSelectionnee && formatSelectionnee && longueurSelectionnee && largeurSelectionnee){
      // Constante pour récupérer les épaisseurs dans la base de données
      const epaisseurFilters = data
      //  Filtrage des données pour trouver les épaisseurs correspondant
        .filter(item=> item.material.name === matiereSelectionnee && item.material.format === formatSelectionnee && item.material.length === longueurSelectionnee && item.material.width === largeurSelectionnee)
        // extraction des épaisseurs
        .map(item => item.material.thickness);
      // filtre les valeurs pour les mettres dans une constante epaisseurUniques
      const epaisseurUniques = Array.from(new Set (epaisseurFilters));
      // Mise à jour de l'état avec les valeurs filtrées
      setEpaisseurs(epaisseurUniques);
      // Tri des matières par ordre alphabethique
      epaisseurUniques.sort((a, b) => a - b);
    }
  }, [matiereSelectionnee, formatSelectionnee, longueurSelectionnee, largeurSelectionnee, data])
  
  // transforme les epaisseurs en composant pour le select
  const options = epaisseurs.map((epaisseur, index) => ({
    key: index,
    value: epaisseur
  }));

  return (
      <Select
        className='epaisseur'  
        options={options}
        onChange={(value) => onSelectEpaisseur(value)} // evenement pour changer la valeur suivant la selection
      />
  );
}

export default ListeEpaisseur;



