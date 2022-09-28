import BigNumber from "bignumber.js";
import { useEffect, useState } from "react";
import {
  approve,
  approvecollat,
  Cancel,
  getAllowance,
  getBlock,
  getDecimal,
  getDelay,
  getname,
  kickNFT,
  modifyNFT,
  remaintime,
  rent,
  returnNFT,
  Withdraw,
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
  const [decimal, setDecimal] = useState(1);
  const [isApprove, setIsApprove] = useState(false);
  const [delay, setDelay] = useState();
  const onChange = (e) => setInputday(e.target.value);
  const collatchange = (e) => setCollat(e.target.value);
  const onChangeval = (e) => setInputval(e.target.value);
  const day = 60 * 60 * 24;

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

  async function fetchdecimal() {
    try {
      setDecimal(10 ** parseInt(await getDecimal(itemdetail.collateral_token)));
    } catch (e) {
      console.log(e);
    }
  }

  async function fetchDelay() {
    try {
      setDelay(parseInt(await getDelay(itemdetail.collateral_token)));
    } catch (e) {
      console.log(e);
    }
  }

  async function fetchallowance() {
    try {
      if ((await getAllowance(itemdetail.collateral_token)) > 1e18) {
        setIsApprove(true);
      }
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    fetchblock();
    fetchdecimal();
    fetchname();
    fetchallowance();
    fetchDelay();
  }, [fetchblock, fetchdecimal, fetchname, fetchallowance, fetchDelay]);

  const OPTIONS = [
    { value: undefined, name: "Choose options for modify", denominator: 0 },
    { value: 0, name: "max rent duration", denominator: day },
    { value: 1, name: "collateral amount", denominator: decimal },
    { value: 2, name: "rent fee per day", denominator: decimal / day },
  ];

  const currentAddress = window.klaytn.selectedAddress;
  if (type === "Rent") {
    return (
      <div>
        <p>Name : {itemdetail.nft_name} #{itemdetail.token_id}</p>
        <p> Owner : {itemdetail.holder_account}</p>
        <p>
          {" "}
          Collateral : {itemdetail.collateral_amount / decimal} {name}
        </p>
        <p>
          {" "}
          Rent fee(per day) :{" "}
          {Math.round((itemdetail.rent_fee_per_block * day) / decimal)} {name}
        </p>
        <p> Max Rent days : {itemdetail.max_rent_duration / day} days</p>
        <p>
          total Rent fee :{" "}
          {Math.round(
            (parseInt(itemdetail.collateral_amount) +
              inputday * day * parseInt(itemdetail.rent_fee_per_block)) /
              decimal
          )}{" "}
          {name}
        </p>
        {isApprove ? (
          <div>
            <Input onChange={onChange} placeholder="days"></Input>
            <Button
              onClick={() =>
                rent(
                  itemdetail.collection_address,
                  itemdetail.token_id,
                  inputday * day
                )
              }
              text={type}
            ></Button>
          </div>
        ) : (
          <Button
            onClick={() => approvecollat(itemdetail.collateral_token)}
            text="Approve"
          ></Button>
        )}
      </div>
    );
  } else if (type === "Kick") {
    return (
      <div>
        <p>Name : {itemdetail.nft_name} #{itemdetail.token_id}</p>
        <p> Renter : {itemdetail.renter_accounts}</p>
        <p>
          {" "}
          Collateral : {itemdetail.collateral_amount / decimal} {name}
        </p>
        <p>
          {" "}
          Rent fee(per day) : {(itemdetail.rent_fee_per_block * day) / decimal}{" "}
          {name}
        </p>
        <p> Rent days : {itemdetail.max_rent_duration / day} days</p>
        <p> Rent block : {itemdetail.rent_block} days</p>
        <p>
          total Rent fee :{" "}
          {(parseInt(itemdetail.collateral_amount) +
            parseInt(itemdetail.rent_fee)) /
            decimal}
        </p>

        {block - itemdetail.rent_block > itemdetail.rent_duration ? (
          <Button
            onClick={() =>
              kickNFT(itemdetail.collection_address, itemdetail.token_id)
            }
            text={"Kick!"}
          ></Button>
        ) : (
          <p>
            {remaintime(
              parseInt(itemdetail.rent_block) +
                parseInt(itemdetail.rent_duration) -
                block
            )}
          </p>
        )}
      </div>
    );
  } else if (type === "Mypage") {
    return (
      <div>
        {!itemdetail.renter_accounts ? (
          <div>
            <p>
              Name : {itemdetail.nft_name} #{itemdetail.token_id}
            </p>
            <p> Owner : {itemdetail.holder_account}</p>
            <p>
              {" "}
              Collateral :{" "}
              {Math.round((itemdetail.collateral_amount / decimal) * 100) /
                100}{" "}
              {name}
            </p>
            <p>
              {" "}
              Rent fee(per day) :{" "}
              {Math.round(
                ((itemdetail.rent_fee_per_block * day) / decimal) * 100
              ) / 100}{" "}
              {name}
            </p>
            <p> Max Rent days : {itemdetail.max_rent_duration / day} days</p>
            
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
                  Math.round(inputval * OPTIONS[Number(collat) + 1].denominator)
                )
              }
              text={"Modify"}
            ></Button>
            <Button
              onClick={() =>
                Cancel(itemdetail.collection_address, itemdetail.token_id)
              }
              text={"CancelList"}
            ></Button>
          </div>
        ) : (
          <div>
            {itemdetail.holder_account === currentAddress ? (
              <div>
                <p>Name : {itemdetail.nft_name} #{itemdetail.token_id}</p>
                <p> Renter : {itemdetail.renter_accounts}</p>
                <p>
                  {" "}
                  Collateral : {itemdetail.collateral_amount / decimal} {name}
                </p>
                <p>
                  {" "}
                  Rent fee(per day) :{" "}
                  {Math.round(
                    (itemdetail.rent_fee_per_block * day) / decimal
                  )}{" "}
                  {name}
                </p>
                <p> Rent days : {itemdetail.max_rent_duration / day} days</p>
                <p> Rent block : {itemdetail.rent_block}</p>
                <p>
                  total Rent fee :{" "}
                  {(parseInt(itemdetail.collateral_amount) +
                    parseInt(itemdetail.rent_fee)) /
                    decimal}
                </p>
                {block - itemdetail.rent_block > itemdetail.rent_duration ? (
                  <Button
                    onClick={() =>
                      Withdraw(
                        itemdetail.collection_address,
                        itemdetail.token_id
                      )
                    }
                    text={"Withdraw!"}
                  ></Button>
                ) : (
                  <p>
                    {remaintime(
                      parseInt(itemdetail.rent_block) +
                        parseInt(itemdetail.rent_duration) -
                        block +
                        delay
                    )}
                  </p>
                )}
              </div>
            ) : (
              <div>
                <p>Name : {itemdetail.nft_name} #{itemdetail.token_id}</p>
                <p> Renter : {itemdetail.renter_accounts}</p>
                <p>
                  {" "}
                  Collateral : {itemdetail.collateral_amount / decimal} {name}
                </p>
                <p>
                  {" "}
                  Rent fee(per day) :{" "}
                  {(itemdetail.rent_fee_per_block * day) / decimal} {name}
                </p>
                <p> Rent days : {itemdetail.max_rent_duration / day} days</p>
                <p> 대여 Block : {itemdetail.rent_block}</p>
                <p>
                  total Rent fee :{" "}
                  {(parseInt(itemdetail.collateral_amount) +
                    parseInt(itemdetail.rent_fee)) /
                    decimal}
                </p>
                <Button
                  onClick={() =>
                    approve(itemdetail.collection_address, itemdetail.token_id)
                  }
                  text={"approve!"}
                ></Button>
                <Button
                  onClick={() =>
                    returnNFT(
                      itemdetail.collection_address,
                      itemdetail.token_id
                    )
                  }
                  text={"Return NFT!"}
                />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Description;
