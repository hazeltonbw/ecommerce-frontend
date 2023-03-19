import { useLoaderData, useParams } from "react-router-dom";
import { getUserById } from "../api/users";

export interface UserObject {
  user_id?: Number;
  fname?: string;
  lname?: string;
  email?: string;
  isadmin?: boolean;
  password?: string;
}

interface Props {}
function User(props: Props) {
  const user = useLoaderData() as UserObject;

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
