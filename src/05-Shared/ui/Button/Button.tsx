import { FC, MouseEvent, ReactElement } from "react";

import { EDefaultClassNames } from "../classNames";

export enum ETypeButton {
  button = "button",
  submit = "submit",
  reset = "reset",
}

interface IProps {
  text: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
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
  const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      className={
        className ? `${className} ${EDefaultClassNames.button}` : EDefaultClassNames.button
      }
      type={type}
      onClick={handleClick}
      disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
