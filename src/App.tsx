import { useEffect, useState } from 'react';
import './App.css';
import Title from './components/Title/Title';
import Bouton from './components/Button/button';
import { forgeToken } from './services/authenticationService';
import ListeMatiere from './components/liste-matiere/listeMatiere';
import ListeFormat from './components/liste-format/listeFormat';
import ListeLongueur from './components/liste-longueur/listeLongueur';
import ListeLargeur from './components/liste-largeur/listeLargeur';
import ListeEpaisseur from './components/liste-epaisseur/listeEpaisseur';
import InputLogin from './components/InputLogin/InputLogin';
import BoutonValidation from './components/validation-login/validationLogin';
import PrixMatiere from './components/prix-matiere/prixMatiere';

const matiereChoisie = ListeMatiere;

type MatiereType = keyof typeof matiereChoisie;


function App() {
  const [eMail, setEmail] = useState('');
  const [motDePasse, setMdP] = useState('');
  const [matiere, setMatiere] = useState<MatiereType | ''>('');
  const [format, setFormat] = useState('');
  const [longueurPiece, setLgPiece] = useState<number>(1);
  const [largeurPiece, setLargPiece] = useState<number>(1);
  const [epaisseurPiece, setEpPiece] = useState<number>(1);
  const [showChoices, setShowChoices] = useState(false);
  const [showConnection, setShowConnection] = useState(false);
  const [prix, setPrix] = useState<number>(1);

  useEffect(() => {
    const fetchToken = async () => {
      await forgeToken();
    };
    fetchToken();
  }, []);

  const handleShowChoices = () => {
    setShowChoices(true);
  };

  const handleShowConnection = () => {
    setShowConnection(true);
  };

  const handleSelectMatiere = (value: string) => {
    if(value){
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
        <div className='positionnement'>
        <p>Email : </p>
        <InputLogin onInputLogin={setEmail}/>
        <p>Mot de passe : </p>
        <InputLogin onInputLogin={setMdP}/>
        </div>
      </div>

      <BoutonValidation onClick={handleShowConnection} />

      <br/>

      <div className="App-insert">
        <div className='positionnement'>
          <div className='positionnement'>
            <p>Choix de la matière </p>
            <ListeMatiere
              onSelectMatiere={handleSelectMatiere}
            />
          </div>
          {matiere && (
            <div className='positionnement'>
            <p>Format </p>
              <ListeFormat
                matiereSelectionnee={matiere}
                onSelectFormat={handleSelectFormat}
              />
            </div>
          )}
        </div>
        <div className='positionnement'>
          { matiere && format && (
            <div className='positionnement'>
            <p>Longueur de la pièce (mm) </p>
              <ListeLongueur
              matiereSelectionnee={matiere}
              formatSelectionnee={format}
              onSelectLongueur={handleSelectLongueur}
              />
            </div>
          )}
          { matiere && format && longueurPiece && (
            <div className='positionnement'>
            <p>Largeur de la pièce (mm) </p>
              <ListeLargeur
                matiereSelectionnee={matiere}
                formatSelectionnee={format}
                longueurSelectionnee={longueurPiece}
                onSelectLargeur={handleSelectLargeur}
              />
            </div>
          )}
          { matiere && format && longueurPiece && largeurPiece && (
            <div className='positionnement'>
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

      {showConnection && (
        <div className='choix'>
          <ul>
            <li>Email : {eMail}</li>
            <li>MdP : {motDePasse}</li>
          </ul>
        </div>
      )}

{showChoices && (
  <div className='choix'>
    <ul>
      <li>Matière : {matiere} {format}</li>
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
