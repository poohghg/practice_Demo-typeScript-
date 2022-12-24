import { SyntheticEvent, useCallback, useState } from "react";
import styled from "styled-components";
import BaseUserInfo from "../../components/singUp/baseUserInfo";

interface UserInfoProps {
  // [key: string]: string | number;
  email: string;
  passWord: string;
  phoneNum: number;
}

const reg_email =
  /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

const SingUp = () => {
  const [order, setOrder] = useState<number>(0);
  const [userState, setUserState] = useState<UserInfoProps>({
    email: "",
    passWord: "",
    phoneNum: 0,
  });

  const handelSetState = useCallback((e: SyntheticEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setUserState((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSetOrder = useCallback(() => {
    setOrder((prev) => ++prev);
  }, []);

  return (
    <Main>
      <h3>회원가입</h3>
      <BaseUserInfo
        name="email"
        isTest={reg_email.test(userState.email)}
        order={order}
        handelSetState={handelSetState}
        handleSetOrder={handleSetOrder}
      />
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
