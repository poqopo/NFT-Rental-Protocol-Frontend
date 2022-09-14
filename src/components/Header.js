import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "./Button,";
import Input from "./Input";

const StyledHeader = styled.div`
  border: 1px solid blue;
  border-radius: 30px;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
`;

const Items = styled.div`
  margin: auto;
  font-size: 20px;
  font-weight: 600;
  display: flex;
  justify-content: space-evenly;
  width: 50%;
  height: 60%;

  & .serach-bar {
    margin: auto;
    display: flex;
    width: 40%;
  }

  & .logo {
    position: static;
    top: 0px;
    left: 0px;
    bottom: 200px;
    width: 200px;
    height: 100px;
  }
`;

const Logo = styled.div`
  margin: 0 auto;
  width: 20px;
  height: 10px;
  text-align: center;
`;

function Header() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(
    window.klaytn ? window.klaytn.selectedAddress : undefined
  );
  const [serachname, setSearchname] = useState('');

  const onChange = (e) => setSearchname(e.target.value)

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
      <Items>
        <Logo>
          <img src="/logo192.png" width="28px" alt="Workflow" />
        </Logo>
        <div className="serach-bar">
          <Input placeholder={"components"} onChange={onChange} />
          <Button text={<Link to={`/search/${serachname}`}>Search!</Link>}></Button>
        </div>
      </Items>
      <Items>
        <Link to={"/"}>Explore</Link>
        <Link to={"/kick"}>Kick</Link>

        <Button
          onClick={isWalletConnected ? () => "" : connectKaikas}
          text={
            isWalletConnected ? (
              <Link to={`/Mypage/${currentAddress}`}>
                {currentAddress.slice(0, 10)}
              </Link>
            ) : (
              "Connect"
            )
          }
        ></Button>
      </Items>
    </StyledHeader>
  );
}

export default Header;
