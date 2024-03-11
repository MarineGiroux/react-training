import { useState } from 'react';
import './App.css';
import Title from './components/Title/Title';
import SelectMatiere from './components/select-matiere/selectMatiere';
import InputText from './components/InputTexte/InputText';
import InputNum from './components/InputNumber/inputNumber';
import Bouton from './components/Button/button';
 

function App() {
  const [choixMatiere, setChoixMatiere] = useState('')
  const [refPiece, setRefPiece] = useState('')
  const [longueurPiece, setLgPiece] = useState('');
  const [largeurPiece, setLagPiece] = useState('');
  const [hauteurPiece, setHauteurPiece] = useState('');
  const [quantitePiece, setQtePiece] = useState('');

  return (
    <div className="App">
      <Title/>
      <p>Référence de la pièce : </p>
      <InputText onInputRef={setRefPiece}/>
      <p>Choix de la matière : </p>
      <SelectMatiere onSelectMatiere={setChoixMatiere}/>
      <p>Longueur de la pièce : </p>
      <InputNum onInputNum={setLgPiece}/>
      <p>Largeur de la pièce : </p>
      <InputNum onInputNum={setLagPiece}/>
      <p>Hauteur de la pièce : </p>
      <InputNum onInputNum={setHauteurPiece}/>
      <p>Nombre de pièce total : </p>
      <InputNum onInputNum={setQtePiece}/>
      <Bouton/>

      {/* affichage des réponses  */}
      <div>
        Choix : 
        <ul>
          <li>Référence Pièce : {refPiece}</li>
          <li>Matière : {choixMatiere}</li>
          <li>Longueur de la pièce : {longueurPiece}</li>
          <li>Largeur de la pièce : {largeurPiece}</li>
          <li>Hauteur de la pièce : {hauteurPiece}</li>
          <li>Nombre de pièce : {quantitePiece}</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
