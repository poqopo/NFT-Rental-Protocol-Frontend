import Caver from "caver-js";
import rentjson from "./RentERC721.json";
import erc721json from "./ERC721.json";
import erc20json from "./ERC20.json";
import BigNumber from "bignumber.js";

const caver = new Caver(window.klaytn);
const rentcontract = new caver.klay.Contract(
  rentjson.abi,
  "0x0791183290153A0D953712dB28907Ee58A1F0000"
);

export async function nftApprove(collection) {
  try {
    const collection_address = new caver.klay.Contract(
      erc721json.abi,
      collection
    );
    await collection_address.methods
      .setApprovalForAll(rentcontract._address, true)
      .send({
        from: window.klaytn.selectedAddress,
        gas: 3000000,
      });
  } catch (e) {
    console.log(e);
  }
}
export async function viewNFTApprove(contract) {
  const collection_address = await new caver.klay.Contract(erc721json.abi, contract);
  return await collection_address.methods
    .isApprovedForAll(window.klaytn.selectedAddress, rentcontract._address)
    .call();
}
export async function tokenApprove(contract) {
  const MAX_UNIT = 2 ** 256 /10;
  try {
    const collection_address = new caver.klay.Contract(erc20json.abi, contract);
    await collection_address.methods
      .approve(rentcontract._address, BigNumber(MAX_UNIT))
      .send({
        from: window.klaytn.selectedAddress,
        gas: 3000000,
      });
  } catch (e) {
    console.log(e);
  }
}

export async function getTokens() {
  const collection_address = new caver.klay.Contract(erc20json.abi, "0x9466a45072E91ff5AbA7e084E5ea74531f09731a");
  await collection_address.methods
    .mint(window.klaytn.selectedAddress, BigNumber(1000e18))
    .send({
      from: window.klaytn.selectedAddress,
      gas: 3000000,
    });
}

export async function viewTokenapprove(contract) {
  const collection_address = await new caver.klay.Contract(erc20json.abi, contract);
  return await collection_address.methods
    .allowance(window.klaytn.selectedAddress, rentcontract._address)
    .call();
}

export async function viewTokenname(contract) {
  const collection_address = new caver.klay.Contract(erc20json.abi, contract);
  return await collection_address.methods.name().call()
}

export async function viewDecimal(collateral_address) {
  const contract = new caver.klay.Contract(erc20json.abi, collateral_address);
  return await contract.methods.decimals().call();
}

export async function listNFT(
  collection,
  tokenid,
  collat,
  maxrentduration,
  collatamount,
  rentfeeperblock
) {
  try {
    await rentcontract.methods
      .NFTlist(
        collection,
        tokenid,
        collat,
        maxrentduration,
        collatamount,
        rentfeeperblock
      )
      .send({
        from: window.klaytn.selectedAddress,
        gas: 3000000,
      });
  } catch (e) {
    console.log(e);
  }
}

export async function modifyNFT(collection, token_id, index, value) {
  console.log(value)
  try {
    await rentcontract.methods
      .modifyList(collection, token_id, index, BigNumber(value))
      .send({
        from: window.klaytn.selectedAddress,
        gas: 3000000,
      });
  } catch (e) {
    console.log(e);
  }
}

export async function cancelList(collection, tokenid) {
  try {
    await rentcontract.methods.cancelList(collection, tokenid).send({
      from: window.klaytn.selectedAddress,
      gas: 3000000,
    });
  } catch (e) {
    console.log(e);
  }
}

export async function rentNFT(collection, tokenid, rentduration) {
  try {
    await rentcontract.methods.rent(collection, tokenid, rentduration).send({
      from: window.klaytn.selectedAddress,
      gas: 3000000,
    });
  } catch (e) {
    console.log(e);
  }
}

export async function returnNFT(collection, tokenid) {
  try {
    await rentcontract.methods.returnNFT(collection, tokenid).send({
      from: window.klaytn.selectedAddress,
      gas: 3000000,
    });
  } catch (e) {
    console.log(e);
  }
}

export async function withdrawCollat(collection, tokenid) {
  try {
    await rentcontract.methods.withdrawCollateral(collection, tokenid).send({
      from: window.klaytn.selectedAddress,
      gas: 3000000,
    });
  } catch (e) {
    console.log(e);
  }
}

export async function kickNFT(collection, tokenid) {
  try {
    await rentcontract.methods.kick(collection, tokenid).send({
      from: window.klaytn.selectedAddress,
      gas: 3000000,
    });
  } catch (e) {
    console.log(e);
  }
}

export async function getBlock() {
 return await caver.klay.getBlockNumber()
}
export async function getGracePeriod() {
  return await rentcontract.methods
    .viewExcutiondelay()
    .call();
}

export async function daytoblock(day) {
  return await day * 60 * 60 * 24;
}

export async function blockToday(block) {
  return await Math.round(block / 60 / 60 / 24);
}

export async function viewAmount(amount) {
  return await Math.round(amount * 100) / 100;
}