import { useEffect, useState } from "react";
import { Select } from "antd";
import './listeEpaisseur.css'
import MaterialData from "../MaterialData/materialData";


// Interface qui spécifie le type de propriété attendues par ListeEpaisseurProps
interface ListeEpaisseurProps {
  matiereSelectionnee: string;
  formatSelectionnee:string;
  longueurSelectionnee:number;
  largeurSelectionnee:number;
  onSelectEpaisseur: (value: number) => void;
  data:MaterialData[] 
}

// function qui prends en objet les propriétées de ListeEpaisseurProps 
function ListeEpaisseur({matiereSelectionnee, formatSelectionnee, longueurSelectionnee, largeurSelectionnee, onSelectEpaisseur, data} : ListeEpaisseurProps) {
  const [epaisseurs, setEpaisseurs] = useState<number[]>([]);


  useEffect(() => {
    // Si la matière, le format, la longueur et la largeur sont valide alors 
    if(matiereSelectionnee && formatSelectionnee && longueurSelectionnee && largeurSelectionnee){
      // Constante pour récupérer les épaisseurs dans la base de données
      const epaisseurFilters = data
      //  Filtrage des données pour trouver les épaisseurs correspondant
        .filter(item=> item.material.name === matiereSelectionnee && item.material.format === formatSelectionnee && item.material.length === longueurSelectionnee && item.material.width === largeurSelectionnee)
        // extraction des épaisseurs
        .map(item => item.material.thickness);
      // filtre les valeurs pour les mettres dans une constante epaisseurUniques
      const epaisseurUniques = Array.from(new Set (epaisseurFilters));
      // Mise à jour de l'état avec les valeurs filtrées
      setEpaisseurs(epaisseurUniques);
      // Tri des matières par ordre alphabethique
      epaisseurUniques.sort((a, b) => a - b);
    }
  }, [matiereSelectionnee, formatSelectionnee, longueurSelectionnee, largeurSelectionnee, data])
  
  // transforme les epaisseurs en composant pour le select
  const options = epaisseurs.map((epaisseur, index) => ({
    key: index,
    value: epaisseur
  }));

  return (
      <Select
        className='epaisseur'  
        options={options}
        onChange={(value) => onSelectEpaisseur(value)} // evenement pour changer la valeur suivant la selection
      />
  );
}

export default ListeEpaisseur;



