import React, { useEffect } from "react";
import { UserObject } from "./User";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Unauthenticated } from "../features/auth/authSlice";
import api from "../api";

export const loader = async () => {
  try {
    const response = await api(`/users/`);
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
