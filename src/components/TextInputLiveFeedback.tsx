import { useField, FieldHookConfig } from "formik";
import React, { useState } from "react";
import { FcCheckmark } from "react-icons/fc";
import { CgClose } from "react-icons/cg"
import PasswordField from "./PasswordField";

// https://formik.org/docs/examples/instant-feedback
type Props = {
  label: string;
  id: string;
  name: string;
  helpText: string;
  type: string;
  autoComplete?: string;
};
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
  const showFeedback = (didFocus && field.value?.trim().length > 2) || meta.touched;

  return (
    <div
      className={`form-control relative ${showFeedback ? (meta.error ? "invalid" : "valid") : ""}`}
    >
      <div className="flex flex-col">
        <div className="flex place-content-between items-center" >
          <label htmlFor={props.id}>{label}</label>{" "}
          {showFeedback ? (
            <div id={`${props.id}-feedback`} aria-live="polite" className="feedback ">
              {meta.error ? <CgClose size={16} /> : <FcCheckmark size={16} />}
            </div>
          ) : null}
        </div>
      </div>
      <div className="relative">
        {props.type === "password" ? (
          <PasswordField {...props} {...field} />
        ) : (
          <input
            // TODO: Fix unknown TS error... change to {...props} to error out again
            {...(props as Props)}
            {...field}
            className="w-full"
            aria-describedby={`${props.id}-feedback ${props.id}-help`}
            onFocus={handleFocus}
          />
        )}
        {
          showFeedback && (
            <div id={`${props.id}-feedback`} aria-live="polite" className="feedback text-sm">
              {meta.error ? meta.error : null}
            </div>
          )
        }
      </div>
      <div className="text-xs" id={`${props.id}-help`} tabIndex={-1}>
        {helpText}
      </div>
    </div>
  );
};
