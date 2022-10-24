import Input from "./Input";
import Button from "./Button";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const StyledForm = styled.div`
  width: 100%;
  height: 44px;
  margin: auto; 
  display: flex;
`;
export default function Search({text}) {
    const [input, setInput] = useState();
    const onChange = (e) => setInput(e.target.value)
    const navigate = useNavigate()

  return (
    <StyledForm>
      <Input text={text} onChange={onChange}/>
      <Button text={"Search!"} onClick={() => navigate(`${input}`)}/>
    </StyledForm>
  );
}
