import { useState } from "react";
import { daytoblock, listNFT, approve } from "../Utils/contract";
import styled from "styled-components";
import Button from "../components/Button,";

const StyledList = styled.div`
 margin : 5% 10%;
 width : 33%
 height : 100%
 border: 1px solid blue;
 border-radius: 30px;
 text-align : center;
 font-size: 18px;
 font-weight: 800;
 background-color : skyblue;
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: 2% 0;
`;

const Item = styled.div`
  display: flex;
  padding 1% 15%;
  text-align: start;
  justify-content: space-between;
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
    const listblock = await daytoblock(maxrent);
    await listNFT(
      collectionaddr,
      collattoken,
      tokenid,
      listblock,
      collatamount,
      parseInt(rentfee / listblock)
    );
  };

  return (
    <StyledList>
      <h3 class="text-center">Fill in the blank to list your NFT!</h3>
      <Items>
        <Item class="flex flex-row place-content-between">
          <div>컬렉션 주소를 입력해주세요.</div>
          <div>
            <input
              placeholder="Contract Address"
              onChange={onChangecolladdr}
            ></input>
          </div>
        </Item>
        <Item class="flex flex-row place-content-between">
          <div>토큰 ID를 입력해주세요.</div>
          <input placeholder="token id" onChange={onChangetokenid}></input>
        </Item>
        <Item class="flex flex-row place-content-between">
          <div>담보토큰 주소를 입력해주세요.</div>
          <input
            placeholder="Collateral token"
            onChange={onChangecollattoken}
          ></input>
        </Item>
        <Item class="flex flex-row place-content-between">
          <div>담보로 받을 토큰 양을 입력해주세요.</div>
          <input
            placeholder="Collateral Amount"
            onChange={onChangecollatamount}
          ></input>
        </Item>
        <Item class="flex flex-row place-content-between">
          <div>최대 담보 기간을 입력해주세요 </div>
          <input
            placeholder="Maxrent Duration"
            onChange={onChangemaxrent}
          ></input>
        </Item>
        <Item class="flex flex-row place-content-between">
          <div>일당 받을 렌탈료를 입력해주세요.</div>
          <input
            placeholder="Maxrent Duration"
            onChange={onChangerentfee}
          ></input>
        </Item>
      </Items>
      <Button onClick={() => approve(collectionaddr, tokenid)} text={"approve!"}></Button>
      <Button onClick={list} text={"List!"}></Button>
    </StyledList>
  );
}

export default List;
