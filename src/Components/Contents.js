import styled from "styled-components";
import Input from "./Input";
import Button from "./Button";

const StyledContents = styled.div`
  width: 100%;
  height: 100%;
  padding-left : 72px;
`;

export default function Contents({ rentinfo }) {
  const currentAddress = window.klaytn.selectedAddress
    ? window.klaytn.selectedAddress
    : "";

  return (
    <StyledContents>
    <p>소유자 : {rentinfo.lender_address}</p>
    <p>담보 : {rentinfo.collateral_amount} token</p>
    <p>최대 대여 기간 : {rentinfo.max_rent_duration}</p>
    <p>대여료 : {rentinfo.rent_fee_per_block}/블록</p>
      {rentinfo.renter_address ? (
        <div>
        <p>대여자 : {rentinfo.renter_address}</p>
        <p>대여 기간 : {rentinfo.rent_duration} from {rentinfo.rent_block}</p>
        {rentinfo.renter_address != currentAddress ? (
          rentinfo.lender_address != currentAddress ? (
            <Button text={"Kick!"}></Button>
          ) : (
            <Button text={"Withdraw!"}></Button>
          )
        ) : (
            <Button text={"Return!"}></Button>
        )}
        </div>
      ) : rentinfo.lender_address != currentAddress ? (
        <div>Rent!</div>
      ) : (
        <div>Modify!</div>
      )}
    </StyledContents>
  );
}
