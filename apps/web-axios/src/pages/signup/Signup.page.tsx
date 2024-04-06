import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";

export const SignupPage: React.FC = () => {
  const { register, handleSubmit } = useForm<{
    email: string;
    password: string;
    name: string;
  }>();

  const navigate = useNavigate();

  return (
    <div>
      <p>Sign up</p>
      <form
        onSubmit={handleSubmit(async (data) => {
          const {
            data: { success },
          } = await api("/auth/signup", "post", { body: data });

          if (success) {
            navigate("/");
          }
        })}
      >
        <div>
          <label>name</label>
          <input {...register("name")} />
        </div>
        <div>
          <label>email</label>
          <input {...register("email")} />
        </div>
        <div>
          <label>password</label>
          <input type="password" {...register("password")} />
        </div>
        <button type="submit" onClick={() => {}}>
          Sign up
        </button>
      </form>
    </div>
  );
};
