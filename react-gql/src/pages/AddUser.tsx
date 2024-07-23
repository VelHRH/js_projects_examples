import { FC } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Button from "../components/Button";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../apollo/querries/user";
import { useNavigate } from "react-router-dom";
const AddUser: FC = () => {
  const { register, handleSubmit } = useForm();
  const [signUp, { error }] = useMutation(REGISTER_USER);
  const navigate = useNavigate();
  const signUpUser = async (data: FieldValues) => {
    try {
      const email = data.email;
      const password = data.password;
      await signUp({ variables: { input: { email, password } } });
      navigate("/users");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      {error && <p>Error: {error.message}</p>}
      <form
        onSubmit={handleSubmit(signUpUser)}
        className="flex flex-col mx-auto w-1/2 gap-5"
      >
        <input
          {...register("email")}
          placeholder="Email address"
          className="bg-slate-50 text-slate-950 p-2 rounded-lg focus:outline-none"
        />
        <input
          {...register("password")}
          placeholder="Password"
          type="password"
          className="bg-slate-50 text-slate-950 p-2 rounded-lg focus:outline-none"
        />
        <Button className="bg-green-300">Create</Button>
      </form>
    </div>
  );
};

export default AddUser;
