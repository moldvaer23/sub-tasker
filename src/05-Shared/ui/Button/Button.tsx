import { FC, MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EDefaultClassNames } from "../classNames";

import "./_style.scss";

export enum ETypeButton {
  button = "button",
  reset = "reset",
  submit = "submit",
}

export enum ETypeButtonStyle {
  accent = "button__accent",
  icon = "button__icon",
  primary = "button__primary",
}

export enum ETypeButtonSize {
  default = "button__default",
  large = "button__large",
  medium = "button__medium",
  small = "button__small",
}

export type TImageSrcProps = {
  alt: string;
  imageSrc: string;
};

interface IProps {
  animate?: boolean;
  className?: string;
  disabled?: boolean;
  image?: TImageSrcProps;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave?: (e: MouseEvent<HTMLButtonElement>) => void;
  opacity?: number;
  text?: string;
  type?: ETypeButton;
  typeSize?: ETypeButtonSize;
  typeStyle: ETypeButtonStyle;
}

const Button: FC<IProps> = ({
  animate = true,
  className,
  disabled = false,
  image,
  onClick,
  onMouseLeave,
  opacity = 1,
  text,
  type = ETypeButton.button,
  typeSize = ETypeButtonSize.default,
  typeStyle,
}) => {
  const content = image ? (
    <img className={EDefaultClassNames.buttonImage} src={image.imageSrc} alt={image.alt} />
  ) : (
    text
  );

  const classNameSeting = className
    ? `${className} ${EDefaultClassNames.button} ${typeSize} ${typeStyle}`
    : `${EDefaultClassNames.button} ${typeSize} ${typeStyle}`;

  return animate ? (
    <AnimatePresence>
      <motion.button
        className={classNameSeting}
        disabled={disabled}
        exit={{ scale: 1 }}
        initial={{ scale: 1 }}
        onClick={onClick ? onClick : undefined}
        onMouseLeave={onMouseLeave}
        style={{ opacity: opacity }}
        transition={{ type: "spring", stiffness: 500, damping: 5 }}
        type={type}
        whileTap={{ scale: typeStyle !== ETypeButtonStyle.icon ? 2 : 3 }}>
        {content}
      </motion.button>
    </AnimatePresence>
  ) : (
    <button
      className={classNameSeting}
      disabled={disabled}
      onClick={onClick ? onClick : undefined}
      onMouseLeave={onMouseLeave}
      type={type}>
      {content}
    </button>
  );
};

export default Button;
