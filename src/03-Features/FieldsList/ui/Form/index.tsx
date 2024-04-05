import { FC, useEffect, useState } from "react";

import validator from "05-Shared/utils/validator";
import { ETypeInput, Input } from "05-Shared/ui/Input";
import { Button, ETypeButton, ETypeButtonStyle, ETypeSizeButtom } from "05-Shared/ui/Button";

import "./_style.scss";

interface IProps {
  buttonText: string;
  label: string;
  onSubmit: (value: string) => void;
}

const Form: FC<IProps> = ({ onSubmit, buttonText, label }) => {
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    validator({ data: value, setError: setError, setErrorMessage: setErrorMessage });
  }, [value]);

  return (
    <form className="form-list">
      <label className="form-list__label" htmlFor="list-name">
        <span>{label}</span>
        <Input
          className="form-list__input"
          name="list-name"
          onChange={(e) => setValue(e.target.value)}
          type={ETypeInput.text}
        />
        <span className="error-alert">{errorMessage}</span>
      </label>

      <Button
        className="form-list__submit"
        text={buttonText}
        type={ETypeButton.submit}
        typeSize={ETypeSizeButtom.medium}
        typeStyle={ETypeButtonStyle.accent}
        onClick={(e) => {
          e.preventDefault();
          onSubmit(value);
        }}
        disabled={error}
      />
    </form>
  );
};

export default Form;
