// 'https://fakestoreapi.com/products'
import { fetcher } from "../../queryClient";
import axios, { AxiosRequestConfig, AxiosInstance } from "axios";
import { useEffect } from "react";

const ProductList = () => {
  // /products
  // const res = fetcher({ url: "/products", method: "get" });
  // console.log(res);

  useEffect(() => {
    console.log("render");
    // const getData = async () => {
    //   try {
    //     console.log("???????");
    //     const res = await axios.get("https://fakestoreapi.com/products");
    //     if (res.status !== 200) new Error("api Error");
    //     return res.data;
    //   } catch (error) {}
    // };
    // const a = async () => {
    //   return await getData();
    // };
    // console.log(a());

    (async () => {
      const res = await fetcher({ url: "/products", method: "get" });
      console.log("Res", res);
    })();
    return () => {
      console.log("return");
    };
  }, []);

  return <div>상품목록입니다.</div>;
};
export default ProductList;
