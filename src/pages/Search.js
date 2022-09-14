import styled from "styled-components";
import Menu from "../components/Menu";
import Itemlist from "../components/Itemlist";
import { useParams } from "react-router-dom";

const StyledSeach = styled.div`
  border: 1px solid blue;
  border-radius: 30px;
  margin-top: 30px;
  display: flex;
`;

function Search() {
  const params = useParams()

  return (
    <StyledSeach>
      <Menu />
      <Itemlist type={`search/${params.collectionname}`} />
    </StyledSeach>
  );
}

export default Search;
