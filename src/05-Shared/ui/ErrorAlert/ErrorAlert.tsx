import type { FC, ReactElement } from "react";

import { EDefaultClassNames } from "../classNames";

import "./_style.scss";

interface IProps {
  errorMessage: string;
}

const ErrorAlert: FC<IProps> = ({ errorMessage }): ReactElement => {
  return <span className={EDefaultClassNames.errorAlert}>{errorMessage}</span>;
};

export default ErrorAlert;
