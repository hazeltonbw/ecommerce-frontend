import React from "react";
import { ErrorMessage } from "formik";
import PasswordField from "./PasswordField";
const PasswordInput = () => {
  return (
    <div>
      <label htmlFor="password">Password</label>
      <PasswordField
        type="password"
        name="password"
        id="password"
        autoComplete="current-password"
      />
      <ErrorMessage component="div" className="text-sm text-red-700" name="password" />
    </div>
  );
};

export default PasswordInput;
