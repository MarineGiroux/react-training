import './selectMatiere.css'
import { Select } from 'antd';

const matieres = [
    {value : "INOX",
    label: "Inox",
    },
    {value : "ALU",
    label: "Alu",
    }
  ]
  
const onChangeMatiere = (value : string) => {
console.log(value);

}

const SelectMatiere = () => 

    <Select options ={matieres} className='matiere' placeholder ='Choix de la matière' 
    defaultValue='ALU' onChange={onChangeMatiere}/>

export default SelectMatiere;