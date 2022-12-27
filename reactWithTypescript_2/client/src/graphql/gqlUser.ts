import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { graphqlFetcher } from "./../queryClient";
import { useMutation } from "react-query";
import { gql } from "graphql-tag";
import { setUserInfo } from "../redux/userReducer";

export interface User {
  email: string;
  nickName: string;
  token: string;
}

export type Users = User[];

const GET_USER = gql`
  query GET_PRODUCTS($email: String!) {
    checkEmail(email: $email) {
      id
      imageUrl
      price
      title
      description
      createdAt
      category
      rate
      hit
    }
  }
`;

export const CHECK_EMAIL = gql`
  query GET_PRODUCTS($email: String!) {
    checkEmail(email: $email)
  }
`;

export const ADD_USER = gql`
  mutation ADD_USER($email: String!, $passWord: String!, $nickName: String!) {
    addUser(email: $email, passWord: $passWord, nickName: $nickName) {
      email
      nickName
      token
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UPDATE_PRODUCT(
    $id: ID!
    $imageUrl: String
    $price: Int
    $title: String
    $description: String
  ) {
    updateProduct(
      id: $id
      imageUrl: $imageUrl
      price: $price
      title: $title
      description: $description
    ) {
      id
      imageUrl
      price
      title
      description
      createdAt
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DELETE_PRODUCT($id: ID!) {
    deleteProduct(id: $id)
  }
`;

export default GET_USER;

// API

export const singUpMutation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation<
    {
      addUser: User;
    },
    Error,
    {
      email: string;
      passWord: string;
      nickName: string;
    }
  >(
    ({ email, passWord, nickName }) =>
      graphqlFetcher(ADD_USER, { email, nickName, passWord }),
    {
      onMutate: () => {},
      onSuccess: ({ addUser }) => {
        console.log("   !!Data", addUser);
        dispatch(setUserInfo({ ...addUser }));
        navigate("/");
      },
      onError: (error) => {
        if (error) console.log(error);
        navigate("/");
      },
      onSettled: () => {},
    },
  );
};
