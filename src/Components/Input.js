import styled from "styled-components";

const StyledInput = styled.div`
  width: 100%;
  padding : 10px; 
  background: rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  border-radius: 10px;
  display : flex;

  & .input{
    width: 100%;
    padding: 10px 0;
    font-size: 16px;
    color: #fff;
    border: none;
    border-bottom: 1px solid #fff;
    outline: none;
    background: transparent;
  }

  & .search {
    position: relative;
    display: inline-block;
    padding: 10px 20px;
    color: #03e9f4;
    font-size: 16px;
    text-decoration: none;
    text-transform: uppercase;
    overflow: hidden;
    transition: .5s;
    letter-spacing: 2px;
  }
  & .search:hover {
    background: #03e9f4;
    color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px #03e9f4,
                0 0 25px #03e9f4,
                0 0 50px #03e9f4,
                0 0 100px #03e9f4;
  }
`;

export default function Input() {
  return (
    <StyledInput>
      <input className="input" type="text" name="" required=""/>
      <a className="search" href="/">Search!</a>
    </StyledInput>
  );
}
