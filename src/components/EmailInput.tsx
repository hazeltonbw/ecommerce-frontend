import { ErrorMessage, Field, useField } from "formik";
import { useState } from "react";
const EmailInput = () => {
  const [field, meta] = useField("email");
  const [didFocus, setDidFocus] = useState(false);
  const handleFocus = () => setDidFocus(true);
  const showFeedback =
    (didFocus && field.value?.trim().length > 2) || meta.touched;
  return (
    <div
      className={`${showFeedback ? (meta.error ? "invalid" : "valid") : ""}`}
    >
      <label htmlFor="email">Email address</label>
      <ErrorMessage
        component="div"
        className="text-red-700 text-sm"
        name="email"
        aria-label="Error message for email input"
      />
      <Field
        id="email"
        name="email"
        autoComplete="email"
        type="email"
        className={`focus:outline-none focus:border-sky-700 focus:ring-2 focus:ring-sky-500 focus:border-6
              invalid:border-red-500 
              focus:invalid:border-red-500 focus:invalid:ring-red-500 pr-10 w-full`}
        onFocus={handleFocus}
      />
    </div>
  );
};

export default EmailInput;
