import React from "react";
import { Link } from "react-router-dom";

type Props = {
  switchToLink: string;
  helpText: string;
  linkText: string;
};

const AuthSwitchHelper = (props: Props) => {
  return (
    <p className="text-sm text-gray-600 mt-2 text-center">
      {props.helpText}
      <Link
        to={props.switchToLink}
        className="text-sky-700 underline hover:text-sky-500"
      >
        {props.linkText}
      </Link>
    </p>
  );
};
export default AuthSwitchHelper;
