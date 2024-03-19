import { useEffect, useState } from "react";
import { forgeToken, getToken } from "../../services/authenticationService"; 
import axios from "axios";
import { Select } from "antd";
import './listeLargeur.css'

const apiURL:string = process.env.REACT_APP_API_URL as string;

interface ListeLargeurProps {
  matiereSelectionnee: string;
  formatSelectionnee:string;
  longueurSelectionnee:number;
  onSelectLargeur: (value: number) => void; 
}

function ListeLargeur({matiereSelectionnee, formatSelectionnee, longueurSelectionnee, onSelectLargeur} : ListeLargeurProps) {
  const [data, setData] = useState<any[]>([]); 
  const [largeurs, setLargeurs] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await forgeToken(); 
      const token = getToken(); 
        const response = await axios.get(`${apiURL}/materials/custom`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setData(response.data); 
    };

    fetchData();  
  },[]);

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



