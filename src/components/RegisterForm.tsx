import { Formik, Form } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);
import { TextInputLiveFeedback } from "./TextInputLiveFeedback";
import FormSubmitButton from "./FormSubmitButton";
import { useAppDispatch, useAppSelector } from "../hooks";
import { login, register } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import FormErrorText from "./FormErrorText";
import { UserObject } from "../routes/User";

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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { registerError, message, status } = useAppSelector((state) => state.auth);
  return (
    <div className="w-[22.5rem] rounded-lg bg-gray-200 p-8 text-black ">
      <h1 className="border border-b-gray-300 text-2xl">Register</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
          lname: "",
          fname: "",
          isadmin: false,
        }}
        validationSchema={RegisterSchema}
        onSubmit={async (values: UserObject) => {
          try {
            const response = await dispatch(register(values));
            if (response.meta?.requestStatus === "fulfilled") {
              // Login route doesn't care about these properties
              // ... so delete them
              delete values.fname;
              delete values.lname;
              delete values.isadmin;
              await dispatch(login(values));
              navigate("/");
            }
            console.log(response);
          } catch (err) {
            console.error(err);
          }
        }}
      >
        <Form className="flex flex-col gap-2">
          <TextInputLiveFeedback
            label="Email"
            id="email"
            name="email"
            helpText=""
            type="email"
            autoComplete="username"
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
          <FormErrorText error={registerError} message={message} />
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterForm;
