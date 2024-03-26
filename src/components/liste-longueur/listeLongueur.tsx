import { useEffect, useState } from "react";
import { Select } from "antd";
import './listeLongueur.css'
import MaterialData from "../MaterialData/materialData";

interface ListeLongueurProps {
  matiereSelectionnee: string;
  formatSelectionnee:string;
  onSelectLongueur: (value: number) => void; 
  data:MaterialData[];
}

function ListeLongueur({matiereSelectionnee, formatSelectionnee, onSelectLongueur, data} : ListeLongueurProps) {
  const [longueurs, setLongueurs] = useState<number[]>([]);

  useEffect(() =>{
    if(matiereSelectionnee && formatSelectionnee){
      const longueurfiltres = data
        .filter(item => item.material.name === matiereSelectionnee && item.material.format === formatSelectionnee)
        .map(item => item.material.length);
      const longueursUniques = Array.from(new Set(longueurfiltres));
      setLongueurs(longueursUniques);  
      longueursUniques.sort((a, b) => a - b);
    }
  }, [matiereSelectionnee, formatSelectionnee, data]);

  const options = longueurs.map((longueur, index) => ({
    key: index,
    value: longueur
  }));

  return (
      <Select
        className='longueur'  
        options={options}
        onChange={(value) => onSelectLongueur(value)}
      />
  );
}

export default ListeLongueur;



