import { Link, useLocation } from "react-router-dom";
import Itemlist from "../components/itemlist";

function Home() {
  const location = useLocation();
  console.log(location);

  return (
    <div class="ml-72">
      <div class="mr-5 h-full bg-gray-300 px-5 py-5">
        
      </div>
    </div>
  );
}

export default Home;
