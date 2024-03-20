import { useEffect, useState } from "react";
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

const matiereChoisie = ListeMatiere;
const apiEmail: string = process.env.REACT_APP_API_USER as string;
const apiMdP: string = process.env.REACT_APP_API_PASSWORD as string;

type MatiereType = keyof typeof matiereChoisie;

function App() {
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

  const handleShowChoices = () => {
    setShowChoices(true);
  };

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

  const handleSelectMatiere = (value: string) => {
    if (value) {
      setMatiere(value as MatiereType);
    }
  };

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
