import './InputText.css'
import { Input } from 'antd';

interface InputTextProps {
  onInputRef?: (value: string) => void;
}

const InputText: React.FC<InputTextProps> = ({ onInputRef }: InputTextProps) => (
  <Input className='reference' onChange={(e) => onInputRef && onInputRef(e.target.value)} />
);

export default InputText;