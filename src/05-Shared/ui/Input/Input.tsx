import { ChangeEvent, FC, ReactElement } from "react";

import { EDefaultClassNames } from "../classNames";

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
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
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
  return (
    <input
      className={className ? `${className} ${EDefaultClassNames.input}` : EDefaultClassNames.input}
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
