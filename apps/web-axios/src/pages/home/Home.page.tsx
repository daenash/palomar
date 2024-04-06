import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../api/api";

export const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<{ email: string; name: string }>();

  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await api("/user/", "get");
        setUser(data.user);
        setIsLoading(false);
      } catch (e) {
        navigate("/login");
      }
    };
    getUser();
  }, []);

  return (
    <>
      {user ? (
        <>
          <p>{JSON.stringify(user)}</p>

          <form action="http://localhost:3000/auth/logout" method="POST">
            <button type="submit">Logout</button>
          </form>

          <Link to={"/alma"}>
            <p>test route: alma</p>
          </Link>
          <Link to={"/korte"}>
            <p>test route: korte</p>
          </Link>
        </>
      ) : isLoading ? (
        <>
          <p>Loading...</p>
        </>
      ) : (
        <>
          <p>Not logged in!</p>
        </>
      )}
    </>
  );
};
