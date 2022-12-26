import { memo, SyntheticEvent, useEffect, useRef } from "react";
import styled, { css } from "styled-components";

interface BaseUserInfoProps {
  type: string;
  name: string;
  placeHolder: string;
  isTest: boolean;
  order: number;
  warning?: string;
  subWarning?: string;
  subName?: string;
  isSubTest?: boolean;
  maxLen?: number;
  handelSetState: (e: SyntheticEvent) => void;
  handleSetOrder: () => void;
}

const BaseUserInfo = ({
  isTest,
  order,
  type,
  name,
  placeHolder,
  subWarning,
  warning,
  subName,
  isSubTest,
  maxLen,
  handelSetState,
  handleSetOrder,
}: BaseUserInfoProps) => {
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (input.current) {
      input.current.value = "";
      console.log("?ts");
    }
  }, []);

  return (
    <Box>
      <h4>{placeHolder}</h4>
      <Input
        ref={input}
        name={name}
        type={type}
        isTest={isTest}
        maxLength={maxLen ?? 100}
        onChange={handelSetState}
        placeholder={placeHolder}
        defaultValue=""
      />
      <InfoText isTest={isTest}>{warning}</InfoText>
      {subName && isSubTest !== undefined ? (
        <>
          <Input
            name={subName}
            type={type}
            isTest={isSubTest}
            maxLength={100}
            onChange={handelSetState}
            defaultValue=""
          />
          {subWarning && <InfoText isTest={isSubTest}>{subWarning}</InfoText>}
        </>
      ) : null}
      <Button
        type="button"
        disabled={isSubTest !== undefined ? !isSubTest : !isTest}
        onClick={handleSetOrder}
      >
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
  > h4 {
    font-size: 1.2rem;
  }
`;

const InfoText = styled.p<{ isTest: boolean }>`
  color: ${({ theme }) => theme.colors.lightGray};
  font-size: 0.9rem;
  transition: color 0.2s ease-in 0s;
  ${({ isTest, theme }) =>
    isTest &&
    css`
      color: ${theme.colors.deepBlue};
    `}
`;

const Input = styled.input<{ isTest: boolean }>`
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
  }

  ::placeholder {
    font-size: 0.8rem;
    font-weight: 300;
    color: ${({ theme }) => theme.colors.lightGray};
  }

  ${({ isTest }) =>
    isTest &&
    css`
      outline: none;
      border-color: ${({ theme }) => theme.colors.deepBlue};
      box-shadow: 0px 3px 2px 1px ${({ theme }) => theme.colors.deepBlue};
    `}
`;

const Button = styled.button`
  align-self: flex-end;
  margin-right: 3vw;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 450;
  width: 100px;
  padding: 0.5rem;
  border-radius: 50px;
  cursor: pointer;
  color: #3f51b8;
  transition: all 0.2s ease 0s;
  border: 1px solid ${({ theme }) => theme.colors.deepBlue};
  :disabled {
    border: 1px solid ${({ theme }) => theme.colors.lightGray};
    color: ${({ theme }) => theme.colors.lightGray};
  }
`;
