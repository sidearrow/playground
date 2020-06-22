import React, { useState } from 'react';

const Value: React.FC<{
  isEdit: boolean;
  value: string;
}> = ({ isEdit, value }) => {
  const [formValue, setFormValue] = useState(value);

  if (!isEdit) {
    return <span>{value}</span>;
  }

  return (
    <input
      type="text"
      className="form-control"
      value={formValue}
      onChange={(e): void => setFormValue(e.target.value)}
    />
  );
};

const EditSaveBtnDispatcher: React.FC<{
  isEdit: boolean;
  onClickEditBtn: React.DOMAttributes<HTMLButtonElement>['onClick'];
  onClickSaveBtn: React.DOMAttributes<HTMLButtonElement>['onClick'];
}> = ({ isEdit, onClickEditBtn, onClickSaveBtn }) => {
  if (isEdit) {
    return (
      <button className="btn btn-sm btn-info" onClick={onClickSaveBtn}>
        保存
      </button>
    );
  }
  return (
    <button className="btn btn-sm btn-info" onClick={onClickEditBtn}>
      編集
    </button>
  );
};

export const Item: React.FC<{
  label: string;
  value: string;
}> = ({ label, value }) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleClickEditBtn = (): void => {
    setIsEdit(true);
  };

  const handleClickSaveBtn = (): void => {
    setIsEdit(false);
  };

  return (
    <div className="row py-1 mb-1">
      <div className="col-md-4 py-1 alert-info font-weight-bold">
        <div className="d-flex justify-content-between h-100">
          <div className="align-self-center">{label}</div>
          <div className="align-self-center">
            <EditSaveBtnDispatcher
              isEdit={isEdit}
              onClickEditBtn={handleClickEditBtn}
              onClickSaveBtn={handleClickSaveBtn}
            />
          </div>
        </div>
      </div>
      <div className="col-md-8 py-1 align-self-center">
        <Value isEdit={isEdit} value={value} />
      </div>
    </div>
  );
};
