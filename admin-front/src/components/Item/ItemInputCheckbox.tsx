import React from 'react';
import { SelectItem } from 'constant';
import { ItemCommon, ItemCommonView, ItemCommonEdit } from './ItemCommon';

export const ItemInputCheckbox: React.FC<{
  label: string;
  selectItems: SelectItem[];
  saveAction: () => void;
}> = ({ label, selectItems, saveAction }) => (
  <ItemCommon label={label} saveAction={saveAction}>
    <ItemCommonView>
      <span>aaaaa</span>
    </ItemCommonView>
    <ItemCommonEdit>
      {selectItems.map((selectItem, i) => {
        const id = 'check' + i;

        return (
          <div className="form-check form-check-inline" key={i}>
            <input
              className="form-check-input"
              type="checkbox"
              id={id}
              value={selectItem.value}
            />
            <label className="form-check-label" htmlFor={id}>
              {selectItem.label}
            </label>
          </div>
        );
      })}
    </ItemCommonEdit>
  </ItemCommon>
);
