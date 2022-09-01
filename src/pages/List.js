import { Link } from "react-router-dom";
import Itemlist from "../components/itemlist";

function Home() {
  return (
    <div class="ml-72">
      <div class="flex py-20 w-full h-1/3 place-content-center ">
        <div class="flex flex-row w-1/2 px-5 py-8 bg-gray-300">
          <p class="w-3/4">
            Do you want to list your NFT for addtional profit? 
            click the green button!
          </p>
            <Link to="/list" class="flex w-1/4 bg-green-200 place-content-center items-center ">
              <p>list NFT</p>
            </Link>
        </div>
      </div>
      <div class="mr-5 h-full bg-gray-300 bg-cover px-5 py-5">
        <Itemlist></Itemlist>
      </div>
    </div>
  );
}

export default Home;
