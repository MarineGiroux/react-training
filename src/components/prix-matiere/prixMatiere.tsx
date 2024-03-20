import React, { useEffect, useState } from "react";
import { forgeToken, getToken } from "../../services/authenticationService";
import axios from "axios";

const apiURL: string = process.env.REACT_APP_API_URL as string;

// Interface qui spécifie le type de propriété attendues par PrixMatiere
interface PrixMatiereProps {
  matiereSelectionnee: string;
  formatSelectionnee: string;
  longueurSelectionnee: number;
  largeurSelectionnee: number;
  epaisseurSelectionnee: number;
  // Fonction pour afficher le prix
  onSelectPrix: (value: number) => void;
}

// function qui prends en objet les propriétées de PrixMatiereProps 
function PrixMatiere({
  matiereSelectionnee,
  formatSelectionnee,
  longueurSelectionnee,
  largeurSelectionnee,
  epaisseurSelectionnee,
  onSelectPrix,
}: PrixMatiereProps) {
  // Données récupérées depuis l'API
  const [data, setData] = useState<any[]>([]);
  // Prix de la matière
  const [prix, setPrix] = useState<number>(0);

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

  // useEffect pour calculer le prix lorsque les selections changent
  useEffect(() => {
    // Si toutes les données sont définie alors ...
    if (
      matiereSelectionnee &&
      formatSelectionnee &&
      longueurSelectionnee &&
      largeurSelectionnee &&
      epaisseurSelectionnee
    ) {
      //  Filtrage des données pour trouver les prix correspondant
      const prixFilters = data
        .filter(
          (item) =>
            item.material.name === matiereSelectionnee &&
            item.material.format === formatSelectionnee &&
            item.material.length === longueurSelectionnee &&
            item.material.width === largeurSelectionnee &&
            item.material.thickness === epaisseurSelectionnee
        )
        // extraction des prix
        .map((item) => item.price);

      // Si un prix est trouvé, il est mis à jour 
      if (prixFilters.length > 0) {
        setPrix(prixFilters[0]);
        onSelectPrix(prixFilters[0]);
      }
    }
  }, // permet de déclancher l'effet à chaque fois qu'une valeur change, le useEffect sera alors exécuté pour etre mis à jour
    [
    matiereSelectionnee,
    formatSelectionnee,
    longueurSelectionnee,
    largeurSelectionnee,
    epaisseurSelectionnee,
    data,
    onSelectPrix,
  ]);

  // Retourne le prix dans une balise li
  return <li className="prix">Prix : {prix} €</li>;
}

export default PrixMatiere;
