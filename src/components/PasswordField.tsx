import { Field, FieldHookConfig, useField } from "formik";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const PasswordField = (props: FieldHookConfig<string>) => {
  const [showPassword, setShowPassword] = useState(false);
  const [field, meta] = useField(props);
  const [didFocus, setDidFocus] = useState(false);
  const handleFocus = () => setDidFocus(true);
  const showFeedback =
    (didFocus && field.value?.trim().length > 2) || meta.touched;
  return (
    <div
      className={`relative ${
        showFeedback ? (meta.error ? "invalid" : "valid") : ""
      }`}
    >
      <Field
        {...props}
        {...field}
        type={showPassword ? "text" : "password"}
        className={`focus:outline-none focus:ring-2 focus:ring-sky-500 invalid:text-red-500 pr-10 w-full`}
        onFocus={handleFocus}
      />
      <button
        id="toggle-password"
        type="button"
        aria-label="Show password as plain text. Warning: this will display your password on the screen."
        className="border-none bg-none cursor-pointer p-0 absolute top-2 right-2 shadow-none"
        onClick={() => {
          setShowPassword(!showPassword);
        }}
      >
        {showPassword ? (
          <AiFillEyeInvisible size={24} />
        ) : (
          <AiFillEye size={24} />
        )}
      </button>
    </div>
  );
};

export default PasswordField;
