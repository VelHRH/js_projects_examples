import { graphql } from "../__generated__";

export const GET_ALL_PRODUCTS = graphql(`
  query GetAllProducts {
    products {
      name
      price
      authorId
    }
  }
`);
