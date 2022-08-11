import Caver from "caver-js";
import rentjson from "./RentERC721.json"


const caver = new Caver(window.klaytn)
const rentcontract = new caver.klay.Contract(rentjson.abi, "0x77A625ED63240c514b4fBBC9A2Bae971f4C58942")

export async function rent(collection, tokenid, rentduration){
    try {
        await rentcontract.methods.rent(collection, tokenid, rentduration)
        .send({
          from: window.klaytn.selectedAddress,
          gas: 3000000
        })
    } catch(e) {console.log(e)} 
}

export async function daytoblock(day){
    return day * 60*60*24
}