import { memo, SyntheticEvent } from "react";
import styled from "styled-components";

interface BaseUserInfoProps {
  name: string;
  isTest: boolean;
  order: number;
  handelSetState: (e: SyntheticEvent) => void;
  handleSetOrder: () => void;
}

const BaseUserInfo = ({
  name,
  isTest,
  order,
  handelSetState,
  handleSetOrder,
}: BaseUserInfoProps) => {
  console.log("base");
  return (
    <Box>
      <h4>로그인에 사용할 아이디를 입력해주세요.</h4>
      <Input
        name={name}
        type="text"
        maxLength={100}
        onChange={handelSetState}
      />
      <Button disabled={!isTest} onClick={handleSetOrder}>
        다음
      </Button>
    </Box>
  );
};

export default memo(BaseUserInfo);

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
  border-radius: 50px;
  cursor: pointer;
  align-self: flex-end;
  border: 1px solid ${({ theme }) => theme.colors.deepBlue};
  color: ${({ theme }) => theme.colors.deepBlue};
  :disabled {
    border: 1px solid ${({ theme }) => theme.colors.lightGray};
  }
`;
