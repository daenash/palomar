import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { api } from "../api/api";

export const SessionProvider: React.FC = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        await api("/auth/session", "get");
        setIsLoading(false);
      } catch (e) {
        navigate("/login");
      }
    };
    checkSession();
  }, []);

  return isLoading ? <div>Loading...</div> : <Outlet />;
};
