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


interface SelectMatiereProps{
    onSelectMatiere?: (value: string ) => void
}

const SelectMatiere = ({onSelectMatiere}: SelectMatiereProps) => 

    <Select options ={matieres} className='matiere' placeholder ='Choix de la matière' 
    defaultValue='ALU' onChange={onSelectMatiere}/>

export default SelectMatiere;