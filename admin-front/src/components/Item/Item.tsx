import React, { useState, createContext, useContext } from 'react';
import { ItemLabelBtn } from './ItemLabelBtn';

const ItemContext = createContext<{ isEdit: boolean }>({
  isEdit: false,
});

export const ItemView: React.FC = ({ children }) => {
  const { isEdit } = useContext(ItemContext);
  return isEdit ? <></> : <>{children}</>;
};

export const ItemEdit: React.FC = ({ children }) => {
  const { isEdit } = useContext(ItemContext);
  return isEdit ? <>{children}</> : <></>;
};

export const Item: React.FC<{
  label: string;
  saveAction: () => void;
  cancelAction: () => void;
}> = ({ label, saveAction, cancelAction, children }) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleClickEditBtn = (): void => {
    setIsEdit(true);
  };

  const handleClickSaveBtn = (): void => {
    (async (): Promise<void> => {
      await saveAction();
      setIsEdit(false);
    })();
  };

  const handleClickCancelBtn = (): void => {
    cancelAction();
    setIsEdit(false);
  };

  return (
    <ItemContext.Provider value={{ isEdit: isEdit }}>
      <div className="row py-1 mb-1">
        <div className="col-md-5 py-1 alert-info font-weight-bold">
          <div className="d-flex justify-content-between h-100">
            <div className="align-self-center">{label}</div>
            <div className="align-self-center">
              <ItemLabelBtn
                isEdit={isEdit}
                onClickEditBtn={handleClickEditBtn}
                onClickSaveBtn={handleClickSaveBtn}
                onClickCancelBtn={handleClickCancelBtn}
              />
            </div>
          </div>
        </div>
        <div className="col-md-7 py-1 align-self-center">{children}</div>
      </div>
    </ItemContext.Provider>
  );
};
