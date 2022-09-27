import styled from "styled-components";

const StyledMenu = styled.div`
  margin: auto 0;
  position: static;
  border-radius: 30px;
  background-color : rgba(255, 136, 38, 0.25);
  text-align: center;
  width: 224px;
  display: flex;
  flex-direction: column;
  font-size: 20px;
  font-weight: 800;

  & .subtitle {
    font-size: 14px;
    font-weight: 400;
  }
`;

function Menu() {
  return (
    <StyledMenu>
      <p>Price!</p>
      <p className="subtitle">Ascending</p>
      <p className="subtitle">Descending</p>
      <p>Collateral!</p>
      <p className="subtitle">WKLAY</p>
      <p className="subtitle">KUSDT</p>
      <p>Rent Duration</p>
      <p className="subtitle">Ascending</p>
      <p className="subtitle">Descending</p>
    </StyledMenu>
  );
}

export default Menu;
