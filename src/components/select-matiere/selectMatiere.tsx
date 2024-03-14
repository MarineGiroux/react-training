import React from 'react';
import { Select } from 'antd';
import './selectMatiere.css'

interface SelectMatiereProps {
  matieres: string[]; 
  onSelectMatiere: (value: string) => void;  
  selectedMatiere: string;  
}


const SelectMatiere: React.FC<SelectMatiereProps> = ({ matieres, onSelectMatiere, selectedMatiere }) => (
  <Select
    className='matiere'  
    placeholder='Choix de la matière' 
    onChange={onSelectMatiere} 
    value={selectedMatiere}  
    options={matieres.map(matiere => ({ value: matiere, label: matiere }))}  
  />
);


export default SelectMatiere;