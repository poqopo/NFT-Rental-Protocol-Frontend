import styled from "styled-components";
import Input from "./Input";
import Button from "./Button";
import { useEffect, useState } from "react";
import {
  viewTokenapprove,
  viewTokenname,
  viewDecimal,
  tokenApprove,
  listNFT,
  modifyNFT,
  cancelList,
  rentNFT,
  returnNFT,
  withdrawCollat,
  kickNFT,
  viewNFTApprove,
  nftApprove,
  getBlock,
  getGracePeriod,
} from "../Utils/Contract";
import { Link, useParams } from "react-router-dom";
import Select from "react-select";
import BigNumber from "bignumber.js";
import Timer from "./Timer";

const StyledContents = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  & .form {
    margin-bottom: 10px;
    width: 100%;
  }
  & .rentinfo {
    width: 100%;
    height: 375px;
    display: flex;
    flex-direction: column;
    place-content: space-around;
  }
  & .Input {
    width: 50%;
  }
  & .info {
    font-size: 16px;
    font-weight: 500;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  a {
    color: black;
    text-decoration: none;
  }
  & .list {
    margin-top: 30px;
    width: 70%;
    display: grid;
    grid-auto-rows: auto;
    grid-gap: 10px;
  }
  & .item {
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-gap: 10px;
    place-content: center;
    text-align: center;
    font-size: 16px;
    font-weight: 500;
  }
`;

export default function Contents({ rentinfo, owner }) {
  const [active, setIsactive] = useState(false);
  const [nftactive, setnftActive] = useState(false);
  const [block, setBlock] = useState(2**256/10);
  const [grace_period, setGracePeriod] = useState();
  const [name, setName] = useState("");
  const [inputvalue, setInputvalue] = useState(0);
  const [inputdays, setInputdays] = useState(0);
  const [inputfee, setInputfee] = useState(0);
  const [decimal, setDecimal] = useState(1);
  const [selectedModify, setModifyOption] = useState(null);
  const [selectedCollat, setCollatOption] = useState(null);
  const params = useParams();

  const day = 60 * 60 * 24;
  const modifyOption = [
    { value: 0, label: "담보 토큰" },
    { value: 1, label: "최대 대여 기간", denominator: day },
    { value: 2, label: "담보 양", denominator: 10 ** decimal },
    { value: 3, label: "일당 대여료", denominator: 10 ** decimal },
  ];
  const collatOption = [
    { value: 0, label: "담보 토큰" },
    {
      value: "0x9466a45072E91ff5AbA7e084E5ea74531f09731a",
      label: "KUSDT",
      decimal: 10 ** 18,
    },
    { value: 2, label: "WKLAY" },
    { value: 3, label: "KUSDC" },
  ];

  

  const currentAddress = window.klaytn.selectedAddress
    ? window.klaytn.selectedAddress
    : "";

  async function getRentInfo() {
    setnftActive(await viewNFTApprove(params.collectionAddress));
    setIsactive((await viewTokenapprove(rentinfo.collateral_token)) > 0);
    setName(await viewTokenname(rentinfo.collateral_token));
    setDecimal(await viewDecimal(rentinfo.collateral_token));
  }

  async function getListInfo() {
    setnftActive(await viewNFTApprove(params.collectionAddress));
  }
  async function getBlockNumber() {
    setBlock(await getBlock())
    setGracePeriod(await getGracePeriod());
  }

  useEffect(() => {
    if (rentinfo.collateral_token !== undefined) {
      getRentInfo();
      getBlockNumber();
    } else {
      getListInfo();
    }
  }, [getRentInfo, getListInfo, getBlockNumber]);

  const inputChange = (e) => setInputvalue(e.target.value);
  const dayChange = (e) => setInputdays(e.target.value);
  const feeChange = (e) => setInputfee(e.target.value);
  return (
    <StyledContents>
      {rentinfo.lender_address ? (
        <div>
          <div className="info">
            <h3>대여 정보</h3>
            <Link to={`/user/${rentinfo.lender_address}`}>
              소유자 : {rentinfo.lender_address}
            </Link>
            <p href="/Home">
              담보 : {Math.round(rentinfo.collateral_amount / 10 ** decimal)}{" "}
              {name}
            </p>
            <p>
              최대 대여 기간 : {Math.round(rentinfo.maxrent_duration / day)}{" "}
              days
            </p>
            <p>
              대여료 :{" "}
              {Math.round((rentinfo.rent_fee_per_block * day) / 10 ** decimal)}{" "}
              {name} per day
            </p>
          </div>
          <div className="form">
            <div>
              {rentinfo.renter_address ? (
                <div className="info">
                  <p>대여자 : {rentinfo.renter_address}</p>
                  <p>
                    대여 기간 : {Math.round(rentinfo.rent_duration / day)} days
                    ( from {rentinfo.rent_block} )
                  </p>
                  {rentinfo.renter_address !== currentAddress ? (
                    rentinfo.lender_address !== currentAddress ? (

                      (block >=
                        Number(rentinfo.rent_block) +
                          Number(rentinfo.rent_duration) +
                          Number(grace_period) ? 
                          <Button
                          text={"Kick!"}
                          onClick={() =>
                            kickNFT(
                              rentinfo.collection_address,
                              rentinfo.token_id
                            )
                          }
                        ></Button>
                        :
                        <Timer block={block} rent_duration={rentinfo.rent_duration} rent_block={rentinfo.rent_block} grace_period={grace_period}/> )

                    ) : (
                      <Button
                        text={"Withdraw!"}
                        onClick={() =>
                          withdrawCollat(
                            rentinfo.collection_address,
                            rentinfo.token_id
                          )
                        }
                      ></Button>
                    )
                  ) : nftactive ? (
                    <Button
                      text={"Return!"}
                      onClick={() =>
                        returnNFT(
                          rentinfo.collection_address,
                          rentinfo.token_id
                        )
                      }
                    ></Button>
                  ) : (
                    <Button
                      text={"Approve!"}
                      onClick={() => nftApprove(params.collectionAddress)}
                    ></Button>
                  )}
                </div>
              ) : owner !== currentAddress ? (
                active === true ? (
                  <div className="info">
                    <p>
                      담보 :{" "}
                      {Math.round(rentinfo.collateral_amount / 10 ** decimal)}{" "}
                      token
                    </p>
                    <p>
                      대여료 :{" "}
                      {Math.round(
                        (rentinfo.rent_fee_per_block * day) / 10 ** decimal
                      )}{" "}
                      {name}
                    </p>
                    <p>
                      총 대여료 :{" "}
                      {Math.round(
                        rentinfo.collateral_amount / 10 ** decimal +
                          (rentinfo.rent_fee_per_block * day * inputvalue) /
                            10 ** decimal
                      )}{" "}
                      {name}
                    </p>
                    <div
                      style={{
                        width: "80%",
                        display: "grid",
                        gridTemplateColumns: "2fr 1fr",
                        gridGap: "10px",
                      }}
                    >
                      <Input
                        className="Input"
                        text={"Rent"}
                        onChange={inputChange}
                      />
                      <Button
                        text={"Rent!"}
                        onClick={() =>
                          rentNFT(
                            rentinfo.collection_address,
                            rentinfo.token_id,
                            inputvalue * day
                          )
                        }
                      />
                    </div>
                  </div>
                ) : (
                  <div className="info">
                    <p>Rent하기전에 먼저 approve를 해야합니다</p>
                    <Button
                      text={"Approve!"}
                      onClick={() => tokenApprove(rentinfo.collateral_token)}
                    />
                  </div>
                )
              ) : (
                <div className="info">
                  <div
                    style={{
                      width: "80%",
                      height: "200px",
                      display: "grid",
                      gridTemplateColumns: "1fr 2fr 1fr",
                      gridGap: "10px",
                      placeContent: "start",
                    }}
                  >
                    <Select
                      defaultValue={selectedModify}
                      onChange={setModifyOption}
                      options={modifyOption}
                    />
                    <Input
                      className="Input"
                      text={"Value"}
                      onChange={inputChange}
                    />
                    <Button
                      text={"Modify!"}
                      onClick={() =>
                        modifyNFT(
                          rentinfo.collection_address,
                          rentinfo.token_id,
                          selectedModify.value,
                          selectedModify.value === 0
                            ? inputvalue
                            : parseInt(inputvalue * selectedModify.denominator)
                        )
                      }
                    />
                    <Button
                      text={"CancelList!"}
                      onClick={() =>
                        cancelList(
                          rentinfo.collection_address,
                          rentinfo.token_id
                        )
                      }
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : owner === currentAddress ? (
        <div>
          <div className="info">
            <h3>아래 빈칸을 채운 후 List버튼을 눌러 NFT를 리스팅 하세요!</h3>
          </div>
          <div className="list">
            <div className="item">
              <Input
                className="Input"
                text={"담보로 잡을 토큰의 양"}
                onChange={inputChange}
              />{" "}
              <Select
                defaultValue={selectedCollat}
                onChange={setCollatOption}
                options={collatOption}
              />
            </div>
            <div className="item">
              <Input
                className="Input"
                text={"최대 대여 기간"}
                onChange={dayChange}
              />
              <p>days</p>
            </div>
            <div className="item">
              <Input
                className="Input"
                text={"일당 대여료"}
                onChange={feeChange}
              />
              <p>{selectedCollat ? selectedCollat.label : "tokens"}</p>
            </div>
            {nftactive ? (
              <Button
                style={{}}
                text={"List!"}
                onClick={() => {
                  listNFT(
                    params.collectionAddress,
                    params.token_id,
                    selectedCollat.value,
                    inputdays * day,
                    BigNumber(inputvalue * selectedCollat.decimal),
                    BigNumber(
                      parseInt((inputfee * selectedCollat.decimal) / day)
                    )
                  );
                }}
              ></Button>
            ) : (
              <Button
                text={"Approve!"}
                onClick={() => nftApprove(params.collectionAddress)}
              ></Button>
            )}
          </div>
        </div>
      ) : (
        <div className="info">
          <h3>아직 리스팅 되지 않은 NFT입니다.</h3>
          <h3>조금만 기다려 주세요</h3>
        </div>
      )}
    </StyledContents>
  );
}
