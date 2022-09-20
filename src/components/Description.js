import { useEffect, useState } from "react";
import {
  approve,
  approvecollat,
  Cancel,
  getAllowance,
  getBlock,
  getDecimal,
  getname,
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
  const onChange = (e) => setInputday(e.target.value);
  const collatchange = (e) => setCollat(e.target.value);
  const onChangeval = (e) => setInputval(e.target.value);

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
      setDecimal(await getDecimal(itemdetail.collateral_token));
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
  }, [fetchblock, fetchdecimal, fetchname, fetchallowance]);

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
          담보 : {itemdetail.collateral_amount / 10 ** decimal} {name}
        </p>
        <p>
          {" "}
          대여료(일당) :{" "}
          {Math.round(
            (itemdetail.rent_fee_per_block * 60 * 60 * 24) / 10 ** decimal
          )}{" "}
          {name}
        </p>
        <p>
          {" "}
          최대 대여 일수 : {itemdetail.max_rent_duration / 60 / 60 / 24} days
        </p>
        <p>
          총 대여료 :{" "}
          {Math.round(
            (parseInt(itemdetail.collateral_amount) +
              inputday *
                60 *
                60 *
                24 *
                parseInt(itemdetail.rent_fee_per_block)) /
              10 ** decimal
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
                  inputday * 60 * 60 * 24
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
        {!itemdetail.renter_accounts ? (
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
                Cancel(
                  itemdetail.collection_address,
                  itemdetail.token_id
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
                  <Button onClick={() => Withdraw(itemdetail.collection_address, itemdetail.token_id) } text={"Withdraw!"}></Button>
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
                <p> 대여 Block : {itemdetail.rent_block}</p>
                <p>
                  총 대여료 :{" "}
                  {parseInt(itemdetail.collateral_amount) +
                    parseInt(itemdetail.rent_fee)}
                </p>
                <Button onClick={() => approve(itemdetail.collection_address, itemdetail.token_id)} text={"approve!"}></Button>
                <Button onClick={() => returnNFT(itemdetail.collection_address, itemdetail.token_id)} text={"Return NFT!"} />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Description;
