import styled from "styled-components";

const Header = styled.div`
  border: 1px solid blue;
  height: 200px;
  text-align: center;
`;

function header() {
  return (
    <Header>
        <p>Hello!</p>
    </Header>
  );
}

export default header;
