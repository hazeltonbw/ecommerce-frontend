import { ErrorMessage } from "formik";
import PasswordField from "./PasswordField";
const PasswordInput = () => {
  return (
    <div>
      <label htmlFor="password">Password</label>
      <ErrorMessage
        component="div"
        className="text-red-700 text-sm"
        name="password"
      />
      <PasswordField
        type="password"
        name="password"
        id="password"
        autoComplete="current-password"
      />
    </div>
  );
};

export default PasswordInput;
