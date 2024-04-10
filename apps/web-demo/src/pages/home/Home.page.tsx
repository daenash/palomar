import React from "react";

import { api } from "../../api/api";

export const HomePage: React.FC = () => {
  return (
    <div>
      <p>Example</p>
      <button
        onClick={async () => {
          const { data } = await api.get("/demo/", { query: { a: "test" } });
          alert(data);
        }}
      >
        DemoGet
      </button>
      <button
        onClick={async () => {
          const { data } = await api.post("/demo/:p", {
            params: { p: "test" },
            body: { a: "body" },
          });
          alert(data);
        }}
      >
        DemoPost
      </button>
    </div>
  );
};
