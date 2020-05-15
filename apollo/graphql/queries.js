import gql from "graphql-tag"

export const ALL_POSTS = gql`
  query posts($first: Int!, $skip: Int!) {
    posts(first: $first, skip: $skip) {
      id
      ip
      title
      body
      category {
        id
        name
      }
      createdAt
    }
  }
`

export const POST_COUNT = gql`
  {
    postsConnection {
      aggregate {
        count
      }
    }
  }
`

export const SHOW_CATEGORY = gql`
  {
    categories {
      id
      name
    }
  }
`

export const SHOW_POST = gql`
  query post($id: ID!) {
    post(where: { id: $id }) {
      id
      ip
      title
      body
      comment {
        ip
        comment
      }
    }
  }
`

export const SHOW_ONE_CATEGORY = gql`
  query category($id: ID!) {
    category(where: { id: $id }) {
      id
      name
      post {
        id
        title
        body
      }
    }
  }
`
