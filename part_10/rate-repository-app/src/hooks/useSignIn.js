import { useMutation } from "@apollo/client";

import { AUTHORIZE } from "../graphql/mutations";

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHORIZE, {});

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: {
        authorizeInput: {
          username,
          password,
        },
      },
    });

    return data;
  };

  return [signIn, result];
};

export default useSignIn;
