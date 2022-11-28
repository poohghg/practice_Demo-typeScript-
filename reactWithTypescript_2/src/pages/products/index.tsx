// 'https://fakestoreapi.com/products'
import { fetcher, QueryKeys } from "../../queryClient";
import { useQuery } from "react-query";
import { ProductsModel } from "../../models/products";
import ProductItem from "../../components/productItem";
import styled from "styled-components";

const ProductList = () => {
  const { data, status } = useQuery<ProductsModel[], Error>(
    QueryKeys.PRODUCTS,
    () => fetcher({ url: "/products", method: "get", params: { limit: 5 } }),
  );
  console.log("data", data, "status", status);
  return (
    <>
      <div>상품목록입니다.</div>
      {status === "success" && (
        <List>
          {data?.map((product) => (
            <ProductItem {...product} key={product.id} />
          ))}
        </List>
      )}
    </>
  );
};
export default ProductList;

const List = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1vw;

  /* display: flex;
  flex-wrap: wrap;
  gap: 0 40px; */
`;
