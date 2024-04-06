import {
  RouterProvider as ReactRouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { SessionProvider } from "./Session.provider";
import { ErrorPage } from "../pages/Error.page";
import { HomePage } from "../pages/home/Home.page";
import { TestPage } from "../pages/Test.page";
import { LoginPage } from "../pages/login/Login.page";
import { SignupPage } from "../pages/signup/Signup.page";
import React from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SessionProvider />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/alma", element: <TestPage text="alma" /> },
      { path: "/korte", element: <TestPage text="korte" /> },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignupPage /> },
]);

export const RouterProvider: React.FC = () => {
  return <ReactRouterProvider router={router} />;
};
