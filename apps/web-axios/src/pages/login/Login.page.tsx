import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";

export const LoginPage: React.FC = () => {
  const { register, handleSubmit } = useForm<{
    email: string;
    password: string;
  }>();

  const navigate = useNavigate();

  return (
    <div>
      <p>Sign in</p>
      <form
        onSubmit={handleSubmit(async (data) => {
          await api("/auth/email/login", "post", { body: data });
          navigate("/");
        })}
      >
        <div>
          <label>email</label>
          <input {...register("email")} />
        </div>
        <div>
          <label>password</label>
          <input type="password" {...register("password")} />
        </div>
        <button type="submit" onClick={() => {}}>
          Sign in
        </button>
      </form>

      <form action="http://localhost:3000/auth/google/login" method="POST">
        <button type="submit">Login with Google</button>
      </form>
    </div>
  );
};
