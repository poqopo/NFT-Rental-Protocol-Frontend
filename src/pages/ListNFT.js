import { useState } from "react";
import { daytoblock, listNFT, approve } from "../Utils/contract";
import styled from "styled-components";
import Button from "../components/Button,";
import SelectBox from "../components/SelectBox";
import BigNumber from "bignumber.js";
import { OPTIONS } from "../Utils/contract";
import Listinput from "../components/Listinput";

const StyledList = styled.div`
  margin: 5% auto;
  width: 33%;
  height: 100%;
  border-radius: 30px;
  text-align: center;
  font-size: 18px;
  font-weight: 800;
  background-color: rgba(255, 116, 0, 0.5);
  text-decoration : none;
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: 2% 0;
`;

function List() {
  const [collectionaddr, setCollectionAddr] = useState();
  const [tokenid, setTokenId] = useState();
  const [collattoken, setCollattoken] = useState();
  const [collatamount, setCollatamount] = useState();
  const [maxrent, setMaxRent] = useState();
  const [rentfee, setRentfee] = useState();

  const onChangecolladdr = (e) => setCollectionAddr(e.target.value);
  const onChangetokenid = (e) => setTokenId(e.target.value);
  const onChangecollattoken = (e) => setCollattoken(e.target.value);
  const onChangecollatamount = (e) => setCollatamount(e.target.value);
  const onChangemaxrent = (e) => setMaxRent(e.target.value);
  const onChangerentfee = (e) => setRentfee(e.target.value);

  const list = async () => {
    const maxrentblock = await daytoblock(maxrent);
    console.log(BigNumber((rentfee * OPTIONS[1].decimal) / 60 / 60 / 24));
    await listNFT(
      collectionaddr,
      collattoken,
      tokenid,
      maxrentblock,
      BigNumber(collatamount * OPTIONS[1].decimal),
      BigNumber(Math.round((rentfee * OPTIONS[1].decimal) / 60 / 60 / 24))
    );
  };

  return (
    <StyledList>
      <h3 class="text-center">Fill in the blank to list your NFT!</h3>
      <Items>
        <Listinput
          text="Collection Address"
          placeholder="Address"
          onChange={onChangecolladdr}
        />
        <a
          href={
            window.klaytn.selectedAddress
              ? `https://baobab.scope.klaytn.com/account/${window.klaytn.selectedAddress}?tabId=kip17Balance`
              : "https://baobab.scope.klaytn.com/"
          }
          target="_blank"
        >
          Find Collection Address
        </a>
        <Listinput
          text="Token ID"
          placeholder="number"
          onChange={onChangetokenid}
        />
        <div>Collateral token</div>
        <SelectBox
          options={OPTIONS}
          handlechange={onChangecollattoken}
        ></SelectBox>
        <Listinput
          text="Collateral amount"
          placeholder="number"
          onChange={onChangecollatamount}
        />
        <Listinput
          text="Max rent duration"
          placeholder="Maxrent Duration"
          onChange={onChangemaxrent}
        />
        <Listinput
          text="Rent fee per day"
          placeholder="number"
          onChange={onChangerentfee}
        />
      </Items>
      <Button
        onClick={() => approve(collectionaddr, tokenid)}
        text={"approve!"}
      ></Button>
      <Button onClick={list} text={"List!"}></Button>
    </StyledList>
  );
}

export default List;
