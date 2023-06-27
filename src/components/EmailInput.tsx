import React, { useState } from "react";
import { ErrorMessage, Field, useField } from "formik";
const EmailInput = () => {
  const [field, meta] = useField("email");
  const [didFocus, setDidFocus] = useState(false);
  const handleFocus = () => setDidFocus(true);
  const showFeedback = (didFocus && field.value?.trim().length > 2) || meta.touched;
  return (
    <div className={`${showFeedback ? (meta.error ? "invalid" : "valid") : ""}`}>
      <label htmlFor="email">Email address</label>
      <Field
        id="email"
        name="email"
        autoComplete="email"
        type="email"
        className={`focus:border-6 w-full pr-10 invalid:border-red-500 focus:border-sky-700
              focus:outline-none 
              focus:ring-2 focus:ring-sky-500 focus:invalid:border-red-500 focus:invalid:ring-red-500`}
        onFocus={handleFocus}
      />
      <ErrorMessage
        component="div"
        className="text-sm text-red-700"
        name="email"
        aria-label="Error message for email input"
      />
    </div>
  );
};

export default EmailInput;
