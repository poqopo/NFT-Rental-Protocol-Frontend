import styled from "styled-components";

const StyledButton = styled.div`
  button {
    background-color: rgba(43, 45, 55, 0.6);
    color: white;
    border: none;
    box-shadow: 2px 2px 2px gray;
    position: relative;
    height: 100%;
    font-size: 20px;
    padding: 10px 20px;
    cursor: pointer;
    transition: 800ms ease all;
    outline: none;
    border-radius: 12px;

  }
  button:hover {
    background: #fff;
    color: #1aab8a;
  }
  button:before,
  button:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    height: 2px;
    width: 0;
    background: #1aab8a;
    transition: 400ms ease all;
  }
  button:after {
    right: inherit;
    top: inherit;
    left: 0;
    bottom: 0;
  }
  button:hover:before,
  button:hover:after {
    width: 100%;
    transition: 800ms ease all;
  }
`;

export default function Button({ text, onClick }) {
  return (
    <StyledButton>
      <button onClick={onClick}>{text}</button>
    </StyledButton>
  );
}
