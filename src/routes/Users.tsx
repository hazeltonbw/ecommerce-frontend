import React from "react";
import User, { UserObject } from "./User";
import { useLoaderData } from "react-router-dom";

type Props = {};

export const loader = async () => {
  // Vite has a different way to access environment variables
  // https://vitejs.dev/guide/env-and-mode.html
  // console.log(import.meta.env.VITE_API_URL);
  const API_URL = import.meta.env.VITE_API_URL;
  try {
    return fetch(`${API_URL}/users/`);
  } catch (err) {
    return { error: err };
  }
};

const Users = (props: Props) => {
  const users = useLoaderData() as [UserObject];
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
