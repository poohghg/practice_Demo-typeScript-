import { useParams } from "react-router-dom";

const ProductsDetail = () => {
  const { id } = useParams();
  return <div>상세 {id} 페이지입니다.</div>;
};

export default ProductsDetail;
