import React from 'react';

export const ItemLabelBtn: React.FC<{
  isEdit: boolean;
  onClickEditBtn: React.DOMAttributes<HTMLButtonElement>['onClick'];
  onClickSaveBtn: React.DOMAttributes<HTMLButtonElement>['onClick'];
  onClickCancelBtn: React.DOMAttributes<HTMLButtonElement>['onClick'];
}> = ({ isEdit, onClickEditBtn, onClickSaveBtn, onClickCancelBtn }) => {
  if (isEdit) {
    return (
      <>
        <button className="btn btn-sm btn-info" onClick={onClickSaveBtn}>
          保存
        </button>
        <button
          className="btn btn-sm btn-secondary ml-2"
          onClick={onClickCancelBtn}
        >
          キャンセル
        </button>
      </>
    );
  }
  return (
    <button className="btn btn-sm btn-info" onClick={onClickEditBtn}>
      編集
    </button>
  );
};
