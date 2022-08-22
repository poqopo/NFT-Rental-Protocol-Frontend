import { Link, useLocation } from "react-router-dom";
import Mypagelist from "../components/mypagelist";

function Mypage() {
  const location = useLocation();
  const currentAddress = window.klaytn.selectedAddress;

  return (
    <div class="ml-72">
      <img
        class="m-auto w-1/3 h-1/3 mt-20 rounded-full"
        src="../../sampleimg.png"
        alt="Workflow"
      />
      <p class="w-full text-center font-bold">{currentAddress}</p>
      <Mypagelist />
    </div>
  );
}

export default Mypage;
