import React from 'react';
import { Item, ItemView, ItemEdit } from 'components/Item/Item';
import { FormInput } from 'components/Form/FormInput';

export const ItemCompanyName: React.FC<{
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  saveAction: () => void;
  cancelAction: () => void;
}> = ({ value, setValue, saveAction, cancelAction }) => (
  <Item label="事業者名" saveAction={saveAction} cancelAction={cancelAction}>
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
