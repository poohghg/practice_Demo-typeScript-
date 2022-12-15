import React, { createRef, SyntheticEvent, useMemo, useRef } from "react";
import styled from "styled-components";
import { Carts, deleteMutation, updateMutation } from "../../graphql/gqlCart";
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

  return (
    <form ref={formRef} onChange={handleCheckBoxChange}>
      <ul>
        <Input id="allCheckBox" name="all" type="checkbox" />
        <Label htmlFor="allCheckBox" />
        {cart?.map((item, idx) => (
          <CartItem
            key={item.id}
            ref={checkboxRefs[idx]}
            handleUpdateAmount={handleUpdateAmount}
            handleDeleteCart={handleDeleteCart}
            {...item}
          />
        ))}
      </ul>
    </form>
  );
};

const List = styled.ul`
  /* display: flex; */
  margin: 0 auto;
  /* width: 100%; */
`;

const Input = styled.input`
  overflow: hidden;
  position: absolute;
  top: 2px;
  left: 2px;
  z-index: -1;
  width: 1px;
  height: 1px;
  border: 0px;
  background: transparent;
  visibility: hidden;
  appearance: none;

  :checked + label::before {
    border-color: rgb(55, 95, 255);
    background: rgb(55, 95, 255);
  }

  :checked + label::after {
    border-color: rgb(255, 255, 255);
  }
`;

const Label = styled.label`
  display: inline-block;
  position: relative;
  z-index: 1;
  color: rgb(48, 48, 51);
  cursor: pointer;
  vertical-align: top;

  ::before {
    position: absolute;
    top: 0px;
    left: 0px;
    background: rgb(255, 255, 255);
    border: 1px solid rgb(212, 212, 212);
    border-radius: 2px;
    text-align: center;
    content: "";
    width: 22px;
    height: 22px;
    transition: all 0.25s ease 0s;
  }
  ::after {
    content: "";
    position: absolute;
    border-style: solid;
    border-color: rgb(212, 212, 212);
    border-image: initial;
    border-width: 0px 1px 1px 0px;
    transform: rotate(45deg);
    top: 4px;
    left: 8px;
    width: 5px;
    height: 10px;
    box-sizing: content-box;
  }
`;

export default CartList;
