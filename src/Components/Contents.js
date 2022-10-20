  import styled from "styled-components";
  import Input from "./Input";
  import Button from "./Button";

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
      color : black;
      text-decoration : none;
    }
  `;

  export default function Contents({ rentinfo }) {
    const currentAddress = window.klaytn.selectedAddress
      ? window.klaytn.selectedAddress
      : "";

    return (
      <StyledContents>
        <div className="info">
          <h3>대여 정보</h3>
          <p href="/user">소유자 : {rentinfo.lender_address}</p>
          <p href="/Home">담보 : {rentinfo.collateral_amount} token</p>
          <p>최대 대여 기간 : {rentinfo.maxrent_duration} days</p>
          <p>대여료 : {rentinfo.rent_fee_per_block} token per 블록</p>
        </div>
        <div className="form">
          <div>
          {rentinfo.renter_address ? (
            <div className="info">
              <p>대여자 : {rentinfo.renter_address}</p>
              <p>
                대여 기간 : {rentinfo.rent_duration} days ( from {rentinfo.rent_block} )
              </p>
              {rentinfo.renter_address !== currentAddress ? (
                rentinfo.lender_address !== currentAddress ? (
                  <Button text={"Kick!"}></Button>
                ) : (
                  <Button text={"Withdraw!"}></Button>
                )
              ) : (
                <Button text={"Return!"}></Button>
              )}
            </div>
          ) : rentinfo.lender_address !== currentAddress ? (
            <div className="info">
              <p >담보 : {rentinfo.collateral_amount} token</p>
              <p>대여료 : 1000 KUSDT</p>
              <p>총 대여료 : 2000 KUSDT</p>
              <div style={{ width : "80%",display : "grid", gridTemplateColumns : "2fr 1fr", gridGap :"10px"}}>
                <Input className="Input" text={"Rent"} />
                <Button text={"Rent!"}/>
              </div>
            </div>
          ) : (
            <div className="info">
              <p>Select Box</p>
              <div style={{ width : "80%",display : "grid", gridTemplateColumns : "2fr 1fr", gridGap :"10px"}}>
                <Input className="Input" text={"Modify"}/>
                <Button text={"Modify!"}/>
                <Button text={"CancelList!"}/>
              </div>
            </div>
          )}
          </div>
        </div>
      </StyledContents>
    );
  }
