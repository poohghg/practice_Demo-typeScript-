import React, { SyntheticEvent } from "react";
import { useMutation } from "react-query";
import styled from "styled-components";
import { Carts, updateMutation } from "../../graphql/gqlCart";
import CartItem from "./cartItem";

// interface CartProps extends CartType {}

const CartList = ({ cart }: Carts) => {
  const { mutate: updateCart } = updateMutation();
  const handleUpdateAmount = (
    e: React.MouseEvent,
    amount: number,
    id: string,
  ) => {
    if (amount) updateCart({ id, amount });
  };
  return (
    <ul>
      {cart?.map((item) => (
        <CartItem
          key={item.id}
          handleUpdateAmount={handleUpdateAmount}
          {...item}
        />
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
