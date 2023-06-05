import { UserObject } from "./User";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Unauthenticated } from "../features/auth/authSlice";
import { useEffect } from "react";
import api from "../api";

export const loader = async () => {
  // Vite has a different way to access environment variables
  // https://vitejs.dev/guide/env-and-mode.html
  // console.log(import.meta.env.VITE_API_URL);
  const API_URL = import.meta.env.VITE_API_URL;
  try {
    const response = await api(`${API_URL}/users/`);
    return response.data;
  } catch (err) {
    return { error: err };
  }
};

const Users = () => {
  const navigate = useNavigate();
  const users = useLoaderData() as [UserObject] & Unauthenticated;

  useEffect(() => {
    if (users.error) {
      navigate("/auth/login");
    }
  });
  return (
    <div className="users">
      {users.length ? (
        <>
          <h1>Users</h1>
          {users?.map((user) => (
            <div className="user" key={user.user_id?.toString()}>
              <h1>User</h1>
              <p>{user.user_id?.toString()}</p>
              <p>{user.fname + " " + user.lname}</p>
              <p>{user.email}</p>
            </div>
          ))}
        </>
      ) : (
        <p>
          <i>No users</i>
        </p>
      )}
    </div>
  );
};

export default Users;
