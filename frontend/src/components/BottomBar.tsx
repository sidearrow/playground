import React from "react";

type ButtonProps = {
  isActive: boolean;
  onClick: React.DOMAttributes<HTMLButtonElement>["onClick"];
};

export const Button: React.FC<ButtonProps> = ({
  isActive,
  onClick,
  children,
}) => {
  const className = `p-2 text-center bg-gray-200 ${
    isActive ? "border-b-4 border-gray-900" : ""
  }`;
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

type Props = {
  isMenuShow: boolean;
  setIsMenuShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export const BottomBar: React.FC<Props> = ({ isMenuShow, setIsMenuShow }) => {
  return (
    <div className="grid grid-cols-2">
      <Button
        isActive={isMenuShow}
        onClick={() => {
          setIsMenuShow(true);
        }}
      >
        サイト一覧
      </Button>
      <Button
        isActive={!isMenuShow}
        onClick={() => {
          setIsMenuShow(false);
        }}
      >
        記事一覧
      </Button>
    </div>
  );
};
