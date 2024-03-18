import React, { useEffect, useState } from 'react';
import './App.css';
import Title from './components/Title/Title';
import Bouton from './components/Button/button';
import { forgeToken } from './services/authenticationService';
import ListeMatiere from './components/liste-matiere/listeMatiere';
import ListeFormat from './components/liste-format/listeFormat';
import ListeLongueur from './components/liste-longueur/listeLongueur';
import ListeLargeur from './components/liste-largeur/listeLargeur';
import ListeEpaisseur from './components/liste-epaisseur/listeEpaisseur';

forgeToken();

function App() {
  const [matiere, setMatiere] = useState('');
  const [format, setFormat] = useState('');
  const [longueurPiece, setLgPiece] = useState<number | ''>(''); 
  const [largeurPiece, setLargPiece] = useState<number | ''>(''); 
  const [epaisseurPiece, setEpPiece] = useState<number | ''>(''); 
  const [showChoices, setShowChoices] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      await forgeToken();
    };
    fetchToken();
  }, []);

  const handleShowChoices = () => {
    setShowChoices(true);
  };

  const handleSelectMatiere = (value: string) => {
    setMatiere(value);
  };

  const handleSelectLargeur = (value: number) => {
    setLargPiece(value);
  };

  const handleSelectLongueur = (value: number) => {
    setLgPiece(value);
  };

  const handleSelectEpaisseur = (value: number) => {
    setEpPiece(value);
  };

  const handleSelectFormat = (value: string) => {
    if (matiere) {
      setFormat(value);
    }
  };

  return (
    <div className="App">
      <Title />
      <div className="App-insert">
        <div className='positionnement'>
          <p>Choix de la matière </p>
          <ListeMatiere
            onSelectMatiere={handleSelectMatiere}
          />
          {matiere && (
            <ListeFormat
              onSelectFormat={handleSelectFormat}
            />
          )}
        </div>

        <div className='positionnement'>
          <p>Longueur (mm) : </p>
          <ListeLongueur
            onSelectLongueur={handleSelectLongueur}
          />
          <p>Largeur (mm) : </p>
          <ListeLargeur
            onSelectLargeur={handleSelectLargeur}
          />
          <p>Epaisseur (mm) : </p>
          <ListeEpaisseur
            onSelectEpaisseur={handleSelectEpaisseur}
          />
        </div>
      </div>

      <Bouton onClick={handleShowChoices} />

      {showChoices && (
        <div className='choix'>
          <ul>
            <li>Matière : {matiere} {format}</li>
            <li>Longueur de la pièce : {longueurPiece} mm</li>
            <li>Largeur de la pièce : {largeurPiece} mm</li>
            <li>Epaisseur de la pièce : {epaisseurPiece} mm</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
