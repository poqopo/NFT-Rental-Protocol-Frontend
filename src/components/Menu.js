import styled from "styled-components";

const StyledMenu = styled.div`
  position: static;
  border: 1px solid blue;
  border-radius: 30px;
  text-align: center;
  width: 224px;
  height : 650px;
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
      <p>Status</p>
      <p className="subtitle">listed</p>
      <p className="subtitle">Rented</p>
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
