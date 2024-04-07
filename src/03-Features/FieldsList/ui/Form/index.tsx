import { FC, useEffect, useState } from "react";

import validator from "05-Shared/utils/validator";
import { ErrorAlert } from "05-Shared/ui/ErrorAlert";
import { ETypeInput, Input } from "05-Shared/ui/Input";
import { Button, ETypeButton, ETypeButtonSize, ETypeButtonStyle } from "05-Shared/ui/Button";

import "./_style.scss";

interface IProps {
  buttonText: string;
  label: string;
  onSubmit: (value: string) => void;
  placeHolder: string;
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
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeHolder}
          type={ETypeInput.text}
        />
        {errorMessage.length > 0 && <ErrorAlert errorMessage={errorMessage} />}
      </label>

      <Button
        animate={false}
        className="form-fields__button-submit"
        disabled={error}
        text={buttonText}
        type={ETypeButton.submit}
        typeSize={ETypeButtonSize.medium}
        typeStyle={ETypeButtonStyle.accent}
      />
    </form>
  );
};

export default Form;
