import axios from "axios";
axios.defaults.withCredentials = true;
import { Formik, Form } from "formik";
import {
  ActionFunctionArgs,
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
  useSubmit,
} from "react-router-dom";
import * as Yup from "yup";
import PasswordInput from "./PasswordInput";
import EmailInput from "./EmailInput";
import FormSubmitButton from "./FormSubmitButton";
import { selectUser, login } from "../features/auth/authSlice";
import { useAppSelector, useAppDispatch } from "../hooks";

export const loginLoader = async () => {
  // Loader used to check if user is already logged in.
  // If they are logged in, redirect to homepage.
  // const API_URL = import.meta.env.VITE_API_URL;
  // const { data } = await axios.get(`${API_URL}/auth/login`, {
  //   withCredentials: true,
  // });
  // console.log(data);
  // if (data.redirectUrl !== undefined) {
  //   return redirect(data.redirectUrl);
  // }
  return {};
};

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
  email: Yup.string().email("Invalid email").required("Email is required."),
  password: Yup.string().required("Password is required."),
});

const LoginForm = () => {
  const submit = useSubmit();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const { error, status, message } = useAppSelector((state) => state.auth);
  //console.log(user);

  return (
    <div className="bg-gray-200 text-black p-8 rounded-lg flex flex-col w-[22.5rem]">
      <h1 className="text-2xl border border-b-gray-300">Login</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={async (values) => {
          console.log("Attempting to login...");
          dispatch(login(values));
          // submit(values, { method: "post", action: "/auth/login" });
        }}
      >
        <Form className="flex flex-col gap-2 ">
          <EmailInput />
          <PasswordInput />
          {error ? <div>{message}</div> : null}
          <FormSubmitButton buttonText="Login" status={status} />
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
