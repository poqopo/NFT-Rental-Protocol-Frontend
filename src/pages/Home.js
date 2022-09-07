import { Link } from "react-router-dom";
import styled from "styled-components";
import Menu from "../components/Menu";
import Itemlist from "../components/Itemlist";

const StyledHome = styled.div`
  border: 1px solid blue;
  border-radius: 30px;
  width : full;
  height : full;
  margin-top: 30px;
  display : flex;
`;

const ListButton = styled.div`
  border: 1px solid blue;
  border-radius: 30px;
  margin: 3% auto;
  padding : 2% 2%;
  width: 50%;
  display: flex;
  justify-content: space-between;

  & .listtext {
    font-size: 18px;
    font-weight: 600;
  }

  & .listbutton {
    margin : 0 3%;
  }
`;



function Home() {
  return (
    <div>
      <ListButton>
          <div className="listtext">
            Do you want to list your NFT for addtional profit?
            click the button to list your NFT
          </div>
        <Link className="listbutton" to={'/List'}>
          <button>List your NFT!</button>
        </Link>
      </ListButton>
      <StyledHome>
        <Menu/>
        <Itemlist type={"listed"} link={"Rent"}/>
      </StyledHome>
    </div>
  );
}

export default Home;
