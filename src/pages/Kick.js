import { Link } from "react-router-dom";
import styled from "styled-components";
import Menu from "../components/Menu";
// import Kicklist from "../components/Kicklist";

const StyledKick = styled.div`
  border: 1px solid blue;
  border-radius: 30px;
  margin-top: 30px;
  display : flex;

`;



function Kick() {
  return (
      <StyledKick>
      <Menu/>
      </StyledKick>
  );
}

export default Kick;
