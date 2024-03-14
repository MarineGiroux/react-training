import React from "react";
import { Select } from "antd";
import './selectFormatMatiere.css'

interface selectFormatMatiereProps {
    format: string[];
    onSelectFormat: (value: string) => void;
    selectedFormat: string;
}

const SelectFormat: React.FC<selectFormatMatiereProps> = ({format, onSelectFormat, selectedFormat}) =>(
    <Select
        className="format"
        placeholder='Choix du format'
        onChange={onSelectFormat}
        value={selectedFormat}
        options={format.map(format=> ({value: format, label: format}))}
    />
);

export default SelectFormat;