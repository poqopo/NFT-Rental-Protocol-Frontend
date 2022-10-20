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
} from "../Utils/Contract";
import { Link } from "react-router-dom";
import Select from "react-select";

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
    line-height: 1.5;
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
    grid-gap : 10px;
    place-content: center;
    text-align: center;
    font-size: 16px;
    font-weight: 500;
  }
`;

export default function Contents({ rentinfo }) {
  const [active, setIsactive] = useState(false);
  const [name, setName] = useState("");
  const [inputvalue, setInputvalue] = useState(0);
  const [inputdays, setInputdays] = useState(0);
  const [inputfee, setInputfee] = useState(0);
  const [collat, setCollat] = useState("");
  const [decimal, setDecimal] = useState(1);
  const [selectedModify, setModifyOption] = useState(null);
  const [selectedCollat, setCollatOption] = useState(null);

  const day = 60 * 60 * 24;
  const modifyOption = [
    { value: undefined, label: "OPTIONS", denominator: 0 },
    { value: 0, label: "최대 대여 기간", denominator: day },
    { value: 1, label: "담보 양", denominator: decimal },
    { value: 2, label: "일당 대여료", denominator: decimal / day },
  ];
  const collatOption = [
    { value: undefined, label: "담보 토큰" },
    { value: 1, label: "KUSDT" },
    { value: 2, label: "WKLAY" },
    { value: 3, label: "KUSDC" },
  ];

  const currentAddress = window.klaytn.selectedAddress
    ? window.klaytn.selectedAddress
    : "";

  async function getInfo() {
    const here = await viewTokenapprove(rentinfo.collateral_token);
    setIsactive(here > 0);
    setName(await viewTokenname(rentinfo.collateral_token));
    setDecimal(await viewDecimal(rentinfo.collateral_token));
  }

  useEffect(() => {
    if (rentinfo.collateral_token !== undefined) {
      getInfo();
    }
  }, [rentinfo]);

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
              대여료 : {Math.round(rentinfo.rent_fee_per_block / 10 ** decimal)}{" "}
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
                      <Button
                        text={"Kick!"}
                        onClick={() =>
                          kickNFT(
                            rentinfo.collection_address,
                            rentinfo.token_id
                          )
                        }
                      ></Button>
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
                  ) : (
                    <Button
                      text={"Return!"}
                      onClick={() =>
                        returnNFT(
                          rentinfo.collection_address,
                          rentinfo.token_id
                        )
                      }
                    ></Button>
                  )}
                </div>
              ) : rentinfo.lender_address !== currentAddress ? (
                active === true ? (
                  <div className="info">
                    <p>
                      담보 :{" "}
                      {Math.round(rentinfo.collateral_amount / 10 ** decimal)}{" "}
                      token
                    </p>
                    <p>
                      대여료 : {inputvalue} {name}
                    </p>
                    <p>
                      총 대여료 :{" "}
                      {parseInt(inputvalue) +
                        Math.round(
                          rentinfo.collateral_amount / 10 ** decimal
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
                            inputvalue
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
                      display: "grid",
                      gridTemplateColumns: "1fr 2fr 1fr",
                      gridGap: "10px",
                    }}
                  >
                    <Select
                      defaultValue={selectedModify}
                      onChange={setModifyOption}
                      options={modifyOption}
                    />
                    <Input
                      className="Input"
                      text={"Modify"}
                      onChange={inputChange}
                    />
                    <Button
                      text={"Modify!"}
                      onClick={() =>
                        modifyNFT(
                          rentinfo.collection_address,
                          rentinfo.token_id,
                          1,
                          inputvalue
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
      ) : (
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
              <p>{selectedCollat? selectedCollat.label : "tokens"}</p>
            </div>
            <Button
              style={{}}
              text={"List!"}
              onClick={() =>
                listNFT(
                  rentinfo.collection_address,
                  rentinfo.token_id,
                  selectedCollat.address,
                  inputdays,
                  inputvalue,
                  inputfee
                )
              }
            ></Button>
          </div>
        </div>
      )}
    </StyledContents>
  );
}
