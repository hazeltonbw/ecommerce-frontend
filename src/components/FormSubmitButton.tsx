import React from "react";
import LoadingSpinner from "./LoadingSpinner";

type Props = { buttonText: string; status: string };
// Submit button is only being used for two forms,
// login and registration.
const FormSubmitButton = (props: Props) => {
  const ariaLabel =
    props.buttonText === "Register"
      ? "Submit registration information"
      : "Submit login information";
  const isLoading = props.status === "pending";

  return (
    <button
      type="submit"
      className="bg-sky-900 text-white"
      aria-label={ariaLabel}
    >
      <div className="flex justify-center gap-4">
        {isLoading ? <LoadingSpinner /> : props.buttonText}
      </div>
    </button>
  );
};

export default FormSubmitButton;
