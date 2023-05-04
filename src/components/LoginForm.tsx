import { Formik, Form } from "formik";
import * as Yup from "yup";
import PasswordInput from "./PasswordInput";
import EmailInput from "./EmailInput";
import FormSubmitButton from "./FormSubmitButton";
import { login } from "../features/auth/authSlice";
import { useAppSelector, useAppDispatch } from "../hooks";

// export const loginAction = async ({ request }: ActionFunctionArgs) => {
// console.log("attempting to login.... action");
// const baseURL = "http://localhost:4000";
// const parameters = "/auth/login";
// const url = baseURL + parameters;

// try {
//   const formData = await request.formData();

//   const values = Object.fromEntries(formData);
//   const dispatch = useAppDispatch();
//   dispatch(login(values));
// const { data } = await axios.post(url, values, {
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json;charset=UTF-8",
//   },
//   withCredentials: true,
// });

//console.log(user.data, "response from login action");
// After successful login, redirect to homepage.
//     return {};
//     //return redirect(`/users/${data.user_id}`);
//   } catch (err) {
//     console.error(err);
//     return {
//       error: err,
//       message: err.response?.data?.message,
//     };
//   }
// };

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Email address is required."),
  password: Yup.string().required("Password is required."),
});

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const { error, status, message } = useAppSelector((state) => state.auth);

  return (
    <div className="bg-gray-200 text-black p-8 rounded-lg flex flex-col w-[22.5rem]">
      <h1 className="text-2xl border border-b-gray-300">
        Login to your account
      </h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          console.log("Attempting to login...");
          try {
            dispatch(login(values));
          } catch (err) {
            console.error("error!     :", err);
          }
          setSubmitting(false);
        }}
      >
        <Form className="flex flex-col gap-2 ">
          <EmailInput />
          <PasswordInput />
          {error ? <div className="text-red-700">{message}</div> : null}
          <FormSubmitButton buttonText="Login" status={status} />
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
