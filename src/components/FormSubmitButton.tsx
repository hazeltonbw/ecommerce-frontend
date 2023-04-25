import { BeatLoader } from "react-spinners";
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
      className="text-white bg-sky-700"
      aria-label={ariaLabel}
    >
      {isLoading ? <LoadingSpinner /> : props.buttonText}
    </button>
  );
};

export default FormSubmitButton;
