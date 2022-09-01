import { Link } from "react-router-dom";
import styled from "styled-components";
import Menu from "../components/Menu";
import Itemlist from "../components/Itemlist";

const StyledHome = styled.div`
  border: 1px solid blue;
  border-radius: 30px;
  margin-top: 30px;
  display : flex;

`;

const ListButton = styled.div`
  border: 1px solid blue;
  margin: 5% auto;
  width: 50%;
  height: 5%;
  display: flex;
  justify-content: space-between;

  & .listtext {
    width: 75%;
  }
`;



function Home() {
  return (
    <div>
      <ListButton>
          <p className="listtext">
            Do you want to list your NFT for addtional profit?
            click the button to list your NFT
          </p>
        <Link to={'/List'}>list your NFT</Link>
      </ListButton>
      <StyledHome>
        <Menu/>
        <Itemlist/>
      </StyledHome>
    </div>
  );
}

export default Home;
