import type { ChangeEvent, FC, ReactElement } from "react";

import { EDefaultClassNames } from "../classNames";

import "./_style.scss";

interface IProps {
  className?: string;
  name: string;
  id?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: FC<IProps> = ({ className, value, onChange, name, id = name }): ReactElement => {
  return (
    <textarea
      className={
        className ? `${className} ${EDefaultClassNames.textArea}` : EDefaultClassNames.textArea
      }
      name={name}
      id={id}
      onChange={onChange ? (e: ChangeEvent<HTMLTextAreaElement>): void => onChange(e) : undefined}
      {...(value !== undefined && { value })}
      spellCheck={true}
      rows={5}
    />
  );
};
export default TextArea;
