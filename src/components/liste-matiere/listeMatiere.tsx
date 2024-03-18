
import React, { useEffect, useState } from "react";
import { forgeToken, getToken } from "../../services/authenticationService"; 
import axios from "axios";
import { Select } from "antd";
import './listeMatiere.css'

const apiURL:string = process.env.REACT_APP_API_URL as string;

interface ListeMatiereProps {
  onSelectMatiere: (value: string) => void; 
}

function ListeMatiere({ onSelectMatiere }: ListeMatiereProps) {
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



  const matiereUnique: string[] = [];
  data.forEach(item => {
    const matiereNom = item.material.name;
    if (!matiereUnique.includes(matiereNom)) {
      matiereUnique.push(matiereNom);
    }
  });

  matiereUnique.sort((a, b) => a.localeCompare(b));

  const options = matiereUnique.map((matiere, index) => ({
    key: index,
    value: matiere
  }));

  return (
    <Select
      className='matiere'  
      options={options}
      onChange={(value) => onSelectMatiere(value)} 
    />
  );
}

export default ListeMatiere;
