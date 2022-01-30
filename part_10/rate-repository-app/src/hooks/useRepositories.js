import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";

import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = ({ orderDirection, orderBy }) => {
  const [repositories, setRepositories] = useState();

  const { data, error, loading } = useQuery(
    GET_REPOSITORIES(orderDirection, orderBy),
    {
      fetchPolicy: "cache-and-network",
    }
  );

  useEffect(() => {
    if (!loading && !error) {
      setRepositories(data.repositories);
    }
  }, [loading]);

  // return { repositories, loading, refetch: fetchRepositories };
  return { repositories, loading };
};

export default useRepositories;
