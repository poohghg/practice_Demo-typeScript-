import { Link } from "react-router-dom";
import styled from "styled-components";
import { Product } from "../graphql/gqlProduct";

interface ProductItemProps extends Product {}

const ProductItem = ({
  id,
  imageUrl,
  price,
  title,
  description,
  createdAt,
  category = "category",
  rate = 1,
  hit = 1,
}: ProductItemProps) => {
  return (
    <Item>
      <Link to={`/products/${id}`}>
        <Category>{category}</Category>
        <ImgWrap>
          <img src={imageUrl} />
        </ImgWrap>
        <Title>{title}</Title>
        <Price>${price}</Price>
        <span>rate: {rate}</span>
        <span>count: {hit}</span>
      </Link>
    </Item>
  );
};

const Item = styled.li``;
const Category = styled.h4`
  color: ${({ theme }) => theme.colors.mainColor};
  font-size: 1.15rem;
  font-weight: 500;
  padding-bottom: 0.25rem;
`;
const Title = styled.p`
  padding-top: 0.3rem;
  color: ${({ theme }) => theme.colors.mainColor};
  font-weight: 300;
  min-height: 3rem;
`;
const ImgWrap = styled.div`
  height: 20vh;
  border-radius: 16px;
  border: 2.5px solid rgba(0, 0, 0, 0.03);
  overflow: hidden;
  /* background-color: #fff; */
  && img {
    padding: 1rem 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
const Price = styled.h4`
  padding-top: 0.2rem;
  padding-bottom: 0.15rem;
  font-size: 1.1rem;
  font-weight: 500;
`;

export default ProductItem;
