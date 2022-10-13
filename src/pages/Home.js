import Itemlist from "../Components/Itemlist";
import styled from "styled-components";
import Background from "../Components/Background";

const StyledHome = styled.div`
  position: relative;
  top: 80px;
  width : 100%;
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
    margin : auto;
    width : 90%;
  }
`;

export default function Home() {
  return (
    <StyledHome>
      <div className="background">
        <Background />
      </div>
      <p className="Title">Collections</p>
      <div className="list">
        <Itemlist category={"collection"} subject={"collections"}/>
      </div>
    </StyledHome>
  );
}
