


import styled from "styled-components";
import Menu from "../components/Menu";
import Itemlist2 from "../components/Itemlist";

const StyledKick = styled.div`
  border: 1px solid blue;
  border-radius: 30px;
  margin-top: 30px;
  display: flex;
`;

function Kick() {

  return (
    <StyledKick>
      <Menu />
      <Itemlist2 type={"rented"} link={"Kick"} />
    </StyledKick>
  );
}

export default Kick;
