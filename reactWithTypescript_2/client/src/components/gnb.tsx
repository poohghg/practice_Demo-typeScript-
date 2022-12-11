import { memo } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface Path {
  to: string;
  pathName: string;
}
const paths: Path[] = [
  { to: "/", pathName: "홈" },
  { to: "products", pathName: "상품" },
  { to: "cart", pathName: "장바구니" },
];

const Gnb = () => {
  console.log("Gnb");
  return (
    <Navbar>
      <div>Logo</div>
      <MenuUl>
        {paths.map((path) => (
          <li key={path.to}>
            <Link to={path.to}>{path.pathName}</Link>
          </li>
        ))}
      </MenuUl>
    </Navbar>
  );
};

export default memo(Gnb);

const Navbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 8vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(26, 53, 91);
  padding: 0 2rem;
  * {
    color: #fff;
    font-size: ${({ theme }) => theme.fonts.size.sm};
    font-weight: 300;
  }
`;
const MenuUl = styled.ul`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  :hover {
    color: #fff;
  }
`;
