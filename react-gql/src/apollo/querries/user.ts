import { graphql } from "../__generated__";

export const GET_USER = graphql(`
  query GetUser($id: Int!) {
    user(id: $id) {
      id
      email
      products {
        name
        price
      }
    }
  }
`);

export const GET_ALL_USERS = graphql(`
  query GetAllUsers {
    users {
      id
      email
      products {
        name
        price
      }
    }
  }
`);

export const REGISTER_USER = graphql(`
  mutation Register($input: LoginInput!) {
    signup(signupInput: $input) {
      email
      products {
        name
      }
    }
  }
`);
