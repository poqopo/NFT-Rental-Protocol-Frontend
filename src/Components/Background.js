import styled from "styled-components";

const StyledBackground =styled.div`
  width: 100%;
  height: 100%;
  background-image: url('/background.jpg');
  background-repeat: no-repeat;
  background-size: cover;
`;

export default function Background(url) {
  return <StyledBackground></StyledBackground>;
}
