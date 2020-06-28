import React from 'react';

type FormInputProps = {
  value: string;
  onChange: React.InputHTMLAttributes<HTMLInputElement>['onChange'];
};

export const FormInput: React.FC<FormInputProps> = ({ value, onChange }) => (
  <input className="form-control" value={value} onChange={onChange} />
);
