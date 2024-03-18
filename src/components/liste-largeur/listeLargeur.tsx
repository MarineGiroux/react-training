import React, { useEffect, useState } from "react";
import { forgeToken, getToken } from "../../services/authenticationService"; 
import axios from "axios";
import { Select } from "antd";
import './listeLargeur.css'

const apiURL:string = process.env.REACT_APP_API_URL as string;

interface ListeLargeurProps {
  onSelectLargeur: (value: number) => void; 
}

function ListeLargeur({onSelectLargeur} : ListeLargeurProps) {
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

  const largeurUnique: number[] = [];
  data.forEach(item => {
    const largeurNom = parseFloat(item.material.width);
    if (!largeurUnique.includes(largeurNom)) {
      largeurUnique.push(largeurNom);
    }
  });

  largeurUnique.sort((a, b) => a - b);

  const options = largeurUnique.map((largeur, index) => ({
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



