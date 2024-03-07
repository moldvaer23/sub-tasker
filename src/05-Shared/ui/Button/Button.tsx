import { FC, MouseEvent } from "react";

export enum ETypeButton {
  button = "button",
  submit = "submit",
  reset = "reset",
}

interface IProps {
  onClick?: Function;
  text: string;
  type?: ETypeButton;
  className?: string;
  disabled?: boolean;
}

const Button: FC<IProps> = ({
  onClick,
  text,
  type = ETypeButton.button,
  className,
  disabled = false,
}): JSX.Element => {
  const defaultClassName: string = "button";

  const usedClassName: string = className ? `${className} ${defaultClassName}` : defaultClassName;

  const handleOnClick = (e: MouseEvent): void => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      className={usedClassName}
      type={type}
      onClick={(e: MouseEvent): void => handleOnClick(e)}
      disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
