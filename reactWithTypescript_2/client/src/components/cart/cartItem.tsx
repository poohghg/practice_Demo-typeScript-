import { ForwardedRef, forwardRef, memo } from "react";
import styled from "styled-components";
import { MinusIcon, PlusIcon } from "../../assets/icons/icons";
import { CartType } from "../../graphql/gqlCart";
import CartProduct from "./cartProduct";

interface CartProps extends CartType {
  handleUpdateAmount: (e: React.MouseEvent, amount: number, id: string) => void;
  handleDeleteCart: (e: React.MouseEvent, id: string) => void;
  // ref: ForwardedRef<HTMLInputElement>;
}

// ref는 일반적인 props가 아니다.
const CartItem = (
  { amount, id, product, handleUpdateAmount, handleDeleteCart }: CartProps,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  return (
    <li>
      <input
        type="checkbox"
        name="select-item"
        data-id={id}
        ref={ref}
        // disabled={!createdAt}
      />
      <CartProduct {...product} />
      <div>
        <span>총액:</span>
        <span>{product.price * amount}</span>
      </div>
      <ControlAmount>
        <button
          type="button"
          onClick={(e) => handleUpdateAmount(e, amount - 1, id)}
        >
          <MinusIcon />
        </button>
        <div>{amount}</div>
        <button
          type="button"
          onClick={(e) => handleUpdateAmount(e, amount + 1, id)}
        >
          <PlusIcon />
        </button>
      </ControlAmount>
      <button type="button" onClick={(e) => handleDeleteCart(e, id)}>
        삭제
      </button>
    </li>
  );
};
export default memo(forwardRef(CartItem));

const ControlAmount = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  border: 1px solid #bcbcbc;
  border-radius: 8px;

  > div {
    height: 100%;
    padding: 0 0.5rem;
    border-left: 1px solid #bcbcbc;
    border-right: 1px solid #bcbcbc;
    font-size: 1.2rem;
  }
  > button {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 0.5rem;
  }
`;
