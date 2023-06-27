import { Field, FieldHookConfig, useField } from "formik";
import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const PasswordField = (props: FieldHookConfig<string>) => {
  const [showPassword, setShowPassword] = useState(false);
  const [field, meta] = useField(props);
  const [didFocus, setDidFocus] = useState(false);
  const handleFocus = () => setDidFocus(true);
  const showFeedback = (didFocus && field.value?.trim().length > 2) || meta.touched;
  return (
    <div className={`relative ${showFeedback ? (meta.error ? "invalid" : "valid") : ""}`}>
      <Field
        {...props}
        {...field}
        type={showPassword ? "text" : "password"}
        className={`w-full pr-10 invalid:text-red-500 focus:outline-none focus:ring-2 focus:ring-sky-500`}
        onFocus={handleFocus}
      />
      <button
        id="toggle-password"
        type="button"
        aria-label="Show password as plain text. Warning: this will display your password on the screen."
        className="absolute top-2 right-2 cursor-pointer border-none bg-none p-0 shadow-none"
        onClick={() => {
          setShowPassword(!showPassword);
        }}
      >
        {showPassword ? (
          <AiFillEyeInvisible title="Hide password" size={24} />
        ) : (
          <AiFillEye title="Show password" size={24} />
        )}
      </button>
    </div>
  );
};

export default PasswordField;
