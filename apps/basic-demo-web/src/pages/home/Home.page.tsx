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
            // search query parameter is inferred from API
            //
            // (property) query: {
            //    search?: string | undefined;
            //  }
            // --------------------------------
            query: { search: "test" },
          });
          alert(JSON.stringify(data));
        }}
      >
        DemoGet
      </button>
    </div>
  );
};
