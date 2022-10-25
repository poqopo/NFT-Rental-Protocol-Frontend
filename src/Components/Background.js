import styled from "styled-components";

const StyledBackground = styled.div`
width : 100%;
height : 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default function Background({ url }) {
  return (
    <StyledBackground>
      <img src={url} alt="banner"></img>
    </StyledBackground>
  );
}
