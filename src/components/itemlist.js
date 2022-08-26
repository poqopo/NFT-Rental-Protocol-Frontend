import { Link } from "react-router-dom";
import database from "./db/database";

function itemlist() {
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
          </div>
        ))}
    </div>
  );
}

export default itemlist;
