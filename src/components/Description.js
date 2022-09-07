import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { daytoblock, getBlock, getname, remaintime, rent } from "../Utils/contract";

function Description({ type, itemdetail }) {
  const [inputday, setInputday] = useState(0);
  const [block, setBlock] = useState(0);
  const [name, setName] = useState("")
  const onChange = (e) => setInputday(e.target.value);

  async function fetchblock() {
    try {
      setBlock(await getBlock());
    } catch (e) {
      console.log(e);
    }
  }

  async function fetchname() {
    try {
      setName(await getname(itemdetail.collateral_token))
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchblock();
    fetchname();
  }, [fetchblock, fetchname]);

  const currentAddress = window.klaytn.selectedAddress;
  if (type === "Rent") {
    return (
      <div>
        <p>
          이름 : {itemdetail.nft_name} #{itemdetail.token_id}
        </p>
        <p> 소유자 : {itemdetail.holder_account}</p>
        <p> 담보 : {itemdetail.collateral_amount} {name}</p>
        <p> 대여료(일당) : {itemdetail.rent_fee_per_block} {name}</p>
        <p> 최대 대여 일수 : {itemdetail.max_rent_duration} days</p>
        <p>
          총 대여료 :{" "}
          {parseInt(itemdetail.collateral_amount) +
            inputday * itemdetail.rent_fee_per_block} {name}
        </p>
        <input onChange={onChange} placeholder="HellO!"></input>
        <button
          onClick={() =>
            rent(itemdetail.collection_address, itemdetail.token_id, inputday)
          }
        >
          {type}!
        </button>
      </div>
    );
  } else if (type === "Kick") {
    return (
      <div>
        <p>
          이름 : {itemdetail.nft_name} #{itemdetail.token_id}
        </p>
        <p> 대여자 : {itemdetail.renter_accounts}</p>
        <p> 담보 : {itemdetail.collateral_amount} {name}</p>
        <p> 대여료(일당) : {itemdetail.rent_fee_per_block} {name}</p>
        <p> 대여 일수 : {itemdetail.max_rent_duration} days</p>
        <p> 대여 일자 : {itemdetail.rent_block} days</p>
        <p>
          총 대여료 :{" "}
          {parseInt(itemdetail.collateral_amount) +
            parseInt(itemdetail.rent_fee)}
        </p>
        <button
          onClick={() =>
            rent(itemdetail.collection_address, itemdetail.token_id, inputday)
          }
        >
          {type}!
        </button>
      </div>
    );
  } else if (type === "Mypage") {
    return (
      <div>
        {itemdetail.renter_accounts === undefined ? (
          <div>
            <p>
              이름 : {itemdetail.nft_name} #{itemdetail.token_id}
            </p>
            <p> 소유자 : {itemdetail.holder_account}</p>
            <p> 담보 : {itemdetail.collateral_amount} {name}</p>
            <p> 대여료(일당) : {itemdetail.rent_fee_per_block} {name}</p>
            <p> 최대 대여 일수 : {itemdetail.max_rent_duration} days</p>
            <p>
              총 대여료 :{" "}
              {parseInt(itemdetail.collateral_amount) +
                inputday * itemdetail.rent_fee_per_block}
            </p>
            <input onChange={onChange} placeholder="HellO!"></input>
            <button
              onClick={() =>
                rent(
                  itemdetail.collection_address,
                  itemdetail.token_id,
                  inputday
                )
              }
            >
              Modify!
            </button>
            <button
              onClick={() =>
                rent(
                  itemdetail.collection_address,
                  itemdetail.token_id,
                  inputday
                )
              }
            >
              Cancellist!
            </button>
          </div>
        ) : (
          <div>
            {itemdetail.holder_account === currentAddress ? (
              <div>
                <p>
                  이름 : {itemdetail.nft_name} #{itemdetail.token_id}
                </p>
                <p> 대여자 : {itemdetail.renter_accounts}</p>
                <p> 담보 : {itemdetail.collateral_amount} {name}</p>
                <p> 대여료(일당) : {itemdetail.rent_fee_per_block} {name}</p>
                <p> 대여 일수 : {itemdetail.max_rent_duration} days</p>
                <p> 대여 일자 : {itemdetail.rent_block}</p>
                <p>
                  총 대여료 :{" "}
                  {parseInt(itemdetail.collateral_amount) +
                    parseInt(itemdetail.rent_fee)}
                </p>
                {block - itemdetail.rent_block > itemdetail.rent_duration ? (
                  <button>withdraw!</button>
                ) : (
                  <p>
                    {remaintime(
                      itemdetail.rent_block + itemdetail.rent_duration - block
                    )}
                  </p>
                )}
              </div>
            ) : (
              <div>
                <p>
                  이름 : {itemdetail.nft_name} #{itemdetail.token_id}
                </p>
                <p> 대여자 : {itemdetail.renter_accounts}</p>
                <p> 담보 : {itemdetail.collateral_amount} {name}</p>
                <p> 대여료(일당) : {itemdetail.rent_fee_per_block} {name}</p>
                <p> 대여 일수 : {itemdetail.max_rent_duration} days</p>
                <p> 대여 일자 : {itemdetail.rent_block} days</p>
                <p>
                  총 대여료 :{" "}
                  {parseInt(itemdetail.collateral_amount) +
                    parseInt(itemdetail.rent_fee)}
                </p>
                <button>Return NFT!</button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Description;
