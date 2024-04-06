import React, { useEffect } from "react";
import { useNavigate, useRouteError } from "react-router-dom";

export const ErrorPage: React.FC = () => {
  const err = useRouteError();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      err &&
      typeof err === "object" &&
      "status" in err &&
      err.status === 404
    ) {
      navigate("/");
    }
  });

  return <div>{JSON.stringify(err)}</div>;
};
