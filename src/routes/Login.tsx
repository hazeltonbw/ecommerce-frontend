import React, { useEffect } from "react";
import LoginForm from "../components/LoginForm";
import { selectIsLoggedIn } from "../features/auth/authSlice";
import { useAppSelector } from "../hooks";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    const navigate = useNavigate();
    console.log("Logged in: ", isLoggedIn);

    useEffect(() => {
        if (isLoggedIn) navigate("/");
    }, [isLoggedIn]);
    return (
        <div className="flex flex-col flex-1 justify-center items-center p-8 bg-sky-700">
            <LoginForm />
        </div>
    );
};

export default Login;
