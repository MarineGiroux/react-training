import { useEffect, useState } from "react";
import { Select } from "antd";
import './listeFormat.css'
import MaterialData from "../MaterialData/materialData";

interface ListeFormatProps {
  matiereSelectionnee: string;
  onSelectFormat: (value: string) => void; 
  data:MaterialData[]
}

function ListeFormat({ matiereSelectionnee, onSelectFormat, data }: ListeFormatProps) {
   const [formats, setFormats] = useState<string[]>([]); 

  useEffect(() => {
    if (matiereSelectionnee) {
      const formatsFiltres = data
        .filter(item => item.material.name === matiereSelectionnee)
        .map(item => item.material.format);
      const formatsUniques = Array.from(new Set(formatsFiltres));
      setFormats(formatsUniques);
      formatsUniques.sort((a, b) => a.localeCompare(b));
    }
  }, [matiereSelectionnee, data]);

  const options = formats.map((format, index) => ({
    key: index,
    value: format
  }));

  return (
      <Select
        className='format'  
        options={options} 
        onChange={(value) => onSelectFormat(value)}
      />
  );
}

export default ListeFormat;
