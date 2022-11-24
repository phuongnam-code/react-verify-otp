import React, { FC } from 'react';
import { UUID } from '@/utils';
import './checkboxStyle.css';

interface CheckboxProps {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  propsCheckbox?: any;
}

const Checkbox: FC<CheckboxProps> = ({ label, checked, onChange, propsCheckbox }) => {
  const id = UUID();
  return (
    <div className="checkbox-container">
      <input
        type="checkbox"
        id={id}
        defaultChecked={checked}
        onChange={(e: React.MouseEvent<HTMLInputElement>) => {
          const checked = (e.target as HTMLInputElement).checked;
          onChange?.(checked);
        }}
        {...propsCheckbox}
      />
      {label && <label htmlFor={id}>{label}</label>}
    </div>
  );
};

export default Checkbox;
