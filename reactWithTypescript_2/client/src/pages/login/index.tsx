import { SyntheticEvent, useCallback, useState } from "react";
import styled from "styled-components";

interface UserInfoProps {
  // [key: string]: string | number;
  email: string;
  passWord: string;
  phoneNum: number;
}

const reg_email =
  /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

const Login = () => {
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
  const isTest = reg_email.test(userState.email);
  return (
    <Main>
      <h3>회원가입</h3>
      <Box>
        <h4>로그인에 사용할 아이디를 입력해주세요.</h4>
        <Input
          name="email"
          type="text"
          maxLength={100}
          onChange={handelSetState}
        />
        <Button disabled={!isTest} onClick={() => setOrder((prev) => ++prev)}>
          다음
        </Button>
      </Box>
    </Main>
  );
};
export default Login;

const Main = styled.section`
  max-width: 720px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;

const Box = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
`;

const Input = styled.input`
  border: 2px solid ${({ theme }) => theme.colors.lightGray};
  box-shadow: 0px 3px 2px 1px ${({ theme }) => theme.colors.lightGray};

  border-radius: 12px;
  width: 50%;
  height: 4vh;
  margin: 1rem 0;
  padding: 0.5rem;
  font-size: 1rem;
  font-weight: 400;
  transition: all 0.15s ease 0s;
  :focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.deepBlue};
    box-shadow: 0px 3px 2px 1px ${({ theme }) => theme.colors.deepBlue};
  }
`;

const Button = styled.button`
  margin-right: 3vw;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 450;
  width: 100px;
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 50px;
  cursor: pointer;
  align-self: flex-end;
`;
