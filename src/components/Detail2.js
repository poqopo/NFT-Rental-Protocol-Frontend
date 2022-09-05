import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { getBlock, remaintime, rent } from "../Utils/contract";

const StyledDetail = styled.div`
  display: flex;
  font-size: 18px;
  font-weight: 500;
`;

const Image = styled.div`
  width: 40%;
  max-width: 500px;
  max-height: 500px;
  height: 40%;
  display: flex;
  flex-direction: column;
  font-size: 18px;
`;

const StyledInfo = styled.div`
  margin: auto;
  width: 50%;
  display: flex;
  flex-direction: column;
  font-size: 18px;
  font-weight: 800;
`;

const Layout = styled.div`
  margin: 5%;
  width: 100%;
  font-size: 14px;
  font-weight: 500;
`;

const StyledButton = styled.div`
  margin: 0 auto;
  flex-direction: column;
  font-size: 20px;
  font-weight: 800;
  justify-content: space-evenly;
`;

function Detail(type, contract_address, token_id) {
  
  const [itemdetail, setItemdetail] = useState([]);
  const [inputday, setInputday] = useState(0);

  async function searchApi() {
    const url = `http://localhost:4000/api/${contract_address}/${token_id}/${type}`;
    await axios
      .get(url)
      .then(function (response) {
        console.log("성공");
        setItemdetail(response.data);
      })
      .catch(function (error) {
        console.log("실패");
      });
  }

  useEffect(() => {
    searchApi();
  }, []);

  return (
    <Layout>
      <StyledDetail>
        <Image>
          <img src={`${itemdetail.nft_image}`} alt="Loading..."></img>
        </Image>
        <StyledInfo>
          <p>
            {" "}
            이름 : {itemdetail.nft_name} #{itemdetail.token_id}{" "}
          </p>
          <p> 소유자 : {itemdetail.holder_account}</p>
          <p> 담보 토큰 : KUSDT</p>
          <p> 담보 토큰 양 : {itemdetail.collateral_amount} KUSDT</p>
          <p> 대여료(일당) : {itemdetail.rent_fee_per_block} KUSDT</p>
          <p> 최대 대여 일수 : {itemdetail.max_rent_duration} days</p>
        </StyledInfo>
      </StyledDetail>
      <p>Description : {itemdetail.description}</p>
      <StyledButton>
        {/* <p>
          담보토큰 양 : {itemdetail.collateral_amount}, 대여료 {rentfee}, 총
          비용 : {total}
        </p>
        <div className="form">
          <p>대여 기간을 입력하시면 대여료가 측정됩니다!</p>
          <input onChange={onChange} placeholder="HellO!"></input>
          <button
            onClick={() =>
              rent(nftdetail.collection_address, nftdetail.token_id, inputday)
            }
          >
            Rent!
          </button>
        </div> */}
      </StyledButton>
    </Layout>
  );


}

export default Detail;
