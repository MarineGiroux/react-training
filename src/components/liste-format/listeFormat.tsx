import { useEffect, useState } from "react";
import { forgeToken, getToken } from "../../services/authenticationService"; 
import axios from "axios";
import { Select } from "antd";
import './listeFormat.css'

const apiURL:string = process.env.REACT_APP_API_URL as string;

interface ListeFormatProps {
  matiereSelectionnee: string;
  onSelectFormat: (value: string) => void; 
}

function ListeFormat({ matiereSelectionnee, onSelectFormat }: ListeFormatProps) {
  const [data, setData] = useState<any[]>([]); 
  const [formats, setFormats] = useState<string[]>([]); 

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
    if (matiereSelectionnee) {
      const formatsFiltres = data
        .filter(item => item.material.name === matiereSelectionnee)
        .map(item => item.material.format);
      const formatsUniques = Array.from(new Set(formatsFiltres));
      setFormats(formatsUniques);
      formatsUniques.sort((a, b) => a - b);
    }
  }, [matiereSelectionnee, data]);

  const options = formats.map((format, index) => ({
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
