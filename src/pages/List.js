import { useState } from "react";
import { daytoblock, listNFT, approve } from "../utils/contract";

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
    await listNFT(collectionaddr, collattoken, tokenid, listblock, collatamount, parseInt(rentfee / listblock))
  }

  return (
    <div class="md:block m-auto w-1/3 h-full bg-gray-300 bg-cover px-5 py-5">
      <p class="text-center">Fill in the blank to list your NFT!</p>
      <div class="flex flex-col space-y-10 py-10">
        <div class="flex flex-row place-content-between">
          <p>컬렉션 주소를 입력해주세요.</p>
          <input
            placeholder="Contract Address"
            onChange={onChangecolladdr}
          ></input>
        </div>
        <div class="flex flex-row place-content-between">
          <p>토큰 ID를 입력해주세요.</p>
          <input placeholder="token id" onChange={onChangetokenid}></input>
        </div>
        <div class="flex flex-row place-content-between">
          <p>담보토큰 주소를 입력해주세요.</p>
          <input
            placeholder="Collateral token"
            onChange={onChangecollattoken}
          ></input>
        </div>
        <div class="flex flex-row place-content-between">
          <p>담보로 받을 토큰 양을 입력해주세요.</p>
          <input
            placeholder="Collateral Amount"
            onChange={onChangecollatamount}
          ></input>
        </div>
        <div class="flex flex-row place-content-between">
          <p>최대 담보 기간을 입력해주세요 </p>
          <input
            placeholder="Maxrent Duration"
            onChange={onChangemaxrent}
          ></input>
        </div>
        <div class="flex flex-row place-content-between">
          <p>일당 받을 렌탈료를 입력해주세요.</p>
          <input
            placeholder="Maxrent Duration"
            onChange={onChangerentfee}
          ></input>
        </div>
      </div>
        <button 
          class="block m-auto px-8 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
          onClick={() => approve(collectionaddr, tokenid)}
        >
          approve!
        </button>
        <button 
          class="block m-auto px-8 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
          onClick={list}
        >
          List!
        </button>
    </div>
  );
}

export default List;
