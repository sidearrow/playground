import React, { useState } from 'react';
import { FormCheck } from './FormCheck';

export const FormCheckGroup: React.FC<{
  items: {
    value: string;
    label: string;
  }[];
  idPrefix: string;
  values: string[];
  changeAction: (values: string[]) => void;
}> = ({ items, idPrefix, values, changeAction }) => {
  const formCheckChangeAction = (value: string): void => {
    changeAction(
      values.includes(value)
        ? values.filter((v) => v !== value)
        : [...values, value]
    );
  };

  return (
    <>
      {items.map((item, i) => (
        <FormCheck
          key={i}
          id={idPrefix + i}
          label={item.label}
          value={item.value}
          initChecked={values.includes(item.value)}
          changeAction={formCheckChangeAction}
        />
      ))}
    </>
  );
};
