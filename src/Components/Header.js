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
  display: grid;
  grid-template-columns: 200px 1fr 1fr;

  & .Logo {
    margin: auto;
    width: 100%;
    text-align : center;
  }
  & .form {
    width : 80%;
    height : 44px;
    margin : auto;
    display : flex;
  }

  & .link {
    margin: auto 0;
    display : grid;
    grid-template-columns: repeat(3, 1fr);
    place-content: space-evenly;
    font-size: 16px;
    font-weight: 500;
    text-decoration: none;
    text-align : center;
  }
  a {
    color: black;
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
    margin : auto;
    width : 120px;
  
  }
`;

const ConnectWallet = styled.button`
  margin: auto;
  padding: 1em 1.5em;
  width: 154px;
  height: 54px;
  border: 0;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  text-align : center;
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
      <h3 className="Logo">Logo</h3>
      <div className="form">
      <Input />
      <Button text={"Search!"}/>
      </div>
      
      <div className="link">
        <a className="explore" href="/">
          Explore
        </a>
        <a className="explore" href="/Kick">
          Kick
        </a>
        <ConnectWallet onClick={() => connectKaikas()}>
          {isWalletConnected ? (
            <a href={`/user/${currentAddress}`}>
              Mypage
            </a>
          ) : (
            "Connect Wallet"
          )}
        </ConnectWallet>
      </div>
    </StyledHeader>
  );
}
