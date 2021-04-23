import React, { useState } from 'react';

export const FormCheck: React.FC<{
  id: string;
  label: string;
  value: string;
  initChecked: boolean;
  changeAction: (value: string, chacked: boolean) => void;
}> = ({ id, label, value, initChecked, changeAction }) => {
  const [checked, setChecked] = useState<boolean>(initChecked);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    changeAction(e.target.value, e.target.checked);
    setChecked(e.target.checked);
  };

  return (
    <div className="form-check form-check-inline">
      <input
        className="form-check-input"
        type="checkbox"
        id={id}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <label className="form-check-label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};
