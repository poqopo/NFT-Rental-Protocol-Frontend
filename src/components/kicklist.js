import { Link } from "react-router-dom";
import database from "./database";
import { kickNFT } from "../utils/contract";

function kicklist() {
  return (
    <div class="grid grid-cols-3 justify-items-center px-5 py-5 gap-y-10">
        {database.map((info, index) => (
          <div class="w-3/4 bg-gray-500">
            <Link to = {`/${info.CollectionAddress}/${info.TokenID}/Rent`}>
              <img class="w-full" src={info.NFTimage} alt="Workflow" />
              <p>
                이름 : {info.Collectiontitle} {info.TokenID}
              </p>
              <p>
                담보금 : {info.CollateralAmount} {info.CollateralName}
              </p>
              <p>
                일당 렌탈료 : {info.Rentfeeperblock} {info.CollateralName}{" "}
              </p>
              <p>최대 담보기간 : {info.maxRentduration} days</p>
            </Link>
            <button 
          class="block m-auto px-8 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
          onClick={() => kickNFT(info.CollectionAddress, info.TokenID)}
        >
          Kick!
        </button>
          </div>
          
        ))}
    </div>
  );
}

export default kicklist;
