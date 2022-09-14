import { useEffect, useState } from "react";
import {
  getBlock,
  getname,
  modifyNFT,
  remaintime,
  rent,
} from "../Utils/contract";
import Button from "./Button,";
import Input from "./Input";
import SelectBox from "./SelectBox";

function Description({ type, itemdetail }) {
  const [inputday, setInputday] = useState(0);
  const [inputval, setInputval] = useState(0);
  const [block, setBlock] = useState(0);
  const [name, setName] = useState("");
  const [collat, setCollat] = useState(0);
  const onChange = (e) => setInputday(e.target.value);
  const collatchange = (e) => {
    console.log(e.target.value);
    setCollat(e.target.value);
  };
  const onChangeval = (e) => setInputval(e.target.value);
  
  console.log(collat);

  async function fetchblock() {
    try {
      setBlock(await getBlock());
    } catch (e) {
      console.log(e);
    }
  }

  async function fetchname() {
    try {
      setName(await getname(itemdetail.collateral_token));
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchblock();
    fetchname();
  }, [fetchblock, fetchname]);

  const OPTIONS = [
    { value: "0", name: "max rent duration" },
    { value: "1", name: "collateral amount" },
    { value: "2", name: "rent fee per block" },
  ];

  const currentAddress = window.klaytn.selectedAddress;
  if (type === "Rent") {
    return (
      <div>
        <p>
          이름 : {itemdetail.nft_name} #{itemdetail.token_id}
        </p>
        <p> 소유자 : {itemdetail.holder_account}</p>
        <p>
          {" "}
          담보 : {itemdetail.collateral_amount} {name}
        </p>
        <p>
          {" "}
          대여료(일당) : {itemdetail.rent_fee_per_block} {name}
        </p>
        <p> 최대 대여 일수 : {itemdetail.max_rent_duration} days</p>
        <p>
          총 대여료 :{" "}
          {parseInt(itemdetail.collateral_amount) +
            inputday * itemdetail.rent_fee_per_block}{" "}
          {name}
        </p>
        <Input onChange={onChange} placeholder="HellO!"></Input>
        <Button
          onClick={() =>
            rent(itemdetail.collection_address, itemdetail.token_id, inputday)
          }
          text={type}
        ></Button>
      </div>
    );
  } else if (type === "Kick") {
    return (
      <div>
        <p>
          이름 : {itemdetail.nft_name} #{itemdetail.token_id}
        </p>
        <p> 대여자 : {itemdetail.renter_accounts}</p>
        <p>
          {" "}
          담보 : {itemdetail.collateral_amount} {name}
        </p>
        <p>
          {" "}
          대여료(일당) : {itemdetail.rent_fee_per_block} {name}
        </p>
        <p> 대여 일수 : {itemdetail.max_rent_duration} days</p>
        <p> 대여 일자 : {itemdetail.rent_block} days</p>
        <p>
          총 대여료 :{" "}
          {parseInt(itemdetail.collateral_amount) +
            parseInt(itemdetail.rent_fee)}
        </p>
        <Button
          onClick={() =>
            rent(itemdetail.collection_address, itemdetail.token_id, inputday)
          }
          text={type}
        ></Button>
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
            <p>
              {" "}
              담보 : {itemdetail.collateral_amount} {name}
            </p>
            <p>
              {" "}
              대여료(일당) : {itemdetail.rent_fee_per_block} {name}
            </p>
            <p> 최대 대여 일수 : {itemdetail.max_rent_duration} days</p>
            <p>
              총 대여료 :{" "}
              {parseInt(itemdetail.collateral_amount) +
                inputday * itemdetail.rent_fee_per_block}
            </p>
            <SelectBox
              options={OPTIONS}
              defaultValue="0"
              handlechange={collatchange}
            ></SelectBox>
            <Input
              onChange={onChangeval}
              placeholder="값을 넣어주세요!"
            ></Input>
            <Button
              onClick={() =>
                modifyNFT(
                  itemdetail.collection_address,
                  itemdetail.token_id,
                  collat,
                  inputval
                )
              }
              text={"Modify"}
            ></Button>
            <Button
              onClick={() =>
                rent(
                  itemdetail.collection_address,
                  itemdetail.token_id,
                  inputday
                )
              }
              text={"CancelList"}
            ></Button>
          </div>
        ) : (
          <div>
            {itemdetail.holder_account === currentAddress ? (
              <div>
                <p>
                  이름 : {itemdetail.nft_name} #{itemdetail.token_id}
                </p>
                <p> 대여자 : {itemdetail.renter_accounts}</p>
                <p>
                  {" "}
                  담보 : {itemdetail.collateral_amount} {name}
                </p>
                <p>
                  {" "}
                  대여료(일당) : {itemdetail.rent_fee_per_block} {name}
                </p>
                <p> 대여 일수 : {itemdetail.max_rent_duration} days</p>
                <p> 대여 일자 : {itemdetail.rent_block}</p>
                <p>
                  총 대여료 :{" "}
                  {parseInt(itemdetail.collateral_amount) +
                    parseInt(itemdetail.rent_fee)}
                </p>
                {block - itemdetail.rent_block > itemdetail.rent_duration ? (
                  <Button text={"Withdraw!"}></Button>
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
                <p>
                  {" "}
                  담보 : {itemdetail.collateral_amount} {name}
                </p>
                <p>
                  {" "}
                  대여료(일당) : {itemdetail.rent_fee_per_block} {name}
                </p>
                <p> 대여 일수 : {itemdetail.max_rent_duration} days</p>
                <p> 대여 일자 : {itemdetail.rent_block} days</p>
                <p>
                  총 대여료 :{" "}
                  {parseInt(itemdetail.collateral_amount) +
                    parseInt(itemdetail.rent_fee)}
                </p>
                <Button text={"Return NFT!"} />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Description;
