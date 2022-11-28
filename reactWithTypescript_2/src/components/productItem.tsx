import { Link } from "react-router-dom";
import styled from "styled-components";
import { ProductsModel } from "../models/products";

interface ProductItemProps extends ProductsModel {}

const ProductItem = ({
  title,
  category,
  description,
  id,
  image,
  price,
  rating,
}: ProductItemProps) => {
  return (
    <Item>
      <Link to={`/products/${id}`}>
        <p>{category}</p>
        <p>{title}</p>
        <ImgWrap>
          <img src={image} />
        </ImgWrap>
        <span>{price}</span>
        <span>{rating.rate}</span>
      </Link>
    </Item>
  );
};

const Item = styled.li``;
const ImgWrap = styled.div`
  height: 20vh;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.03);
  overflow: hidden;
  && img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export default ProductItem;
