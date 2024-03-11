import './inputNumber.css';
import { Input } from 'antd';

interface InputTextProps {
  onInputNum?: (value: string) => void;
}

const InputNum: React.FC<InputTextProps> = ({ onInputNum }: InputTextProps) => (
  <Input className='number' type='number' onChange={(e) => onInputNum && onInputNum(e.target.value)} />
);

export default InputNum;