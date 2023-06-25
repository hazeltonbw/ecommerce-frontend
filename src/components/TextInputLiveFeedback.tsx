import { useField, FieldHookConfig } from "formik";
import React, { useState } from "react";
import { FcCheckmark } from "react-icons/fc";
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
                <div
                    className={`${
                        /* When an error occurs, div should flow naturally to allow text to pass down to the next line
                           When there's no error, the green checkmark should be at the end of the container.*/
                        meta.error ? "" : "flex place-content-between items-center "
                        }`}
                >
                    <label htmlFor={props.id}>{label}</label>{" "}
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
            </div>
            {showFeedback ? (
                <div id={`${props.id}-feedback`} aria-live="polite" className="feedback text-sm">
                    {meta.error ? meta.error : <FcCheckmark size={16} />}
                </div>
            ) : null}
            <div className="text-xs" id={`${props.id}-help`} tabIndex={-1}>
                {helpText}
            </div>
        </div>
    );
};
