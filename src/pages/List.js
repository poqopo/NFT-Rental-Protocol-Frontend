import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();
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

  return (
    <div class="md:block m-32 ml-72 h-full bg-gray-300 bg-cover px-5 py-5">
      <p class="text-center">Fill in the blank to list your NFT!</p>
      <div class="flex flex-col space-y-10 py-10">
        <div class="flex flex-row">
          <p>Collection Address : </p>
          <input
            placeholder="Contract Address"
            onChange={onChangecolladdr}
          ></input>
        </div>
        <div class="flex flex-row">
          <p>token id : </p>
          <input placeholder="token id" onChange={onChangetokenid}></input>
        </div>
        <div class="flex flex-row">
          <p>Collateral token : </p>
          <input
            placeholder="Collateral token"
            onChange={onChangecollattoken}
          ></input>
        </div>
        <div class="flex flex-row">
          <p>Collateral Amount : </p>
          <input
            placeholder="Collateral Amount"
            onChange={onChangecollatamount}
          ></input>
        </div>
        <div class="flex flex-row">
          <p>Maxrent Duration : </p>
          <input
            placeholder="Maxrent Duration"
            onChange={onChangemaxrent}
          ></input>
        </div>
        <div class="flex flex-row">
          <p>rentfee per day : </p>
          <input
            placeholder="Maxrent Duration"
            onChange={onChangerentfee}
          ></input>
        </div>
      </div>
        <button class="block m-auto px-8 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200">
          Rent
        </button>
    </div>
  );
}

export default Home;
