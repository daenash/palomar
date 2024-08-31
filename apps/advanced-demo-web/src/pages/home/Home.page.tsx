import React from "react";

import { client } from "../../api/api";

export const HomePage: React.FC = () => {
  return (
    <div>
      <p>Example</p>
      <button
        onClick={async () => {
          const { data } = await client.get("/demo/", {
            query: {
              a: "test",
              q: ["a", "b", "c"],
              obj: { type: "a", value: "alma" },
            },
          });
          alert(JSON.stringify(data));
        }}
      >
        DemoGet
      </button>
      <button
        onClick={async () => {
          const { data } = await client.post("/demo/:p", {
            params: { p: "test" },
            body: { a: "body" },
          });
          alert(JSON.stringify(data));
        }}
      >
        DemoPost
      </button>
    </div>
  );
};
