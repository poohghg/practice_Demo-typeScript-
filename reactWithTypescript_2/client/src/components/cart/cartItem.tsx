import { CartType } from "../../graphql/gqlCart";
import CartProduct from "./cartProduct";

interface CartProps extends CartType {}

const CartItem = ({ amount, id, product }: CartProps) => {
  return (
    <li>
      <CartProduct {...product} />
      <div>{amount}</div>
    </li>
  );
};
export default CartItem;
