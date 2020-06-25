import React from 'react';
import { Item, ItemView, ItemEdit } from 'components/Item/Item';
import { FormInput } from 'components/Form/FormInput';

export const ItemCompanyCode: React.FC<{
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  saveAction: () => void;
  cancelAction: () => void;
}> = ({ value, setValue, saveAction, cancelAction }) => (
  <Item
    label="事業者コード"
    saveAction={saveAction}
    cancelAction={cancelAction}
  >
    <ItemView>{value}</ItemView>
    <ItemEdit>
      <FormInput
        value={value}
        onChange={(e): void => {
          setValue(e.target.value);
        }}
      />
    </ItemEdit>
  </Item>
);
