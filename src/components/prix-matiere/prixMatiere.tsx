import { useEffect, useState } from "react";
import MaterialData from "../MaterialData/materialData";

// Interface qui spécifie le type de propriété attendues par PrixMatiere
interface PrixMatiereProps {
  matiereSelectionnee: string;
  formatSelectionnee: string;
  longueurSelectionnee: number;
  largeurSelectionnee: number;
  epaisseurSelectionnee: number;
  // Fonction pour afficher le prix
  onSelectPrix: (value: number) => void;
  data: MaterialData[];
}

// function qui prends en objet les propriétées de PrixMatiereProps
function PrixMatiere({
  matiereSelectionnee,
  formatSelectionnee,
  longueurSelectionnee,
  largeurSelectionnee,
  epaisseurSelectionnee,
  onSelectPrix,
  data,
}: PrixMatiereProps) {
  // Prix de la matière
  const [prix, setPrix] = useState<number>(0);

  // useEffect pour calculer le prix lorsque les selections changent
  useEffect(
    () => {
      // Si toutes les données sont définie alors ...
      if (
        matiereSelectionnee &&
        formatSelectionnee &&
        longueurSelectionnee &&
        largeurSelectionnee &&
        epaisseurSelectionnee
      ) {
        //  Filtrage des données pour trouver les prix correspondant
        const prixFilters = data
          .filter(
            (item) =>
              item.material.name === matiereSelectionnee &&
              item.material.format === formatSelectionnee &&
              item.material.length === longueurSelectionnee &&
              item.material.width === largeurSelectionnee &&
              item.material.thickness === epaisseurSelectionnee
          )
          // extraction des prix
          .map((item) => item.price);

        // Si un prix est trouvé, il est mis à jour
        if (prixFilters.length > 0) {
          setPrix(prixFilters[0]);
          onSelectPrix(prixFilters[0]);
        }
      }
    }, // permet de déclancher l'effet à chaque fois qu'une valeur change, le useEffect sera alors exécuté pour etre mis à jour
    [
      matiereSelectionnee,
      formatSelectionnee,
      longueurSelectionnee,
      largeurSelectionnee,
      epaisseurSelectionnee,
      data,
      onSelectPrix,
    ]
  );

  // Retourne le prix dans une balise li
  return <li className="prix">Prix : {prix} €</li>;
}

export default PrixMatiere;
