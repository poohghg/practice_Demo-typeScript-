import React, {
  createRef,
  SyntheticEvent,
  useEffect,
  useMemo,
  useRef,
} from "react";
import styled from "styled-components";
import { Carts, deleteMutation, updateMutation } from "../../graphql/gqlCart";
import { CheckBoxInput, CheckBoxLabel } from "../../style/styledComponents";
import CartItem from "./cartItem";

// interface CartProps extends CartType {}

const CartList = ({ cart }: Carts) => {
  // react state and refs
  const formRef = useRef<HTMLFormElement>(null);

  // 사용변수
  const checkboxRefs = useMemo(
    () => cart.map(() => createRef<HTMLInputElement>()),
    [cart],
  );

  //  뮤테이션
  const { mutate: updateCart } = updateMutation();
  const { mutate: deleteCart } = deleteMutation();

  const handleCheckBoxChange = (e: SyntheticEvent) => {
    if (!formRef.current) return;
    const target = e?.target as HTMLInputElement;
    if (target.name === "all") {
      const isChecked = target.checked;
      checkboxRefs.forEach((ele) => (ele.current!.checked = isChecked));
    } else {
      //  전체 체크박스를 체크해주는 단순한 용도
      const data = new FormData(formRef.current);
      const selectedCount = data.getAll("select-item").length;
      const isAllChecked = selectedCount === cart.length;
      formRef.current.querySelector<HTMLInputElement>("#allCheckBox")!.checked =
        isAllChecked;
    }
  };

  const handleUpdateAmount = (
    e: React.MouseEvent,
    amount: number,
    id: string,
  ) => {
    if (amount) updateCart({ id, amount });
  };

  const handleDeleteCart = (e: React.MouseEvent, id: string) => {
    const isDelete = confirm("해당 제품을 삭제하시겠습니끼?");
    if (isDelete) deleteCart({ id });
  };

  useEffect(() => {
    if (checkboxRefs.length && formRef.current) {
      checkboxRefs.forEach((ref) => (ref.current!.checked = true));
      formRef.current.querySelector<HTMLInputElement>("#allCheckBox")!.checked =
        true;
    }
  }, [formRef.current]);

  return (
    <form ref={formRef} onChange={handleCheckBoxChange}>
      <ul>
        {cart.length !== 0 && (
          <>
            <CheckBoxInput id="allCheckBox" name="all" type="checkbox" />
            <CheckBoxLabel htmlFor="allCheckBox" />
            {cart?.map((item, idx) => (
              <CartItem
                key={item.id}
                ref={checkboxRefs[idx]}
                handleUpdateAmount={handleUpdateAmount}
                handleDeleteCart={handleDeleteCart}
                {...item}
              />
            ))}
          </>
        )}
      </ul>
    </form>
  );
};

const List = styled.ul`
  margin: 0 auto;
`;

export default CartList;
