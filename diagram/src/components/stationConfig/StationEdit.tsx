import React, { useEffect, useState } from "react";
import { Station } from "../../models";

const Title: React.FC = ({ children }) => <div>{children}</div>;
const FormBox: React.FC = ({ children }) => (
  <div className="mt-4">{children}</div>
);
const CheckboxGroup: React.FC<{
  text: string;
  checked: boolean;
  onChange: React.InputHTMLAttributes<HTMLInputElement>["onChange"];
  ml?: boolean;
}> = ({ text, checked, onChange, ml }) => {
  return (
    <label className={"inline-flex items-center" + (ml ? " ml-2" : "")}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="ml-1">{text}</span>
    </label>
  );
};

export const StationEdit: React.FC<{ station: Station }> = ({ station }) => {
  const [formData, setFormData] = useState(station);
  useEffect(() => {
    setFormData(station);
  }, [station]);
  const onChangeStationName: React.InputHTMLAttributes<HTMLInputElement>["onChange"] = (
    e
  ) => {
    setFormData({ ...formData, ...{ stationName: e.target.value } });
  };
  const onChangeStationTimeDisplay = (
    upDown: "up" | "down",
    arrDep: "arr" | "dep"
  ): React.InputHTMLAttributes<HTMLInputElement>["onChange"] => (e) => {
    const newFormData = { ...formData };
    newFormData.stationTimeDisplay[upDown][arrDep] = e.target.checked;
    setFormData(newFormData);
  };
  const onClickSave = () => {
    console.log(formData);
  };

  return (
    <>
      <FormBox>
        <Title>駅名</Title>
        <input
          type="text"
          value={formData.stationName}
          onChange={onChangeStationName}
        />
      </FormBox>
      <FormBox>
        <Title>上り</Title>
        <CheckboxGroup
          text="着時刻"
          checked={formData.stationTimeDisplay.up.arr}
          onChange={onChangeStationTimeDisplay("up", "arr")}
        />
        <CheckboxGroup
          ml={true}
          text="発時刻"
          checked={formData.stationTimeDisplay.up.dep}
          onChange={onChangeStationTimeDisplay("up", "dep")}
        />
      </FormBox>
      <FormBox>
        <Title>下り</Title>
        <CheckboxGroup
          text="着時刻"
          checked={formData.stationTimeDisplay.down.arr}
          onChange={onChangeStationTimeDisplay("down", "arr")}
        />
        <CheckboxGroup
          ml={true}
          text="発時刻"
          checked={formData.stationTimeDisplay.down.dep}
          onChange={onChangeStationTimeDisplay("down", "dep")}
        />
      </FormBox>
      <FormBox>
        <button className="px-4 py-1 border rounded" onClick={onClickSave}>
          保存
        </button>
      </FormBox>
    </>
  );
};
