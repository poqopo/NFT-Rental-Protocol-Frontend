import styled from "styled-components";
import Menu from "../components/Menu";
import Itemlist from "../components/Itemlist";

const StyledSeach = styled.div`
  border: 1px solid blue;
  border-radius: 30px;
  margin-top: 30px;
  display: flex;
`;

function Search() {
    

  return (
    <StyledSeach>
      <Menu />
      <Itemlist type={"search/"} link={"Kick"} />
    </StyledSeach>
  );
}

export default Search;
