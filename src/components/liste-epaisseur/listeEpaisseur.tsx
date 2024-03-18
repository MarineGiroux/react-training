import React, { useEffect, useState } from "react";
import { forgeToken, getToken } from "../../services/authenticationService"; 
import axios from "axios";
import { Select } from "antd";
import './listeEpaisseur.css'

const apiURL:string = process.env.REACT_APP_API_URL as string;

interface ListeEpaisseurProps {
  onSelectEpaisseur: (value: number) => void; 
}

function ListeEpaisseur({onSelectEpaisseur} : ListeEpaisseurProps) {
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


  const epaisseurUnique: number[] = [];
  data.forEach(item => {
    const epaisseur = parseFloat(item.material.thickness);
    if (!epaisseurUnique.includes(epaisseur)) {
      epaisseurUnique.push(epaisseur);
    }
  });
  
  epaisseurUnique.sort((a, b) => a - b);
  
  const options = epaisseurUnique.map((epaisseur, index) => ({
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



