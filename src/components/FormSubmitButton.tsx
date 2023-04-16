type Props = { buttonText: string };
// Submit button is only being used for two forms,
// login and registration.
const FormSubmitButton = (props: Props) => {
  const ariaLabel =
    props.buttonText === "Register"
      ? "Submit registration information"
      : "Submit login information";
  return (
    <button
      type="submit"
      className="text-white bg-sky-700"
      aria-label={ariaLabel}
    >
      {props.buttonText}
    </button>
  );
};

export default FormSubmitButton;
