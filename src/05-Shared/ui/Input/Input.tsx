import { ChangeEvent, FC, ReactElement } from "react";

export enum ETypeInput {
  text = "text",
}

interface IProps {
  type: ETypeInput;
  name: string;
  id: string;
  className?: string;
  placeholder?: string;
  onChange?: Function;
  value?: string;
  required?: boolean;
}

const Input: FC<IProps> = ({
  type,
  name,
  id,
  className,
  placeholder = "",
  onChange,
  value,
  required = false,
}): ReactElement => {
  const defaultClassName: string = "input";
  const usedClassName: string = className ? `${className} ${defaultClassName}` : defaultClassName;

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <input
      className={usedClassName}
      name={name}
      id={id}
      type={type}
      placeholder={placeholder}
      onChange={(e: ChangeEvent<HTMLInputElement>): void => handleOnChange(e)}
      required={required}
      {...(value !== undefined && { value })}
    />
  );
};

export default Input;
