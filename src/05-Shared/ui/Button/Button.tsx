import { FC, MouseEvent, ReactElement } from "react";
import { EDefaultClassNames } from "../classNames";

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
  const usedClassName: string = className
    ? `${className} ${EDefaultClassNames.button}`
    : EDefaultClassNames.button;

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
