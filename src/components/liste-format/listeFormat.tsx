import React, { useEffect, useState } from "react";
import { forgeToken, getToken } from "../../services/authenticationService"; 
import axios from "axios";
import { Select } from "antd";
import './listeFormat.css'

const apiURL:string = process.env.REACT_APP_API_URL as string;

interface ListeFormatProps {
  onSelectFormat: (value: string) => void; 
}

function ListeFormat({onSelectFormat} : ListeFormatProps) {
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

  const formatUnique: string[] = [];
  data.forEach(item => {
    const formatNom = item.material.format;
    if (!formatUnique.includes(formatNom)) {
      formatUnique.push(formatNom);
    }
  });

  formatUnique.sort((a, b) => a.localeCompare(b));

  const options = formatUnique.map((format, index) => ({
    key: index,
    value: format
  }));

  return (
      <Select
        className='format'  
        options={options}
        onChange={(value) => onSelectFormat(value)}
      />
  );
}

export default ListeFormat;



