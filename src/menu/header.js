import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";

function Header() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(
    window.klaytn ? window.klaytn.selectedAddress : undefined
  );

  useEffect(() => {
        
    const onLoad = async () => {
        console.log("onLoad current Address : ", currentAddress);
        if (currentAddress) {
            setIsWalletConnected(true);
            setCurrentAddress(currentAddress);
        }
    };
    // load eventlistner 추가해서
    // 문서내 모든 컨텐츠가 load되면
    // current address 바꿔주고 isWalletConnected를 True로 바꿔줌
    window.addEventListener("load", onLoad);

    // accountChange EventListner
    //   -> 지갑주소 undefined 됐을때 대비 갱신
    if (window.klaytn) {
        window.klaytn.on("accountsChanged", async function (accounts) {
            
            console.log(
                "account change listned in header : ",
                currentAddress,
                " -> ",
                accounts[0]
            );

            await setCurrentAddress(accounts[0]);
            await setIsWalletConnected(true);
        });
    }
    return () => window.removeEventListener("load", onLoad);
}, []);


  async function connectKaikas() {
    const response = await window.klaytn.enable();
    console.log("connect Click : ", response);
    setCurrentAddress(response[0]);
    setIsWalletConnected(true);
    return window.klaytn.selectedAddress;
  }


  return (
    <nav class="bg-white dark:bg-gray-800  shadow py-5 ">
      <div class="max-w-full mx-auto px-8">
        <div class="flex items-center justify-between">
          <div class=" flex items-center w-2/3">
            <a class="flex-shrink-0" href="/Home">
              <img class="h-8 w-8" src="/logo512.png" alt="Workflow" />
            </a>
            <div class="md:block ml-8 w-3/4">
              <form class="flex flex-row w full">
                <input
                  type="text"
                  id='"form-subscribe-Search'
                  class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="components"
                ></input>
                <button
                  class="flex-initial ml-3 px-8 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                  type="submit"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
          <div class="md:block w-1/3">
            <div class="px-8 flex items-baseline justify-between space-x-4">
              <a
                class="text-gray-300 hover:text-gray-800 px-3 py-2 rounded-md text-md font-medium"
                href="/Home"
              >
                Home
              </a>
              <a
                class="text-gray-300 hover:text-gray-800 px-3 py-2 rounded-md text-md font-medium"
                href="/Kick"
              >
                Kick
              </a>
              <button
                  class="flex-initial ml-3 px-8 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                  onClick={isWalletConnected ? () => "" : connectKaikas}
                >
                  {isWalletConnected ? 
                  <Link to = {`/mypage/${currentAddress}`}>
                    {currentAddress.slice(0,10)}
                  </Link> : "Connect"}
                </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
