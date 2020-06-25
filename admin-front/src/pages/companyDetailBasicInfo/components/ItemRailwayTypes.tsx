import React from 'react';
import { Item, ItemView, ItemEdit } from 'components/Item/Item';
import { constant } from 'constant';
import { FormCheckGroup } from 'components/Form/FormCheckGroup';

export const ItemRailwayTypes: React.FC<{
  value: string[];
  setValue: React.Dispatch<React.SetStateAction<string[]>>;
  saveAction: () => void;
  cancelAction: () => void;
}> = ({ value, setValue, saveAction, cancelAction, children }) => (
  <Item label="鉄道タイプ" saveAction={saveAction} cancelAction={cancelAction}>
    <ItemView>{children}</ItemView>
    <ItemEdit>
      <FormCheckGroup
        items={constant.selectItems.railwayType}
        idPrefix="railwayType"
        values={value}
        changeAction={(v): void => {
          setValue(v);
        }}
      />
    </ItemEdit>
  </Item>
);
