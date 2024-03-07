type TProps = {
  data: string;
  setError: Function;
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
