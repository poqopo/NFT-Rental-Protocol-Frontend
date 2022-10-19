import styled from "styled-components";
import Button from "./Button";

const StyledInput = styled.div`
  width : 100%;
  margin : auto;
  padding : 0px 5px;
  display : flex;
  & .input {
    width : 100%;
    padding : 10px;
    height : auto;
    font-size : 16px;
    border-radius : 12px;
    background : transparent;
  }

`;

export default function Input({ text, onClick }) {
  return (
    <StyledInput>
      <input className="input" type="text" name="" required="" />
    </StyledInput>
  );
}
