import './validationLogin.css';
import { Button } from 'antd';

interface BoutonValidationProps {
  onClick: () => void; 
}

function BoutonValidation({ onClick }: BoutonValidationProps) {
  return (
    <Button  type="primary" className="bouton" onClick={onClick}>
      Se connecter
    </Button>
  );
}

export default BoutonValidation;
