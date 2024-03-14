import React from 'react';
import { Select } from 'antd';
import './variationMatiere.css'

interface VariationMatiereProps {
  variations: string[];  
  onSelectVariation: (value: string) => void;  
  selectedVariation: string;  
}


const VariationMatiere: React.FC<VariationMatiereProps> = ({ variations = [], onSelectVariation, selectedVariation }) => (
  <Select
    className='variation'  
    placeholder='Choix de la variation'  
    onChange={onSelectVariation}  
    value={selectedVariation || undefined}  
    options={variations.map(variation => ({ value: variation, label: variation }))}
  />
);


export default VariationMatiere;
