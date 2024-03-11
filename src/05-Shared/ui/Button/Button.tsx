import type { FC, MouseEvent, ReactElement } from "react";

import { EDefaultClassNames } from "../classNames";

import "./_style.scss";

export enum ETypeButton {
  button = "button",
  submit = "submit",
  reset = "reset",
}

export enum ETypeButtonStyle {
  primary = "button__primary",
  icon = "button__icon",
}

export enum ETypeSizeButtom {
  small = "small",
  medium = "medium",
  large = "large",
}

type TImageSrcProps = {
  imageSrc: string;
  alt: string;
};

interface IProps {
  text?: string;
  image?: TImageSrcProps;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  type?: ETypeButton;
  typeSize: ETypeSizeButtom;
  typeStyle: ETypeButtonStyle;
  className?: string;
  disabled?: boolean;
}

const Button: FC<IProps> = ({
  onClick,
  text,
  image,
  type = ETypeButton.button,
  typeStyle,
  className,
  typeSize,
  disabled = false,
}): ReactElement => {
  return (
    <button
      className={
        className
          ? `${className} ${EDefaultClassNames.button} ${typeSize} ${typeStyle}`
          : `${EDefaultClassNames.button} ${typeSize} ${typeStyle}`
      }
      type={type}
      onClick={onClick ? onClick : undefined}
      disabled={disabled}>
      {image ? (
        <img className={EDefaultClassNames.buttonImage} src={image.imageSrc} alt={image.alt} />
      ) : (
        text
      )}
    </button>
  );
};

export default Button;
