import { Formik, Form } from "formik";
import React from "react";
import * as Yup from "yup";
import PasswordInput from "./PasswordInput";
import EmailInput from "./EmailInput";
import FormSubmitButton from "./FormSubmitButton";
import { login } from "../features/auth/authSlice";
import { useAppSelector, useAppDispatch } from "../hooks";
import { selectCart, syncCartToDatabase } from "../features/cart/cartSlice";
import { CartProductT } from "./CartProduct";
import FormErrorText from "./FormErrorText";
import { Link } from "react-router-dom";
import AuthSwitchHelper from "./AuthSwitchHelper";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email address is required."),
  password: Yup.string().required("Password is required."),
});

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const { loginError, loginStatus, message } = useAppSelector((state) => state.auth);
  const cart = useAppSelector(selectCart);

  return (
    <div className="flex w-[22.5rem] flex-col rounded-lg bg-gray-200 p-8 text-black">
      <h1 className="border border-b-gray-300 text-2xl">Login to your account</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          console.log("Attempting to login...");
          try {
            const response = await dispatch(login(values));
            if (response.payload.status === 200) {
              console.log("Syncing carts...");

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
              }
              await dispatch(syncCartToDatabase(loggedOutCart));
            }
          } catch (err) {
            console.error("error!     :", err);
          }
          setSubmitting(false);
        }}
      >
        <Form className="flex flex-col gap-2 ">
          <EmailInput />
          <PasswordInput />
          <FormErrorText error={loginError} message={message} />
          <FormSubmitButton buttonText="Login" status={loginStatus} />
        </Form>
      </Formik>
      <AuthSwitchHelper switchToLink="/auth/register" helpText="Don&apos;t have an account? " linkText="Register here" />
    </div>
  );
};

export default LoginForm;
