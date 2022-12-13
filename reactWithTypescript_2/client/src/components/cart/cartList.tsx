import React, { SyntheticEvent } from "react";
import { useMutation } from "react-query";
import styled from "styled-components";
import { Carts, updateMutation } from "../../graphql/gqlCart";
import CartItem from "./cartItem";

// interface CartProps extends CartType {}

const CartList = ({ cart }: Carts) => {
  const { mutate: updateCart } = updateMutation();

  const handleUpdateAmount = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const amount = Number(e.target.value);
    updateCart({ id, amount });
  };
  return (
    <ul>
      {cart?.map((item) => (
        <CartItem key={item.id} {...item} />
      ))}
    </ul>
  );
};

const List = styled.ul`
  /* display: flex; */
  margin: 0 auto;
  /* width: 100%; */
`;

export default CartList;
