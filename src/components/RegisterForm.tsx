import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);
import { TextInputLiveFeedback } from "./TextInputLiveFeedback";
import FormSubmitButton from "./FormSubmitButton";
import { useAppDispatch, useAppSelector } from "../hooks";
import { login, register } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import FormErrorText from "./FormErrorText";
import { UserObject } from "../routes/User";
import { selectCart, syncCartToDatabase } from "../features/cart/cartSlice";
import { CartProductT } from "./CartProduct";
import AuthSwitchHelper from "./AuthSwitchHelper";

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
  isadmin: Yup.boolean(),
});

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cart = useAppSelector(selectCart);
  const { registerError, message, registerStatus } = useAppSelector((state) => state.auth);
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
              // Login backend route doesn't care about these properties
              // ... so delete them
              delete values.fname;
              delete values.lname;
              delete values.isadmin;
              await dispatch(login(values));
              navigate("/");

              let loggedOutCart;
              if (cart != null) {
                loggedOutCart = cart.map((product: CartProductT) => {
                  // Database only cares about product_id and qty,
                  // so make a new array with only these values
                  // also include deleted and modified to check
                  // if user deleted or modified cart while logged off
                  return {
                    product_id: product.product_id,
                    qty: product.qty,
                  };
                });
                await dispatch(syncCartToDatabase(loggedOutCart));
              }

              console.log(response);
            }
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
          <FormSubmitButton buttonText="Register" status={registerStatus} />
          <FormErrorText error={registerError} message={message} />
        </Form>
      </Formik>
      <AuthSwitchHelper switchToLink="/auth/login" helpText="Already registered? " linkText="LOGIN" />
    </div>
  );
};

export default RegisterForm;
