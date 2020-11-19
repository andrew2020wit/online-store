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

export const CreateGoodsGQL = gql`
  mutation createGoods(
    $name: String!
    $description: String!
    $smallPhotoUrl: String!
    $bigPhotoUrl: String!
    $price: Int
  ) {
    createGoods(
      name: $name
      description: $description
      smallPhotoUrl: $smallPhotoUrl
      bigPhotoUrl: $bigPhotoUrl
      price: $price
    )
  }
`;

export const EditGoodsGQL = gql`
  mutation editGoods(
    $id: String!
    $name: String!
    $description: String!
    $smallPhotoUrl: String!
    $bigPhotoUrl: String!
    $price: Int
  ) {
    editGoods(
      id: $id
      name: $name
      description: $description
      smallPhotoUrl: $smallPhotoUrl
      bigPhotoUrl: $bigPhotoUrl
      price: $price
    )
  }
`;

export const DisActiveGoodsGQL = gql`
  mutation disActiveGoods($goodsId: String!) {
    disActiveGoods(goodsId: $goodsId)
  }
`;
