import { memo } from "react";
import { Link } from "react-router-dom";

const Gnb = () => {
  console.log("Gnb");
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="products">상품목록</Link>
        </li>
        <li>
          <Link to="cart">장바구니</Link>
        </li>
      </ul>
    </nav>
  );
};

export default memo(Gnb);