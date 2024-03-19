import { useEffect, useState } from "react";
import { forgeToken, getToken } from "../../services/authenticationService"; 
import axios from "axios";
import { Select } from "antd";
import './listeEpaisseur.css'

const apiURL:string = process.env.REACT_APP_API_URL as string;

interface ListeEpaisseurProps {
  matiereSelectionnee: string;
  formatSelectionnee:string;
  longueurSelectionnee:number;
  largeurSelectionnee:number;
  onSelectEpaisseur: (value: number) => void; 
}

function ListeEpaisseur({matiereSelectionnee, formatSelectionnee, longueurSelectionnee, largeurSelectionnee, onSelectEpaisseur} : ListeEpaisseurProps) {
  const [data, setData] = useState<any[]>([]); 
  const [epaisseurs, setEpaisseurs] = useState<number[]>([]);

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

  useEffect(() => {
    if(matiereSelectionnee && formatSelectionnee && longueurSelectionnee && largeurSelectionnee){
      const epaisseurFilters = data
        .filter(item=> item.material.name === matiereSelectionnee && item.material.format === formatSelectionnee && item.material.length === longueurSelectionnee && item.material.width === largeurSelectionnee)
        .map(item => item.material.thickness);
      const epaisseurUniques = Array.from(new Set (epaisseurFilters));
      setEpaisseurs(epaisseurUniques);
      epaisseurUniques.sort((a, b) => a - b);
    }
  }, [matiereSelectionnee, formatSelectionnee, longueurSelectionnee, largeurSelectionnee, data])
  
  const options = epaisseurs.map((epaisseur, index) => ({
    key: index,
    value: epaisseur
  }));

  return (
      <Select
        className='epaisseur'  
        options={options}
        onChange={(value) => onSelectEpaisseur(value)}
      />
  );
}

export default ListeEpaisseur;



