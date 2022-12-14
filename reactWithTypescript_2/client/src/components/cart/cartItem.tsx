import styled from "styled-components";
import { MinusIcon, PlusIcon } from "../../assets/icons/icons";
import { CartType } from "../../graphql/gqlCart";
import CartProduct from "./cartProduct";

interface CartProps extends CartType {
  handleUpdateAmount: (e: React.MouseEvent, amount: number, id: string) => void;
}

const CartItem = ({ amount, id, product, handleUpdateAmount }: CartProps) => {
  return (
    <li>
      <CartProduct {...product} />
      <div>
        <span>총액:</span>
        <span>{product.price * amount}</span>
      </div>
      <ControlAmount>
        <button onClick={(e) => handleUpdateAmount(e, amount - 1, id)}>
          <MinusIcon />
        </button>
        <div>{amount}</div>
        <button onClick={(e) => handleUpdateAmount(e, amount + 1, id)}>
          <PlusIcon />
        </button>
      </ControlAmount>
    </li>
  );
};
export default CartItem;

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
