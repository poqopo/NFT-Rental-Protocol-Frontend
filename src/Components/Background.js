import styled from "styled-components";

const StyledBackground =styled.div`
  width: 100%;
  height: 100%;
  background: url("/background.jpg") no-repeat center;
  background-size: cover;
`;

export default function Background() {
  return <StyledBackground></StyledBackground>;
}
