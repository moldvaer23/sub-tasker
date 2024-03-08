import { FC, MouseEvent, ReactElement } from "react";

// Типы Button as для поле type
export enum ETypeButton {
  button = "button",
  submit = "submit",
  reset = "reset",
}

interface IProps {
  text: string;
  onClick?: Function;
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
}): ReactElement => {
  const defaultClassName: string = "button";
  const usedClassName: string = className ? `${className} ${defaultClassName}` : defaultClassName;

  return (
    <button
      className={usedClassName}
      type={type}
      onClick={onClick ? (e: MouseEvent): void => onClick(e) : undefined}
      disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
