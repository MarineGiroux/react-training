import { useEffect, useState } from "react";
import { forgeToken, getToken } from "../../services/authenticationService"; 
import axios from "axios";
import { Select } from "antd";
import './listeLongueur.css'

const apiURL:string = process.env.REACT_APP_API_URL as string;

interface ListeLongueurProps {
  matiereSelectionnee: string;
  formatSelectionnee:string;
  onSelectLongueur: (value: number) => void; 
}

function ListeLongueur({matiereSelectionnee, formatSelectionnee, onSelectLongueur} : ListeLongueurProps) {
  const [data, setData] = useState<any[]>([]); 
  const [longueurs, setLongueurs] = useState<number[]>([]);

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



