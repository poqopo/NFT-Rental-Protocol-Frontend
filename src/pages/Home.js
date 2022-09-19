import { Link } from "react-router-dom";
import styled from "styled-components";
import Menu from "../components/Menu";
import Itemlist from "../components/Itemlist";
import Button from "../components/Button,";

const StyledHome = styled.div`
  border: 1px solid blue;
  border-radius: 30px;
  width: full;
  height: full;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Listbutton = styled.div`
  border: 1px solid blue;
  border-radius: 30px;
  margin: 3% auto;
  padding: 2% 2%;
  width: 50%;
  display: flex;
  justify-content: space-between;

  & .listtext {
    font-size: 18px;
    font-weight: 600;
  }

  & .listbutton {
    margin: 0 3%;
  }
`;

const Layout = styled.div`
border: 1px solid blue;
border-radius: 30px;
width: full;
height: full;
margin-top: 30px;
display: flex;
`

function Home() {
  return (
    // <div>
    //   <Listbutton>
    //       <div className="listtext">
    //         Do you want to list your NFT for addtional profit?
    //         click the button to list your NFT
    //       </div>
    //     <Link className="listbutton" to={'/List'}>
    //       <Button text={"List your NFT!"}></Button>
    //     </Link>
    //   </Listbutton>
    //   <StyledHome>
    //     <Menu/>
    //     <Itemlist type={"listed"} link={"Rent"}/>
    //   </StyledHome>
    // </div>
    <StyledHome>
      <Listbutton>
        <div className="listtext">
          Do you want to list your NFT for addtional profit? click the button to
          list your NFT
        </div>
        <Link className="listbutton" to={"/List"}>
          <Button text={"List your NFT!"}></Button>
        </Link>
      </Listbutton>
      <Layout>
        <Menu/>
        <Itemlist type={"listed"} link={"Rent"}/>
      </Layout>
    </StyledHome>
  );
}

export default Home;
