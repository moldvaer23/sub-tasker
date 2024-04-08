import { ChangeEvent, FC } from "react";
import { EDefaultClassNames } from "../classNames";

import "./_style.scss";

interface IProps {
  autoFocus?: boolean;
  className?: string;
  id?: string;
  name: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  refCallBack: () => void;
  value?: string;
}

const TextArea: FC<IProps> = ({
  autoFocus,
  className,
  name,
  id = name,
  onChange,
  refCallBack,
  value,
}) => {
  const classNameSetting = className
    ? `${className} ${EDefaultClassNames.textArea}`
    : EDefaultClassNames.textArea;

  const onFocus = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    e.target.value = "";
    e.target.value = val;
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code === "Enter" && e.shiftKey === false) {
      e.preventDefault();
      refCallBack();
    }
  };

  return (
    <textarea
      className={classNameSetting}
      id={id}
      name={name}
      onChange={onChange ? (e: ChangeEvent<HTMLTextAreaElement>): void => onChange(e) : undefined}
      onFocus={(e) => onFocus(e)}
      onKeyDown={onKeyDown}
      rows={5}
      spellCheck={true}
      {...(autoFocus !== undefined && { autoFocus })}
      {...(value !== undefined && { value })}
    />
  );
};
export default TextArea;
