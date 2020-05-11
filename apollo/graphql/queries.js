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

//create
export const addPost = gql`
  mutation($title: String!, $body: String!) {
    createPost(data: { title: $title, body: $body }) {
      id
      title
      body
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
