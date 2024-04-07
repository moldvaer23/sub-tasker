import { ChangeEvent, FC } from "react";
import { EDefaultClassNames } from "../classNames";

import "./_style.scss";

interface IProps {
  className?: string;
  id?: string;
  name: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
  autoFocus?: boolean;
}

const TextArea: FC<IProps> = ({ className, value, onChange, name, id = name, autoFocus }) => {
  const classNameSetting = className
    ? `${className} ${EDefaultClassNames.textArea}`
    : EDefaultClassNames.textArea;

  const onFocus = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    e.target.value = "";
    e.target.value = val;
  };

  return (
    <textarea
      className={classNameSetting}
      id={id}
      name={name}
      onChange={onChange ? (e: ChangeEvent<HTMLTextAreaElement>): void => onChange(e) : undefined}
      rows={5}
      spellCheck={true}
      {...(autoFocus !== undefined && { autoFocus })}
      {...(value !== undefined && { value })}
      onFocus={(e) => onFocus(e)}
    />
  );
};
export default TextArea;
