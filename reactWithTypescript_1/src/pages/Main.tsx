import React from "react";
import { Link, useNavigate } from "react-router-dom";
// import { Interface } from "readline";
import styled from "styled-components";

interface PathInterface {
  path: string;
  title: string;
  desc: string;
}
const PathInfo: PathInterface[] = [
  {
    path: "/",
    title: "main",
    desc: "메인페이지입니다.메인페이지입니다.메인페이지입니다.메인페이지입니다.메인페이지입니다.메인페이지입니다.메인페이지입니다.",
  },
  { path: "/todo", title: "state", desc: "state를 활용한 Todo페입지입니다." },
  { path: "/todo1", title: "리덕스", desc: "리덕스를 테스트한 페이지입니다." },
];

const Main = () => {
  const navigate = useNavigate();

  return (
    <Base>
      <HeaderLabel>DemoCode</HeaderLabel>
      <List>
        {PathInfo.map((info) => (
          <ContentWrap key={info.path} onClick={(e) => navigate(info.path)}>
            <Content>
              <ContentHeader>{info.title}</ContentHeader>
              <ContentText>{info.desc}</ContentText>
            </Content>
          </ContentWrap>
        ))}
      </List>
    </Base>
  );
};

export default Main;

const Base = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.mainBackGroud};
`;
const HeaderLabel = styled.h3`
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
  padding: 2rem 0;
  border-bottom: 1rem;
  color: ${({ theme }) => theme.colors.black};
  /* border-bottom: ${({ theme }) => `1px solid ${theme.colors.lightGray}`}; */
  box-shadow: 0px 0px 2px 1px #bcbcbc;
`;
const List = styled.ul`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 2rem 5%;
`;

const ContentWrap = styled.li`
  margin-left: 3%;
  margin-bottom: 1rem;
  width: 320px;
  max-width: 320px;
  overflow: hidden;
  transition: transform 0.1s ease-in;
  &:hover {
    transform: scale(1.1, 1.2);
  }
  border-radius: 12px;
  box-shadow: 0px 0px 1px 0.5px #bcbcbc;
  cursor: pointer;
`;

const Content = styled.button`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ContentHeader = styled.h5`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 450;
  height: 65px;
  max-height: 65px;
  color: ${({ theme }) => theme.colors.LightBlack};
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.lightGray}`};
  padding: 0.2rem 0;
`;

const ContentText = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: 350;
  background: ${({ theme }) =>
    `linear-gradient(45deg, ${theme.colors.blue}, ${theme.colors.skyBlue})`};
  color: ${({ theme }) => theme.colors.white};
  /* color: ${({ theme }) => theme.colors.black}; */
`;
