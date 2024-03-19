import React, { useEffect, useState } from "react";
import { forgeToken, getToken } from "../../services/authenticationService"; 
import { Select } from 'antd';
import axios from "axios";

const apiURL:string = process.env.REACT_APP_API_URL as string;

interface PrixMatiereProps {
  matiereSelectionnee: string;
  formatSelectionnee:string;
  longueurSelectionnee:number;
  largeurSelectionnee:number;
  epaisseurSelectionnee:number;
  onSelectPrix: (value: number) => void;
}


function PrixMatiere({matiereSelectionnee, formatSelectionnee, longueurSelectionnee, largeurSelectionnee,epaisseurSelectionnee, onSelectPrix} : PrixMatiereProps){
  const [data, setData] = useState<any[]>([]); 
  const [prix, setPrix] = useState<number>(0);

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
    if(matiereSelectionnee && formatSelectionnee && longueurSelectionnee && largeurSelectionnee && epaisseurSelectionnee){
      const prixFilters = data
        .filter(item=> item.material.name === matiereSelectionnee && item.material.format === formatSelectionnee && item.material.length === longueurSelectionnee && item.material.width === largeurSelectionnee && item.material.thickness === epaisseurSelectionnee)
        .map(item => item.price);

      if (prixFilters.length > 0) {
        setPrix(prixFilters[0]);
        onSelectPrix(prixFilters[0]);
      }
    }
  }, [matiereSelectionnee, formatSelectionnee, longueurSelectionnee, largeurSelectionnee, epaisseurSelectionnee, data, onSelectPrix])
  
  return (
      <li className="prix">Prix : {prix} €</li>
  );
}

export default PrixMatiere;
