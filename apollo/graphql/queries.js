import gql from 'graphql-tag'

export const FETCH_POSTS = gql`
  {
    posts {
      id
      title
      body
      createdAt
      updatedAt
      blogger{
        username
        interest
      }
    }
  }
`;

export const FETCH_ONE_POST = gql`
query posts($first: Int!, $skip: Int!) {
  posts(orderBy: dateAndTime_DESC, first: $first, skip: $skip) {
    id
    title
    body
    createdAt
    updatedAt
    blogger{
      username
      interest
    }
  }
}
`
