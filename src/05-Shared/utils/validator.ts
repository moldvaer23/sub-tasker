import { Dispatch } from "react";

type TProps = {
  data: string;
  setError: Dispatch<React.SetStateAction<boolean>>;
};

const validator = ({ data, setError }: TProps): void => {
  // Проверка на пустое поле
  if (data.length === 0) {
    setError(true);
  } else {
    setError(false);
  }
};

export default validator;
