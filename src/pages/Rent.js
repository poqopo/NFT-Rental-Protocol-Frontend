import { useState } from "react";
import { useLocation } from "react-router-dom";
import database from "../components/database";
import {rent, daytoblock} from "../utils/contract"

function Rent() {
    const[inputday, setInputday] = useState(0)

  const location = useLocation();
  const contractaddress = location.pathname.split("/")[1];
  const tokenid = location.pathname.split("/")[2];

  const item = database.find(
    (e) => e.CollectionAddress === contractaddress && e.TokenID === tokenid
  );

  const rentfee = item.Rentfeeperblock * inputday
  const total = parseInt(item.CollateralAmount) + rentfee

  const onChange = (e) => setInputday(e.target.value)

  async function rentNFT() {
    const rentblock = await daytoblock(inputday);
    await rent(item.CollectionAddress, item.TokenID, rentblock)
  }

  return (
    <div class="md:block m-32 ml-72 h-full bg-gray-300 bg-cover px-5 py-5">
      <div class="flex flex-row">
        <img class="px-10 max-w-sm " src={`../../${item.NFTimage}`} alt="Workflow" />
        <div class="flex flex-col space-y-10">
          <p>
            Collection Address : {item.Collectiontitle}, TokenID :{" "}
            {item.TokenID}
          </p>
          <p>HolderAddress : {item.HolderAddress}</p>
          <p>
            CollateralAmount : {item.CollateralAmount} {item.CollateralName}
          </p>
          <p>Daily rent fee : {item.Rentfeeperblock}</p>
          <p>Max Rent Duration : {item.maxRentduration}</p>
        </div>
      </div>
      <div class="h-20"></div>
      <div>
      <p class = "flex">Collateral amount : {item.CollateralAmount}</p>
      <p class = "flex">RentFee : {rentfee}</p>
      <p class = "flex">Total amount {total}</p>
      </div>

      <div class="h-20"></div>
      <div class="flex flex-row w full">
        <input
          type="text"
          id='"form-subscribe-Search'
          class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-1/3 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          placeholder="days"
          onChange={onChange}
        ></input>
        <button
          class="flex-initial ml-3 px-8 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
        onClick={rentNFT}
        >
          Rent
        </button>
      </div>
    </div>
  );
}

export default Rent;
