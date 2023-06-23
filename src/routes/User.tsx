import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import React from "react";
import api from "../api";

export interface UserObject {
    user_id?: number;
    fname?: string;
    lname?: string;
    email?: string;
    isadmin?: boolean;
    password?: string;
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
    // Vite has a different way to access environment variables
    // https://vitejs.dev/guide/env-and-mode.html
    const API_URL = import.meta.env.VITE_API_URL;
    try {
        const response = await api(`${API_URL}/users/${params.user_id}`);
        return response.data;
    } catch (err) {
        return {
            error: err,
            message: "There was an issue trying to get user data. Please try again.",
        };
    }
};

function User() {
    const user = useLoaderData() as UserObject;
    console.log(user);

    if (!user)
        return (
            <div className="no-user">
                <p>
                    <i>No user found with that id.</i>
                </p>
            </div>
        );

    return (
        <div className="user">
            <h1 className="title">User</h1>
            <p className="name">{user.fname + " " + user.lname}</p>
            <p className="user_id">{"User id: " + user.user_id}</p>
            <p className="email">{user.email}</p>
        </div>
    );
}

export default User;
