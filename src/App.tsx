import { useEffect, useState } from "react";
// useEffect : pour effectuer des effets de bord dans un composant fonctionnel React (opérations telles que la récupération de données depuis un serveur)
// useState : pour déclarer une variable d'état (valeurs qui peuvent changer au fil du temps et qui déclenchent une réactualisation du composant chaque fois qu'elles sont mises à jour)
import "./App.css";
import Title from "./components/Title/Title";
import Bouton from "./components/Button/button";
import { forgeToken, getToken } from "./services/authenticationService";
import ListeMatiere from "./components/liste-matiere/listeMatiere";
import ListeFormat from "./components/liste-format/listeFormat";
import ListeLongueur from "./components/liste-longueur/listeLongueur";
import ListeLargeur from "./components/liste-largeur/listeLargeur";
import ListeEpaisseur from "./components/liste-epaisseur/listeEpaisseur";
import BoutonValidation from "./components/validation-login/validationLogin";
import PrixMatiere from "./components/prix-matiere/prixMatiere";
import InputLogin from "./components/InputLogin/InputLogin";

// constantes qui appellent des logs de l'api
const apiEmail: string = process.env.REACT_APP_API_USER as string;
const apiMdP: string = process.env.REACT_APP_API_PASSWORD as string;

// Créer un type MatiereType qui a toutes les clés de l'objet ListeMatiere
// keyof : envoie le type de ListeMatiere
// typeof : opérateur TypeScript qui extrait toutes les clés d'un type d'objet donné
type MatiereType = keyof typeof ListeMatiere;

function App() {
  // variables qui stock le choix selectionné (eMail, motDePasse, matiere ...) initialisé à vide "" ou (1)
  // set... (setEMail, setMotDePasse, setMatiere ...) fonction qui va être utilisée pour mettre à jour la valeur
  // useState : initialise l'état de la variable à vide ("") ou 1 (1) ou de typeMatiere ou vide (<MatiereType | "">(""))
  const [eMail, setEmail] = useState("");
  const [motDePasse, setMdP] = useState("");
  const [matiere, setMatiere] = useState<MatiereType | "">("");
  const [format, setFormat] = useState("");
  const [longueurPiece, setLgPiece] = useState<number>(1);
  const [largeurPiece, setLargPiece] = useState<number>(1);
  const [epaisseurPiece, setEpPiece] = useState<number>(1);
  const [showChoices, setShowChoices] = useState(false);
  const [showConnection, setShowConnection] = useState(false);
  const [defaultConnection, setDefaultConnection] = useState(false);
  const [prix, setPrix] = useState<number>(1);

  // fonction de gestion d'événement qui rend la partie ShowChoices visible quand le bouton "afficher" est cliqué
  const handleShowChoices = () => {
    setShowChoices(true);
  };

// fonction de gestion d'événement qui rend la partie ShowConnection visible si quand on clique sur le bouton "se connecter" le mdp et le mail sont conforme, sinon la partie DefaultConnection s'affiche
  const handleShowConnection = () => {
    if (eMail === apiEmail && motDePasse === apiMdP) {
      console.log("sisisi");
      setShowConnection(true);
      setDefaultConnection(false);
    } else if (eMail !== apiEmail || motDePasse !== apiMdP) {
      console.log("nonono");
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
          <InputLogin onInputLogin={setMdP} />
          {defaultConnection && <p className="erreurLog">Email ou Mot de Passe non conforme !</p>}
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
                <ListeMatiere onSelectMatiere={handleSelectMatiere} />
              </div>
              {matiere && (
                <div className="positionnement">
                  <p>Format </p>
                  <ListeFormat
                    matiereSelectionnee={matiere}
                    onSelectFormat={handleSelectFormat}
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
                  />
                </div>
              )}
              {matiere && format && longueurPiece && (
                <div className="positionnement">
                  <p>Largeur de la pièce (mm) </p>
                  <ListeLargeur
                    matiereSelectionnee={matiere}
                    formatSelectionnee={format}
                    longueurSelectionnee={longueurPiece}
                    onSelectLargeur={handleSelectLargeur}
                  />
                </div>
              )}
              {matiere && format && longueurPiece && largeurPiece && (
                <div className="positionnement">
                  <p>Epaisseur de la pièce (mm) </p>
                  <ListeEpaisseur
                    onSelectEpaisseur={handleSelectEpaisseur}
                    matiereSelectionnee={matiere}
                    formatSelectionnee={format}
                    longueurSelectionnee={longueurPiece}
                    largeurSelectionnee={largeurPiece}
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
            />
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
