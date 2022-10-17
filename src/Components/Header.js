import styled from "styled-components";
import Input from "./Input";

const StyledHeader = styled.div`
  position: fixed;
  width: 100%;
  height: 80px;
  background-color: #f0cc96;
  place-content: center;
  opacity: 1;
  backdrop-filter: blur(10px);
  z-index : 1;

  & .Logo {
    margin: auto 0;
    width: 10%;
  }
  & .form {
    display : block;
    width: 40%;
  }

  & .Menu {
    width: 90%;
    height: 100%;
    margin: auto;
    display: flex;
    place-content: space-between;
  }
  
  & .Input {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  & .link {
    width: 40%;
    heght: 100%;
    margin: auto 0;
    display: flex;
    place-content: space-between;
    text-decoration: none;
  }
  a {
    color: white;
    padding: 1em 1.5em;
    text-decoration: none;
    text-transform: uppercase;
  }
  a:hover {
    background: #03e9f4;
    color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4,
      0 0 100px #03e9f4;
  }
`;

export default function Header() {
  return (
    <StyledHeader>
      <div className="Menu">
        <div className="Logo">
          <p>Logo</p>
        </div>
        <div className="form">
            <Input className="Input"/>
        </div>
        <div className="link">
          <a href="/">Explore</a>
          <a href="/Kick">Kick</a>
          <a href="/User">Connect</a>
        </div>
      </div>
    </StyledHeader>
  );
}
