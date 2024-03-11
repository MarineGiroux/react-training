import './button.css'
import { Button, Flex } from 'antd';

const Bouton: React.FC = () => (
  <Flex gap="small" wrap="wrap">
    <Button className='bouton'>Envoyer</Button>
  </Flex>
);

export default Bouton;