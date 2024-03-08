import { ChangeEvent, FC, ReactElement } from "react";

// Типы Input as для поля type
export enum ETypeInput {
  text = "text",
}

interface IProps {
  type: ETypeInput;
  name: string;
  id?: string;
  className?: string;
  placeholder?: string;
  onChange?: Function;
  value?: string;
  required?: boolean;
}

// Для работы компонента нужно передать хотя бы type & name, id в случае если его не передали автоматически будет равно name
const Input: FC<IProps> = ({
  type,
  name,
  id = name,
  className,
  placeholder,
  onChange,
  value,
  required = false,
}): ReactElement => {
  const defaultClassName: string = "input";
  const usedClassName: string = className ? `${className} ${defaultClassName}` : defaultClassName;

  return (
    <input
      className={usedClassName}
      name={name}
      id={id}
      type={type}
      {...(placeholder !== undefined && { placeholder })}
      required={required}
      onChange={onChange ? (e: ChangeEvent<HTMLInputElement>): void => onChange(e) : undefined}
      {...(value !== undefined && { value })}
    />
  );
};

export default Input;
