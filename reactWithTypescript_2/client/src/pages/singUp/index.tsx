import { SyntheticEvent, useCallback, useState } from "react";
import styled from "styled-components";
import BaseSingUp from "../../components/singUp/baseSingUp";

const reg_email =
  /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
const reg_passWord = /^.*(?=^.{8,}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
const reg_nickName = /^.*(?=^.{3,10}$)(?=.*[a-zA-Z]).*$/;

interface UserInfoProps {
  // [key: string]: string | number;
  email: string;
  passWord: string;
  confirmPassword: string;
  nickName: string;
  // phoneNum: number;
}

const SingUp = () => {
  const [order, setOrder] = useState<number>(1);
  const [userState, setUserState] = useState<UserInfoProps>({
    email: "",
    passWord: "",
    confirmPassword: "",
    nickName: "",
    // phoneNum: 0,
  });

  const handelSetState = useCallback((e: SyntheticEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setUserState((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSetOrder = useCallback(() => {
    setOrder((prev) => ++prev);
  }, []);

  console.log(userState);
  return (
    <Main>
      <h3>회원가입</h3>
      <Form action="">
        {order === 1 ? (
          <BaseSingUp
            type="email"
            name="email"
            placeHolder="로그인에 사용할 아이디를 입력해주세요."
            warning="이메일 형식을 지켜주세요."
            order={order}
            isTest={reg_email.test(userState.email)}
            handelSetState={handelSetState}
            handleSetOrder={handleSetOrder}
          />
        ) : order === 2 ? (
          <BaseSingUp
            type="passWord"
            name="passWord"
            placeHolder="로그인에 사용할 비밀번호를 입력해주세요."
            warning="최소8자,숫자,문자,특수문자를 사용해주세요."
            subWarning="비밀번호 일치"
            order={order}
            isTest={reg_passWord.test(userState.passWord)}
            isSubTest={
              !!userState.passWord &&
              userState.passWord === userState.confirmPassword
            }
            subName="confirmPassword"
            handelSetState={handelSetState}
            handleSetOrder={handleSetOrder}
          />
        ) : order === 3 ? (
          <BaseSingUp
            type="text"
            name="nickName"
            placeHolder="사용하실 닉네임을 설정해주세요."
            warning="최소3자이상 최대10자이하"
            order={order}
            isTest={reg_nickName.test(userState.nickName)}
            handelSetState={handelSetState}
            handleSetOrder={handleSetOrder}
            maxLen={10}
          />
        ) : null}
      </Form>
    </Main>
  );
};
export default SingUp;

const Main = styled.section`
  max-width: 720px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;

const Form = styled.form`
  width: 100%;
`;
