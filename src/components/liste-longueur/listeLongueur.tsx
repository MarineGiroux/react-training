import React, { useEffect, useState } from "react";
import { forgeToken, getToken } from "../../services/authenticationService"; 
import axios from "axios";
import { Select } from "antd";
import './listeLongueur.css'

const apiURL:string = process.env.REACT_APP_API_URL as string;

interface ListeLongueurProps {
  onSelectLongueur: (value: number) => void; 
}

function ListeLongueur({onSelectLongueur} : ListeLongueurProps) {
  const [data, setData] = useState<any[]>([]); 

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

  const longueurUnique: number[] = [];
  data.forEach(item => {
    const longueurNom = parseFloat(item.material.length);
    if (!longueurUnique.includes(longueurNom)) {
      longueurUnique.push(longueurNom);
    }
  });

  longueurUnique.sort((a, b) => a - b);

  const options = longueurUnique.map((longueur, index) => ({
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



