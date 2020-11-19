import { gql } from 'apollo-angular';
export const GoodsOneGQL = gql`
  query getOneGoods($id: String!) {
    getOneGoods(id: $id) {
      id
      name
      description
      createdOn
      updatedOn
      bigPhotoUrl
      smallPhotoUrl
      price
    }
  }
`;
