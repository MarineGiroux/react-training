import { useState } from 'react';
import './App.css';
import Title from './components/Title/Title';
import SelectMatiere from './components/select-matiere/selectMatiere';
import VariationMatiere from './components/variation-matiere/variationMatiere';
import InputText from './components/InputTexte/InputText';
import InputNum from './components/InputNumber/inputNumber';
import Bouton from './components/Button/button';
import SelectFormat from './components/selectFormatMatiere/selectFormatMatiere';

const matieresEtVariations = {
  INOX: [
    { variation: '304L', prix: 296 },
    { variation: '316L', prix: 440 }
  ],
  ALU: [
    { variation: '5052', prix: 248 },
    { variation: '7075', prix: 380 }
  ],
  LAITON: [
    { variation:'CW614N', prix: 827}
  ]
};

const formatMatiere = ['Barre', 'Brut', 'Tole', 'Tube', 'Autre'];


type MatiereType = keyof typeof matieresEtVariations;
type FormatType = keyof typeof formatMatiere;

function App() {
  const [matiere, setMatiere] = useState<MatiereType | ''>('');
  const [variation, setVariation] = useState('');
  const [prix, setPrix] = useState<number | ''>('');
  const [refPiece, setRefPiece] = useState('');
  const [longueurPiece, setLgPiece] = useState('');
  const [format, setFormat] = useState('');
  const [quantitePiece, setQtePiece] = useState('');
  const [showChoices, setShowChoices] = useState(false);

  const handleShowChoices = () => {
    setShowChoices(true);
  };

  const handleSelectFormat = (value: string) => {
    if(formatMatiere.includes(value)){
      setFormat(value);
    }else {
      console.error("Aucun format sélectionné");
    }
  }

  const handleSelectMatiere = (value: string) => {
    if (value in matieresEtVariations) {
      setMatiere(value as MatiereType);
      setVariation('');      
      console.log(variation);
      
      setPrix('');
    } else {
      console.error("La valeur sélectionnée n'est pas une matière valide.");
    }
  };

  const handleSelectVariation = (value: string) => {
    if (matiere && matieresEtVariations[matiere]) {
      const selectedPrix = matieresEtVariations[matiere]?.find(v => v.variation === value)?.prix;
      setVariation(value);
      if (selectedPrix !== undefined) {
        setPrix(selectedPrix);
      }
    } else {
      console.error("Aucune matière sélectionnée.");
    }
  };

  return (
    <div className="App">
      <Title/>
      <div className="App-insert">

        <div className='positionnement'>
          <p>Référence de la pièce </p>
          <InputText onInputRef={setRefPiece}/> 
        </div>

        <div className='positionnement'>
          <p>Choix de la matière </p>
          <SelectMatiere
            matieres={Object.keys(matieresEtVariations) as MatiereType[]}
            onSelectMatiere={handleSelectMatiere}
            selectedMatiere={matiere}
          />
          {matiere && (
            <VariationMatiere
              variations={matieresEtVariations[matiere].map(v => v.variation)}
              onSelectVariation={handleSelectVariation}
              selectedVariation={variation}
            />
          )}
        </div>

        <div className='positionnement'>
          <p>Longueur de la pièce (mm) </p>
          <InputNum onInputNum={setLgPiece}/>
          <p>Format de la matière</p>
          <SelectFormat
            format={formatMatiere}
            onSelectFormat={handleSelectFormat}
            selectedFormat={format}
          />
        </div>

        <div className='positionnement'>
          <p>Nombre de pièce </p>
          <InputNum onInputNum={setQtePiece}/>
        </div>

      </div>

      <Bouton onClick={handleShowChoices}/>


      {showChoices && (
        <div className='choix'>
          <ul>
            <li>Référence Pièce : {refPiece}</li>
            <li>Matière : {matiere} {variation}</li>
            <li>Prix de la matière : {prix} €</li>
            <li>Longueur de la pièce : {longueurPiece}</li>
            <li>Format de la matière : {format}</li>
            <li>Nombre de pièce : {quantitePiece}</li>

          </ul>
        </div>
      )}
    </div>
  );
}

export default App;