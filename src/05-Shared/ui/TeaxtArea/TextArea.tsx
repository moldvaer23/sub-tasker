import { ChangeEvent, FC } from "react";
import { EDefaultClassNames } from "../classNames";

import "./_style.scss";

interface IProps {
  className?: string;
  id?: string;
  name: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
}

const TextArea: FC<IProps> = ({ className, value, onChange, name, id = name }) => {
  const classNameSetting = className
    ? `${className} ${EDefaultClassNames.textArea}`
    : EDefaultClassNames.textArea;

  return (
    <textarea
      className={classNameSetting}
      id={id}
      name={name}
      onChange={onChange ? (e: ChangeEvent<HTMLTextAreaElement>): void => onChange(e) : undefined}
      rows={5}
      spellCheck={true}
      {...(value !== undefined && { value })}
    />
  );
};
export default TextArea;
