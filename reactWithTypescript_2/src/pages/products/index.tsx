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
      <Title>상품목록입니다.</Title>
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

const Title = styled.h2`
  padding: 0 2rem;
`;

const List = styled.ul`
  padding: 1rem 2rem;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5.5vh 1vw;

  /* @media (max-width: 575px) {
    background-color: red;
    grid-template-columns: repeat(2, 1fr);
  } */
  @media (${({ theme }) => theme.media.mobile}) {
    background-color: red;
    grid-template-columns: repeat(2, 1fr);
  }
  /* @media ${(props) => props.theme.mobile} {
    grid-template-columns: repeat(2, 1fr);
  } */
  /* @media ${(props) => props.theme.desktop} {
    grid-template-columns: repeat(3, 1fr);
  } */
`;
