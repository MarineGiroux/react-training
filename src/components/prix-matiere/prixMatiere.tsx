import React from 'react';
import { Select } from 'antd';

interface PrixMatiereProps {
  prix: number[];
  onSelectPrix: (value: number) => void;
  selectedPrix: number;
}


const PrixMatiere: React.FC<PrixMatiereProps> = ({ prix = [], onSelectPrix, selectedPrix }) => (
  <Select
    className='prix'
    onChange={onSelectPrix}
    value={selectedPrix || undefined}
    options={prix.map(prix => ({ value: prix, label: prix }))}
  />
);

export default PrixMatiere;
