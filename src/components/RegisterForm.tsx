import { Formik, Form } from "formik";
import { useActionData, useSubmit } from "react-router-dom";
import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);
import { TextInputLiveFeedback } from "./TextInputLiveFeedback";
import FormSubmitButton from "./FormSubmitButton";
import { useAppDispatch, useAppSelector } from "../hooks";
import { register } from "../features/auth/authSlice";

const RegisterSchema = Yup.object().shape({
  fname: Yup.string()
    .min(2, "First name is too short.")
    .max(20, "First name is too long.")
    .required("First name is required."),
  lname: Yup.string()
    .min(2, "Last name is too short.")
    .max(20, "Last name is too long.")
    .required("Last name is required."),
  email: Yup.string().email("Invalid email").required("Email is required."),
  password: Yup.string().password().required("Password is required."),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password."),
  isadmin: Yup.boolean(),
});

const RegisterForm = () => {
  const submit = useSubmit();
  const dispatch = useAppDispatch();
  const actionData = useActionData();
  //const { error, message } = actionData || {};
  const { error, message, status } = useAppSelector((state) => state.auth);
  return (
    <div className="bg-gray-200 text-black p-8 rounded-lg w-[22.5rem] ">
      <h1 className="text-2xl border border-b-gray-300">Register</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
          lname: "",
          fname: "",
          isadmin: false,
        }}
        validationSchema={RegisterSchema}
        onSubmit={async (values) => {
          dispatch(register(values));
        }}
      >
        <Form className="flex flex-col gap-2 ">
          <TextInputLiveFeedback
            label="Email"
            id="email"
            name="email"
            helpText=""
            type="email"
          />
          <TextInputLiveFeedback
            label="Password"
            id="password"
            name="password"
            helpText=""
            type="password"
            autoComplete="new-password"
          />
          <TextInputLiveFeedback
            label="Confirm password"
            id="passwordConfirm"
            name="passwordConfirm"
            helpText=""
            type="password"
            autoComplete="new-password"
          />
          <TextInputLiveFeedback
            label="First name"
            id="fname"
            name="fname"
            helpText=""
            type="text"
          />
          <TextInputLiveFeedback
            label="Last name"
            id="lname"
            name="lname"
            helpText=""
            type="text"
          />
          <FormSubmitButton buttonText="Register" status={status} />
          {message ? message : null}
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterForm;
