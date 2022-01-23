import { gql } from "@apollo/client";

export const AUTHORIZE = gql`
  mutation doAuthorization($authorizeInput: AuthorizeInput!) {
    authorize(credentials: $authorizeInput) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation doCreateReview($review: CreateReviewInput) {
    createReview(review: $review) {
      repositoryId
    }
  }
`;
