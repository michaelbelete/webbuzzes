import gql from "graphql-tag"

export const fetchAllPosts = gql`
  query posts($first: Int!, $skip: Int!) {
    posts(first: $first, skip: $skip) {
      id
      title
      body
      createdAt
      updatedAt
      blogger {
        username
        interest
      }
    }
  }
`

export const postCount = gql`
  {
    postsConnection {
      aggregate {
        count
      }
    }
  }
`

export const fetchOnePost = gql`
  query post($id: String!) {
    post(where: { id: $id }) {
      id
      title
      body
      blogger {
        id
        username
      }
    }
  }
`

export const fetchOneBlogger = gql`
  query blogger($id: String!) {
    blogger(where: { id: $id }) {
      id
      username
      password
      interest
    }
  }
`

export const login = gql`
  query blogger($username: String!, $password: String!) {
    blogger(where: { username: $username, password: $password }) {
      id
    }
  }
`
//create
export const addPost = gql`
  mutation($title: String!, $body: String!, $bloggerId: String!) {
    createPost(
      data: {
        title: $title
        body: $body
        blogger: { connect: { id: $bloggerId } }
      }
    ) {
      id
      title
      body
      blogger {
        username
      }
    }
  }
`

export const addBlogger = gql`
  mutation($username: String!, $password: String!, $interest: String!) {
    createBlogger(
      data: { username: $username, password: $password, interest: $interest }
    ) {
      id
    }
  }
`
//update
export const deletePost = gql`
  mutation($id: String!) {
    deletePost(where: { id: $id }) {
      id
    }
  }
`
//delete
