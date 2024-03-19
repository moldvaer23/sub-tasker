import type { FC, MouseEvent, ReactElement } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { EDefaultClassNames } from "../classNames";

import "./_style.scss";

export enum ETypeButton {
  button = "button",
  submit = "submit",
  reset = "reset",
}

export enum ETypeButtonStyle {
  primary = "button__primary",
  accent = "button__accent",
  icon = "button__icon",
}

export enum ETypeSizeButtom {
  small = "button__small",
  medium = "button__medium",
  large = "button__large",
}

export type TImageSrcProps = {
  imageSrc: string;
  alt: string;
};

interface IProps {
  text?: string;
  image?: TImageSrcProps;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  type?: ETypeButton;
  typeSize?: ETypeSizeButtom;
  typeStyle: ETypeButtonStyle;
  className?: string;
  disabled?: boolean;
  opacity?: number;
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
  opacity = 1,
}): ReactElement => {
  return (
    <AnimatePresence>
      <motion.button
        initial={{ scale: 1 }}
        whileTap={{ scale: typeStyle !== ETypeButtonStyle.icon ? 2 : 3 }}
        exit={{ scale: 1 }}
        style={{ opacity: opacity }}
        transition={{ type: "spring", stiffness: 500, damping: 5 }}
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
      </motion.button>
    </AnimatePresence>
  );
};

export default Button;
