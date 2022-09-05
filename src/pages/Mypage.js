import styled from "styled-components";
import Itemlist from "../components/Itemlist";

const StyledMypage = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5% 8%;
  border: 1px solid blue;
  border-radius: 30px;
`;
const Image = styled.div`
  margin: 5% auto;
  text-align: center;
  & .image {
    margin: auto;
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
`;

function Mypage() {
  const currentAddress = window.klaytn.selectedAddress;

  return (
    <StyledMypage>
      <Image>
        <img
          className="image"
          src="https://miya.sunmiya.club/1319.png"
          alt="Workflow"
        />
        <p>{currentAddress}</p>
      </Image>
      <button>Show History</button>
      <Itemlist type={currentAddress} link={''}/>
    </StyledMypage>
  );
}

export default Mypage;
