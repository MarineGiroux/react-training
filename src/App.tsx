import { useEffect, useState } from "react";
// useEffect : pour effectuer des effets de bord dans un composant fonctionnel React (opérations telles que la récupération de données depuis un serveur)
// useState : pour déclarer une variable d'état (valeurs qui peuvent changer au fil du temps et qui déclenchent une réactualisation du composant chaque fois qu'elles sont mises à jour)
import "./App.css";
import ListeMatiere from "./components/liste-matiere/listeMatiere";
import Title from "./components/Title/Title";
import InputLogin from "./components/InputLogin/InputLogin";
import BoutonValidation from "./components/validation-login/validationLogin";
import ListeFormat from "./components/liste-format/listeFormat";
import ListeLongueur from "./components/liste-longueur/listeLongueur";
import ListeLargeur from "./components/liste-largeur/listeLargeur";
import ListeEpaisseur from "./components/liste-epaisseur/listeEpaisseur";
import Bouton from "./components/Button/button";
import PrixMatiere from "./components/prix-matiere/prixMatiere";
import { forgeToken, getToken } from "./services/authenticationService";
import axios from "axios";
import MaterialData from "./components/MaterialData/materialData";

// constantes qui appellent des logs de l'api
const apiEmail: string = process.env.REACT_APP_API_USER as string;
const apiMdP: string = process.env.REACT_APP_API_PASSWORD as string;
const apiURL: string = process.env.REACT_APP_API_URL as string;

// Créer un type MatiereType qui a toutes les clés de l'objet ListeMatiere
// keyof : envoie le type de ListeMatiere
// typeof : opérateur TypeScript qui extrait toutes les clés d'un type d'objet donné
type MatiereType = keyof typeof ListeMatiere;

function App() {
  // variables qui stock le choix selectionné (eMail, motDePasse, matiere ...) initialisé à vide "" ou (0)
  // set... (setEMail, setMotDePasse, setMatiere ...) fonction qui va être utilisée pour mettre à jour la valeur
  // useState : initialise l'état de la variable à vide ("") ou 0 (0) ou de typeMatiere ou vide (<MatiereType | "">(""))
  const [eMail, setEmail] = useState("");
  const [motDePasse, setMdP] = useState("");
  const [matiere, setMatiere] = useState<MatiereType | "">("");
  const [format, setFormat] = useState("");
  const [longueurPiece, setLgPiece] = useState<number>(0);
  const [largeurPiece, setLargPiece] = useState<number>(0);
  const [epaisseurPiece, setEpPiece] = useState<number>(0);
  const [showChoices, setShowChoices] = useState(false);
  const [showConnection, setShowConnection] = useState(false);
  const [defaultConnection, setDefaultConnection] = useState(false);
  const [prix, setPrix] = useState<number>(0);
  const [data, setData] = useState<MaterialData[]>([]);

  // Effet pour récupérer les données de l'API
  useEffect(
    () => {
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
            Authorization: `Bearer ${token}`,
          },
        });
        // Met à jour l'état data du composant avec les données récupérées depuis l'API
        setData(response.data);
      };

      // fonction pour démarrer le processus de récupération des données
      fetchData();
    }, // tableau vide pour éxécuter l'effet que 1 fois
    []
  );

  // fonction de gestion d'événement qui rend la partie ShowChoices visible quand le bouton "afficher" est cliqué
  const handleShowChoices = () => {
    setShowChoices(true);
  };

  // fonction de gestion d'événement qui rend la partie ShowConnection visible si quand on clique sur le bouton "se connecter" le mdp et le mail sont conforme, sinon la partie DefaultConnection s'affiche
  const handleShowConnection = () => {
    if (eMail === apiEmail && motDePasse === apiMdP) {
      setShowConnection(true);
      setDefaultConnection(false);
    } else if (eMail !== apiEmail || motDePasse !== apiMdP) {
      setDefaultConnection(true);
    }
  };

  // fonction de gestion d'événement qui si il y a une valeur dans le champ input de la matière, la récupère et met à jour la matière qui est vide avant cet événement
  const handleSelectMatiere = (value: string) => {
    if (value) {
      setMatiere(value as MatiereType);
    }
  };

  // idem avec le format, et vérifie qui il y a une matière selectionnée avant de mettre à jour le format,
  const handleSelectFormat = (value: string) => {
    if (matiere) {
      setFormat(value);
    }
  };

  const handleSelectLongueur = (value: number) => {
    if (matiere && format) {
      setLgPiece(value);
    }
  };

  const handleSelectLargeur = (value: number) => {
    if (matiere && format && longueurPiece) {
      setLargPiece(value);
    }
  };

  const handleSelectEpaisseur = (value: number) => {
    if (matiere && format && longueurPiece && largeurPiece) {
      setEpPiece(value);
    }
  };

  // affichage
  return (
    <div className="App">
      <Title />

      <div className="App-insert">
        <div className="positionnement">
          <p>Email : </p>
          <InputLogin onInputLogin={setEmail} />
          <p>Mot de Passe : </p>
          <InputLogin onInputLogin={setMdP} type="password" />
          {defaultConnection && (
            <p className="erreurLog">Email ou Mot de Passe non conforme !</p>
          )}
        </div>
      </div>

      <BoutonValidation
        email={eMail}
        mdp={motDePasse}
        onClick={handleShowConnection}
      />

      <br />

      {showConnection && (
        <div>
          <div className="App-insert">
            <div className="positionnement">
              <div className="positionnement">
                <p>Choix de la matière </p>
                <ListeMatiere
                  onSelectMatiere={handleSelectMatiere}
                  data={data}
                />
              </div>
              {matiere && (
                <div className="positionnement">
                  <p>Format </p>
                  <ListeFormat
                    matiereSelectionnee={matiere}
                    onSelectFormat={handleSelectFormat}
                    data={data}
                  />
                </div>
              )}
            </div>
            <div className="positionnement">
              {matiere && format && (
                <div className="positionnement">
                  <p>Longueur de la pièce (mm) </p>
                  <ListeLongueur
                    matiereSelectionnee={matiere}
                    formatSelectionnee={format}
                    onSelectLongueur={handleSelectLongueur}
                    data={data}
                  />
                </div>
              )}
              {matiere && format && longueurPiece !=0 && (
                <div className="positionnement">
                  <p>Largeur de la pièce (mm) </p>
                  <ListeLargeur
                    matiereSelectionnee={matiere}
                    formatSelectionnee={format}
                    longueurSelectionnee={longueurPiece}
                    onSelectLargeur={handleSelectLargeur}
                    data={data}
                  />
                </div>
              )}
              {matiere && format && longueurPiece !=0 && largeurPiece !=0 && (
                <div className="positionnement">
                  <p>Epaisseur de la pièce (mm) </p>
                  <ListeEpaisseur
                    onSelectEpaisseur={handleSelectEpaisseur}
                    matiereSelectionnee={matiere}
                    formatSelectionnee={format}
                    longueurSelectionnee={longueurPiece}
                    largeurSelectionnee={largeurPiece}
                    data={data}
                  />
                </div>
              )}
            </div>
          </div>

          <Bouton onClick={handleShowChoices} />
        </div>
      )}

      {showChoices && (
        <div className="choix">
          <ul>
            <li>
              Matière : {matiere} {format}
            </li>
            <li>Longueur de la pièce : {longueurPiece} mm</li>
            <li>Largeur de la pièce : {largeurPiece} mm</li>
            <li>Epaisseur de la pièce : {epaisseurPiece} mm</li>
            <PrixMatiere
              matiereSelectionnee={matiere}
              formatSelectionnee={format}
              longueurSelectionnee={longueurPiece}
              largeurSelectionnee={largeurPiece}
              epaisseurSelectionnee={epaisseurPiece}
              onSelectPrix={(value) => setPrix(value)}
              data={data}
            />
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
