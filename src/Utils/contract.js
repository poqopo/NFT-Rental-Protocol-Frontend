import Caver from "caver-js";
import rentjson from "./RentERC721.json";
import erc721json from "./ERC721.json";
import erc20json from "./ERC20.json";
import dotenv from "dotenv";
import BigNumber from "bignumber.js";
dotenv.config();

const caver = new Caver(window.klaytn);
const rentcontract = new caver.klay.Contract(
  rentjson.abi,
  process.env.REACT_APP_contract_address
);
export const MAX_UNIT = (2 ** 256 - 1) / 10;

export async function approve(collection, tokenid) {
  try {
    const collection_address = new caver.klay.Contract(
      erc721json.abi,
      collection
    );
    await collection_address.methods
      .approve(rentcontract._address, tokenid)
      .send({
        from: window.klaytn.selectedAddress,
        gas: 3000000,
      });
  } catch (e) {
    console.log(e);
  }
}
export async function approvecollat(collection) {
  try {
    const collection_address = new caver.klay.Contract(
      erc20json.abi,
      collection
    );
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

export async function rent(collection, tokenid, rentduration) {
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

export async function listNFT(
  collection,
  collat,
  tokenid,
  maxrentduration,
  collatamount,
  rentfeeperblock
) {
  try {
    await rentcontract.methods
      .listNFT(
        collection,
        collat,
        tokenid,
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

export async function Withdraw(collection, tokenid) {
  try {
    await rentcontract.methods.withdrawcollateral(collection, tokenid).send({
      from: window.klaytn.selectedAddress,
      gas: 3000000,
    });
  } catch (e) {
    console.log(e);
  }
}

export async function Cancel(collection, tokenid) {
  try {
    await rentcontract.methods.cancellist(collection, tokenid).send({
      from: window.klaytn.selectedAddress,
      gas: 3000000,
    });
  } catch (e) {
    console.log(e);
  }
}

export async function modifyNFT(collection, token_id, index, value) {
  try {
    await rentcontract.methods
      .modifylist(collection, token_id, [index], [BigNumber(value)])
      .send({
        from: window.klaytn.selectedAddress,
        gas: 3000000,
      });
  } catch (e) {
    console.log(e);
  }
}

export async function getBlock() {
  try {
    return await caver.klay.getBlockNumber();
  } catch (e) {
    console.log(e);
  }
}

export async function daytoblock(day) {
  return day * 60 * 60 * 24;
}

export async function blocktoday(block) {
  return block / 60 / 60 / 24;
}

export function remaintime(block) {
  const day = parseInt(block / 60 / 60 / 24);
  block = block - day * 60 * 60 * 24;
  const hour = parseInt(block / 60 / 60);
  block = block - hour * 60 * 60;
  const min = parseInt(block / 60);

  return (
    <p>
      만료까지 {day}일 {hour}시간 {min}분 남았습니다.
    </p>
  );
}

export async function getname(collateral_address) {
  const contract = new caver.klay.Contract(erc20json.abi, collateral_address);
  return await contract.methods.symbol().call();
}

export async function getDecimal(collateral_address) {
  const contract = new caver.klay.Contract(erc20json.abi, collateral_address);
  return await contract.methods.decimals().call();
}

export async function getDelay() {
  return await rentcontract.methods.execution_delay().call();
}

export async function getAllowance(collateral_address) {
  const contract = new caver.klay.Contract(erc20json.abi, collateral_address);
  return await contract.methods
    .allowance(window.klaytn.selectedAddress, rentcontract._address)
    .call();
}
