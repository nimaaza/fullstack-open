import { gql } from "@apollo/client";

export const AUTHORIZE = gql`
  mutation doAuthorization($authorizeInput: AuthorizeInput!) {
    authorize(credentials: $authorizeInput) {
      accessToken
    }
  }
`;
