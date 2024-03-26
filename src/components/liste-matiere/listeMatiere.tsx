import { Select } from "antd";
import "./listeMatiere.css";
import MaterialData from "../MaterialData/materialData";

// Interface qui spécifie le type de propriété attendues par ListeMatiereProps
interface ListeMatiereProps {
  onSelectMatiere: (value: string) => void;
  data: MaterialData[];
}

// function qui prends en objet les propriétées de ListeMatiereProps
function ListeMatiere({ onSelectMatiere, data }: ListeMatiereProps) {
  // Initialisation d'un tableau pour stocker les matières (servira à ne pas doubler les noms des matières)
  const matiereUnique: string[] = [];
  // parcours toutes les données pour extraire les noms
  data.forEach((item) => {
    const matiereNom = item.material.name;
    // Si le nom de la matière est pas dans le tableau, alors le pusher dans le tableau
    if (!matiereUnique.includes(matiereNom)) {
      matiereUnique.push(matiereNom);
    }
  });

  // Tri des matières par ordre alphabethique
  matiereUnique.sort((a, b) => a.localeCompare(b));

  // transforme les noms des matières en composant pour le select
  const options = matiereUnique.map((matiereNom, index) => ({
    key: index, // Clé unique pour chaque option
    value: matiereNom, // Valeur affichée de l'option
  }));

  // Création d'un tableau contenant les valeurs d'identification de chaque matière
  const idMatiereValues = data.map((item) => item.value);

  return (
    <Select
      className="matiere"
      options={options}
      onChange={(value) => onSelectMatiere(value)} // evenement pour changer la valeur suivant la selection
      id={idMatiereValues.join("")} // Identifiant unique basé sur les valeurs d'identifiant des matières
    />
  );
}

export default ListeMatiere;
