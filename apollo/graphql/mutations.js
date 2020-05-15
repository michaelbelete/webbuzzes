/* eslint-disable prettier/prettier */
import gql from "graphql-tag"

export const CREATE_POST = gql`
  mutation($ip: String!, $title: String!, $body: String!, $categoryid: ID!) {
    createPost( data: { ip: $ip, title: $title, body: $body, category: { connect: { id: $categoryid }}}) {
      id
      title
      body
    }
  }
`

export const CREATE_COMMENT = gql`
  mutation ($ip: String!, $comment: String!, $postid: ID!) {
  createComment(data: {ip: $ip, comment: $comment, post: {connect: {id: $postid}}}) {
    id
  }
}
`
