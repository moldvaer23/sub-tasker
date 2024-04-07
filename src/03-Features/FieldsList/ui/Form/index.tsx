import { FC, useEffect, useState } from "react";

import validator from "05-Shared/utils/validator";
import { ETypeInput, Input } from "05-Shared/ui/Input";
import { Button, ETypeButton, ETypeButtonStyle, ETypeButtonSize } from "05-Shared/ui/Button";

import "./_style.scss";
import { ErrorAlert } from "05-Shared/ui/ErrorAlert";

interface IProps {
  buttonText: string;
  label: string;
  placeHolder: string;
  onSubmit: (value: string) => void;
}

const Form: FC<IProps> = ({ onSubmit, placeHolder, buttonText, label }) => {
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    validator({ data: value, setError: setError, setErrorMessage: setErrorMessage });
  }, [value]);

  return (
    <form className="form-fields" id="field" name="field" onSubmit={() => onSubmit(value)}>
      <label className="form-fields__label" htmlFor="field-name">
        <span className="form-fields__label-span">{label}</span>
        <Input
          className="form-fields__input"
          name="field-name"
          placeholder={placeHolder}
          onChange={(e) => setValue(e.target.value)}
          type={ETypeInput.text}
        />
        {errorMessage && <ErrorAlert errorMessage={errorMessage} />}
      </label>

      <Button
        className="form-fields__button-submit"
        text={buttonText}
        type={ETypeButton.submit}
        typeSize={ETypeButtonSize.medium}
        typeStyle={ETypeButtonStyle.accent}
        animate={false}
        disabled={error}
      />
    </form>
  );
};

export default Form;
