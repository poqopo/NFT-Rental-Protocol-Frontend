import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Button from "./Button";
import Input from "./Input";

const StyledHeader = styled.div`
  position: fixed;
  width: 100%;
  height: 80px;
  background-color: #f0cc96;
  place-content: center;
  opacity: 1;
  backdrop-filter: blur(10px);
  z-index: 1;

  & .Logo {
    margin: auto 0;
    width: 10%;
  }
  & .form {
    display: block;
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
    place-content: space-around;
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

  & .explore {
    width : 100px;
    text-align : center;
  }
`;

const ConnectWallet = styled.button`
  margin: auto;
  padding: 1em 1.5em;
  width: 154px;
  height: 54px;
  border: 0;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 300;
  background-color: transparent;
  &:hover {
    background: #03e9f4;
    color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4,
      0 0 100px #03e9f4;
    cursor: pointer;
  }

`;

export default function Header() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(
    window.klaytn ? window.klaytn.selectedAddress : undefined
  );
  const { pathname } = useLocation();

  // initialize hook----------------------------
  useEffect(() => {
    const onLoad = async () => {
      console.log("onLoad current Address : ", currentAddress);
      if (currentAddress) {
        setIsWalletConnected(true);
        setCurrentAddress(currentAddress);
      }
    };
    // load eventlistner 추가해서
    // 문서내 모든 컨텐츠가 load되면
    // current address 바꿔주고 isWalletConnected를 True로 바꿔줌
    window.addEventListener("load", onLoad);

    // accountChange EventListner
    //   -> 지갑주소 undefined 됐을때 대비 갱신
    if (window.klaytn) {
      window.klaytn.on("accountsChanged", async function (accounts) {
        console.log(
          "account change listned in header : ",
          currentAddress,
          " -> ",
          accounts[0]
        );

        await setCurrentAddress(accounts[0]);
        await setIsWalletConnected(true);
      });
    }

    // clean-up 으로 event-listner 삭제
    return () => window.removeEventListener("load", onLoad);
  }, []);

  async function connectKaikas() {
    const response = await window.klaytn.enable();
    console.log("connect Click : ", response);
    setCurrentAddress(response[0]);
    setIsWalletConnected(true);
    return window.klaytn.selectedAddress;
  }
  return (
    <StyledHeader>
      <div className="Menu">
        <div className="Logo">
          <p>Logo</p>
        </div>
        <div className="form">
          <Input className="Input" />
        </div>
        <div className="link">
          <Link className="explore" to="/">Explore</Link>
          <Link className="explore" to="/Kick">Kick</Link>
          <ConnectWallet onClick={() => connectKaikas()}>
            {isWalletConnected
              ? <Link to={`user/${currentAddress}`}>{currentAddress.slice(0, 10) + "..." + currentAddress.slice(-3)}</Link>
              : "Connect Wallet"}
          </ConnectWallet>
        </div>
      </div>
    </StyledHeader>
  );
}
