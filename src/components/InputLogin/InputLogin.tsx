import './InputLogin.css'
import { Input } from 'antd';

interface InputLoginProps {
  onInputLogin?: (value: string) => void;
}

const InputLogin: React.FC<InputLoginProps> = ({ onInputLogin }: InputLoginProps) => (
  <Input className='login' onChange={(e) => onInputLogin && onInputLogin(e.target.value)} />
);

export default InputLogin;