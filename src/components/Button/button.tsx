import './button.css';
import { Button } from 'antd';

// Interface qui spécifie le type de propriété attendues pour le bouton
interface BoutonProps {
  onClick: () => void; 
}

function Bouton({ onClick }: BoutonProps) {
  return (
    <Button  type="primary" className="bouton" onClick={onClick}>
      Afficher les choix
    </Button>
  );
}

export default Bouton;
