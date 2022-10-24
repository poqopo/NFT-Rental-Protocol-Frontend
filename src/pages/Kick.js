import Kicklist from "../Components/Kicklist";
import styled from "styled-components";

const StyledKick = styled.div`
  position: relative;
  top: 80px;
  width : 100%;
  height: 100vh;

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

export default function Kick() {
  return (
    <StyledKick>
      <p className="Title">Kicklist</p>
      <div className="list">
        <Kicklist category={"nft"} subject={"kicklist"}/>
      </div>
    </StyledKick>
  );
}
