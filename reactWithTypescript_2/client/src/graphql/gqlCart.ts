import { getClient, graphqlFetcher, QueryKeys } from "./../queryClient";
import { useMutation } from "react-query";
import { gql } from "graphql-tag";
import { Product } from "./gqlProduct";

const client = getClient();

export type CartType = {
  id: string;
  amount: number;
  product: Product;
};

export type Carts = { cart: CartType[] };

export const GET_CART = gql`
  query GET_CART {
    cart {
      id
      amount
      product {
        id
        imageUrl
        price
        title
        description
        createdAt
      }
    }
  }
`;

export const ADD_CART = gql`
  mutation ADD_CART($id: ID!) {
    addCart(productId: $id) {
      id
      amount
      product {
        id
        imageUrl
        price
        title
        description
        createdAt
      }
    }
  }
`;

export const UPDATE_CART = gql`
  mutation UPDATE_CART($id: ID!, $amount: Int!) {
    updateCart(cartId: $id, amount: $amount) {
      id
      amount
      product {
        id
        imageUrl
        price
        title
        description
        createdAt
      }
    }
  }
`;

export const DELETE_CART = gql`
  mutation DELETE_CART($id: ID!) {
    deleteCart(cartId: $id) {
      id
    }
  }
`;

export const updateMutation = () =>
  useMutation(
    ({ id, amount }: { id: string; amount: number }) =>
      graphqlFetcher(UPDATE_CART, { id, amount }),
    {
      onMutate: ({ id, amount }) => {
        client.cancelQueries(QueryKeys.CART);
        const { cart: prev } = client.getQueryData<Carts>(QueryKeys.CART) || {
          cart: [],
        };

        if (!prev.length) return null;
        const newCart = prev.reduce((acc: CartType[], cur) => {
          if (cur.id === id) cur.amount = amount;
          return [...acc, cur];
        }, []);
        console.log(newCart);
        client.setQueryData(QueryKeys.CART, { cart: newCart });
        return { prev };
      },

      onError: (error, variables, context) => {
        console.log(context);
        client.setQueryData(QueryKeys.CART, context!.prev);
      },

      onSettled: () => {
        client.invalidateQueries(QueryKeys.CART);
      },
    },
  );
