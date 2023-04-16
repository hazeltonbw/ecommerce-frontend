import RegisterForm from "../components/RegisterForm";

type Props = {};

const Register = (props: Props) => {
  return (
    <div className="flex flex-col flex-1 justify-center items-center p-8 bg-cyan-600">
      <RegisterForm />
    </div>
  );
};

export default Register;
