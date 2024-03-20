import React, { ChangeEvent } from 'react';
import './InputLogin.css';
import { Input } from 'antd';

interface InputLoginProps {
  onInputLogin?: (value: string) => void;
}

const InputLogin: React.FC<InputLoginProps> = ({ onInputLogin }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onInputLogin) {
      onInputLogin(e.target.value);
    }
  };

  return <Input type="text" className='login' onChange={handleChange} />;
};

export default InputLogin;