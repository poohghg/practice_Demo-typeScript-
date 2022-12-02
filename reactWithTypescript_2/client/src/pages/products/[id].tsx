import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ProductsModel } from "../../models/products";
import { fetcher, QueryKeys } from "../../queryClient";

const ProductsDetail = () => {
  const { id } = useParams();
  const { data } = useQuery<ProductsModel>([QueryKeys.PRODUCTS, id], () =>
    fetcher({
      method: "get",
      url: `/products/${id}`,
    }),
  );
  console.log(data);
  return <div>상세 {id} 페이지입니다.</div>;
};

export default ProductsDetail;
