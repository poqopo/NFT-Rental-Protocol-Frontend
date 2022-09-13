import Caver from "caver-js";
import rentjson from "./RentERC721.json"
import erc721json from "./ERC721.json"
import erc20json from "./ERC20.json"


const caver = new Caver(window.klaytn)
const rentcontract = new caver.klay.Contract(rentjson.abi, "0x208291a2279882Cb6aC238977735eddd5d6e283C")


export async function approve(collection, tokenid){
    try {
        const collection_address = new caver.klay.Contract(erc721json.abi, collection)
        await collection_address.methods.approve(rentcontract._address, tokenid)
        .send({
          from: window.klaytn.selectedAddress,
          gas: 3000000
        })
    } catch(e) {console.log(e)} 
}

export async function rent(collection, tokenid, rentduration){
    try {
        await rentcontract.methods.rent(collection, tokenid, rentduration)
        .send({
          from: window.klaytn.selectedAddress,
          gas: 3000000
        })
    } catch(e) {console.log(e)} 
}

export async function listNFT(collection, collat, tokenid, maxrentduration, collatamount, rentfeeperblock){
    try {
        await rentcontract.methods.listNFT(collection, collat, tokenid, maxrentduration, collatamount, rentfeeperblock)
        .send({
          from: window.klaytn.selectedAddress,
          gas: 3000000
        })
    } catch(e) {console.log(e)} 
}

export async function kickNFT(collection, tokenid){
    try {
        await rentcontract.methods.kick(collection, tokenid)
        .send({
          from: window.klaytn.selectedAddress,
          gas: 3000000
        })
    } catch(e) {console.log(e)} 
}


export async function modifyNFT(index, value, collection, token_id) {
    try {
        await rentcontract.methods.modifylist(collection, token_id, [index], [value])
        .send({
          from: window.klaytn.selectedAddress,
          gas: 3000000
        })
    } catch(e) {console.log(e)} 
}

export async function getBlock() {
    try {
        return await caver.klay.getBlockNumber()
    } catch (e) {console.log(e)}
}



export async function daytoblock(day){
    return day * 60*60*24
}

export async function blocktoday(block){
    return block /60 /60 /24
}

export function remaintime(block) {
    const day = parseInt(block / 60 / 60 / 24);
    block = block - day * 60 * 60 * 24 
    const hour = parseInt(block / 60 / 60);
    block = block - hour * 60 * 60
    const min = parseInt(block / 60);

    return (
      <p>
        만료까지 {day}일 {hour}시간 {min}분 남았습니다.
      </p>
    );
}

export async function getname(collateral_address) {
  const contract = new caver.klay.Contract(erc20json.abi, collateral_address)
  return (await contract.methods.symbol().call())
}

export function getImage(url) {
  if (url.startsWith("ipfs://")) {
    return "https://ipfs.io/ipfs/" + url.split("ipfs://")[1]
 } else return url
}