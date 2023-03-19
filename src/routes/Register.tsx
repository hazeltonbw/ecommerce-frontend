import React from "react";

type Props = {};

const Register = (props: Props) => {
  return (
    <div className="">
      <form className="flex flex-col">
        <label htmlFor="username">Email</label>
        <input type="text" name="email" id="email" />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />

        <label htmlFor="fname">First Name</label>
        <input type="text" name="fname" id="fname" />

        <label htmlFor="lname">Last Name</label>
        <input type="text" name="lname" id="lname" />

        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Register;

// #register-form {
//   display: flex;
//   flex-direction: column;
// }
