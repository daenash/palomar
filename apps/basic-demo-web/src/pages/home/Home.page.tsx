import React from "react";

import { client } from "../../api/api";

export const HomePage: React.FC = () => {
  return (
    <div>
      <p>Example</p>
      <button
        onClick={async () => {
          const { data } = await client.get("/demo/", {
            // --------------------------------
            // Query parameter is inferred from API
            // (property) query: { num?: number | undefined }
            // --------------------------------
            query: { num: 5 },
          });

          // --------------------------------
          // Response type is inferred from the API
          // const data: { result: number; }
          // --------------------------------
          console.log(data);

          alert(JSON.stringify(data));
        }}
      >
        DemoGet
      </button>
    </div>
  );
};
