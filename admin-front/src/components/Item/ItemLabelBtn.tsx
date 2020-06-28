import React from 'react';
import { Button } from '@material-ui/core';

export const ItemLabelBtn: React.FC<{
  isEdit: boolean;
  onClickEditBtn: React.DOMAttributes<HTMLButtonElement>['onClick'];
  onClickSaveBtn: React.DOMAttributes<HTMLButtonElement>['onClick'];
  onClickCancelBtn: React.DOMAttributes<HTMLButtonElement>['onClick'];
}> = ({ isEdit, onClickEditBtn, onClickSaveBtn, onClickCancelBtn }) => {
  if (isEdit) {
    return (
      <>
        <Button onClick={onClickSaveBtn} variant="contained" color="primary">
          保存
        </Button>
        <Button onClick={onClickCancelBtn} variant="contained">
          キャンセル
        </Button>
      </>
    );
  }
  return (
    <Button onClick={onClickEditBtn} variant="contained" color="primary">
      編集
    </Button>
  );
};
