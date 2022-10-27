import Itemlist from "../Components/Itemlist";
import styled from "styled-components";
import Background from "../Components/Background";
import Button from "../Components/Button";
import { getTokens } from "../Utils/Contract";

const StyledHome = styled.div`
  position: relative;
  top: 80px;
  width: 100%;
  height: 100vh;

  & .background {
    margin: auto;
    width: 100%;
    min-height: 300px;
    height: 20%;
  }
  & .Title {
    margin: auto;
    color: black;
    font-size: 32px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.38;
    letter-spacing: normal;
    margin-bottom: 48px;
    text-align: center;
  }
  & .list {
    margin: auto;
    width: 90%;
  }
`;

export default function Home() {
  const viewMenu = [
    { value: 0, label: "모든 NFT" },
    { value: 1, label: "리스팅된 NFT" },
    { value: 2, label: "대여중인 NFT" },
  ];

  const sortMenu = [
    { value: 0, label: "ID 정렬" },
    { value: 1, label: "최대 대여기간 정렬" },
    { value: 2, label: "대여료 정렬" },
  ];
  return (
    <StyledHome>
      <div className="background">
        <Background url={"./background.png"} />
      </div>
      <p className="Title">Collections</p>
      <Button text={"Get Mock tokens for trial"} onClick={() => getTokens()} />

      <div className="list">
        <Itemlist
          category={"collection"}
          subject={"collections"}
          menuVisible={false}
          viewMenu={viewMenu}
          sortMenu={sortMenu}
        />
      </div>
    </StyledHome>
  );
}
