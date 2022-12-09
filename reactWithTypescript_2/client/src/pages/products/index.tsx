// 'https://fakestoreapi.com/products'
import { QueryKeys, graphqlFetcher } from "../../queryClient";
import { useQuery } from "react-query";
import styled from "styled-components";
import ProductItem from "../../components/productItem";
import GET_PRODUCTS, { ADD_PRODUCT, Products } from "../../graphql/gqlProduct";

const ProductList = () => {
  const { data, status } = useQuery<Products>(QueryKeys.PRODUCTS, () =>
    graphqlFetcher(GET_PRODUCTS),
  );
  console.log("Data", data);
  return (
    <>
      <Title>상품목록입니다.</Title>
      {status === "success" && (
        <List>
          {data?.products.map((product) => (
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
  gap: 5vh 1vw;

  @media ${(props) => props.theme.media.mobile} {
    grid-template-columns: repeat(2, 1fr);
  }
`;
