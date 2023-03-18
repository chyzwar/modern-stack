import React from "react";
import useAxios from "axios-hooks";
import type {Stuff} from "@project/common";

const Home = (): React.ReactElement => {
  const [{data, error}] = useAxios<Stuff[]>(
    "/api/v1/stuff"
  );

  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <div>
      {data?.map((s) => <div key={s.name}>{s.name}</div>)}
    </div>
  );
};

export default Home;
