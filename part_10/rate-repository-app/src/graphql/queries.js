import { gql } from "@apollo/client";

export const GET_REPOSITORIES = (direction, order) => gql`
  query getRepos($keyword: String) {
  repositories(
    orderBy: ${order}
    orderDirection: ${direction}
    searchKeyword: $keyword
  ) {
    edges {
      node {
        id
        fullName
        description
        language
        forksCount
        stargazersCount
        ratingAverage
        reviewCount
        ownerAvatarUrl
      }
    }
  }
}
`;

export const GET_REPOSITORY = gql`
  query getRepo($repId: ID!) {
    repository(id: $repId) {
      id
      url
      fullName
      description
      language
      forksCount
      stargazersCount
      ratingAverage
      reviewCount
      ownerAvatarUrl
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

export const GET_AUTHORIZED_USER = gql`
  query {
    authorizedUser {
      id
      username
    }
  }
`;
