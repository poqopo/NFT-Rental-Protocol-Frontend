import styled from "styled-components";
import Itemlist from "../components/Itemlist";

const StyledKick = styled.div`
  border: 1px solid #FF8826;
  border-radius: 30px;
  margin-top: 30px;
  display: flex;
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
    <div>
      <Image>
        <img
          className="image"
          src="/avatar.png"
          alt="Workflow"
        />
        <p>{currentAddress}</p>
      </Image>
      <StyledKick>
        <Itemlist type={currentAddress} link={"Mypage"} />
      </StyledKick>
    </div>
  );
}

export default Mypage;
