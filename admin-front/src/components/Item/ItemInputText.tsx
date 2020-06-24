import React from 'react';
import { ItemCommon, ItemCommonView, ItemCommonEdit } from './ItemCommon';

export const ItemInputText: React.FC<{
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  saveAction: () => void;
}> = ({ label, value, setValue, saveAction }) => {
  return (
    <ItemCommon label={label} saveAction={saveAction}>
      <ItemCommonView>
        <span>{value}</span>
      </ItemCommonView>
      <ItemCommonEdit>
        <input
          type="text"
          className="form-control"
          value={value}
          onChange={(e): void => setValue(e.target.value)}
        />
      </ItemCommonEdit>
    </ItemCommon>
  );
};
