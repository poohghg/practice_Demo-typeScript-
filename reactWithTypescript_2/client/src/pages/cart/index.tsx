import { useQuery } from "react-query";
import { CartType, GET_CART } from "../../graphql/gqlCart";
import { graphqlFetcher, QueryKeys } from "../../queryClient";

const Cart = () => {
  const { data, status } = useQuery<CartType>(QueryKeys.CART, () =>
    graphqlFetcher(GET_CART),
  );
  console.log(data);
  return <div>장바구니입니다.</div>;
};
export default Cart;
