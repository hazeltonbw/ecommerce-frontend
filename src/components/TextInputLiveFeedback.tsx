import { useField, FieldHookConfig } from "formik";
import { useState } from "react";
import { Checkmark } from "react-checkmark";
import PasswordField from "./PasswordField";

// https://formik.org/docs/examples/instant-feedback
export const TextInputLiveFeedback = ({
  label,
  helpText,
  ...props
}: FieldHookConfig<string> & { label: string; helpText: string }) => {
  const [field, meta] = useField(props);

  // Show inline feedback if EITHER
  // - the input is focused AND value is longer than 2 characters
  // - or, the has been visited (touched === true)
  const [didFocus, setDidFocus] = useState(false);
  const handleFocus = () => setDidFocus(true);
  const showFeedback =
    (didFocus && field.value?.trim().length > 2) || meta.touched;

  return (
    <div
      className={`form-control relative ${
        showFeedback ? (meta.error ? "invalid" : "valid") : ""
      }`}
    >
      <div className="flex flex-col">
        <div
          className={`${
            /* When an error occurs, div should flow naturally to allow text to pass down to the next line
               When there's no error, the green checkmark should be at the end of the container.*/
            meta.error ? "" : "flex items-center place-content-between "
          }`}
        >
          <label htmlFor={props.id}>{label}</label>{" "}
          {showFeedback ? (
            <div
              id={`${props.id}-feedback`}
              aria-live="polite"
              className="feedback text-sm"
            >
              {meta.error ? meta.error : <Checkmark size="small" />}
            </div>
          ) : null}
        </div>
      </div>
      <div className="relative">
        {props.type === "password" ? (
          <PasswordField {...props} {...field} />
        ) : (
          <input
            {...props}
            {...field}
            className={`w-full ${props.type === "password" ? "pr-10" : ""}`}
            aria-describedby={`${props.id}-feedback ${props.id}-help`}
            onFocus={handleFocus}
            // autoComplete="new-password"
          />
        )}
        {/* 
        {props.type === "password" ? (
          <button
            id="toggle-password"
            type="button"
            aria-label="Show password as plain text. Warning: this will display your password on the screen."
            className="border-none bg-none cursor-pointer p-0 absolute top-2.5 right-2 shadow-none"
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
        ) : null} */}
      </div>
      <div className="text-xs" id={`${props.id}-help`} tabIndex={-1}>
        {helpText}
      </div>
    </div>
  );
};
