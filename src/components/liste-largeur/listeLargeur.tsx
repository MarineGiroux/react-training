import { useEffect, useState } from "react";
import { Select } from "antd";
import './listeLargeur.css'
import MaterialData from "../MaterialData/materialData";

interface ListeLargeurProps {
  matiereSelectionnee: string;
  formatSelectionnee:string;
  longueurSelectionnee:number;
  onSelectLargeur: (value: number) => void; 
  data:MaterialData[];
}

function ListeLargeur({matiereSelectionnee, formatSelectionnee, longueurSelectionnee, onSelectLargeur, data} : ListeLargeurProps) {
  const [largeurs, setLargeurs] = useState<number[]>([]);

   useEffect(() =>{
    if(matiereSelectionnee && formatSelectionnee && longueurSelectionnee){
      const largeurFilters = data
        .filter(item=> item.material.name === matiereSelectionnee && item.material.format === formatSelectionnee && item.material.length === longueurSelectionnee )
        .map(item => item.material.width);
      const largeurUniques = Array.from(new Set (largeurFilters));
      setLargeurs(largeurUniques);
      largeurUniques.sort((a, b) => a - b);
    }
  },[matiereSelectionnee, formatSelectionnee, longueurSelectionnee, data])

  const options = largeurs.map((largeur, index) => ({
    key: index,
    value: largeur
  }));


  return (
      <Select
        className='largeur'  
        options={options}
        onChange={(value) => onSelectLargeur(value)}
      />
  );
}

export default ListeLargeur;



