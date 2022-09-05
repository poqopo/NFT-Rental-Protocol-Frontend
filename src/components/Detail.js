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

function Detail(type, contracrt_address, token_id) {
  if (type === "Rent") {
    return Rentdetail(contracrt_address, token_id);
  } else if (type === "Kick") {
    return KickDetail(contracrt_address, token_id);
  } else if (type === "List") {
    return ListDetail(contracrt_address, token_id)
  }
}

function Rentdetail(type, contracrt_address, token_id) {
  const [nftdetail, setNFTdetail] = useState([]);
  const [listdetail, setListdetail] = useState([]);
  const [inputday, setInputday] = useState(0);

  async function searchApi() {
    const url = `http://localhost:4000/api/${contracrt_address}/${token_id}/${type}`;
    await axios
      .get(url)
      .then(function (response) {
        console.log("성공");
        setNFTdetail(response.data[0][0]);
        setListdetail(response.data[1][0]);
      })
      .catch(function (error) {
        console.log("실패");
      });
  }

  const rentfee = listdetail.rent_fee_per_block * inputday;
  const total = parseInt(listdetail.collateral_amount) + rentfee;
  const onChange = (e) => setInputday(e.target.value);

  useEffect(() => {
    searchApi();
  }, []);

  return (
    <Layout>
      <StyledDetail>
        <Image>
          <img src={`${nftdetail.nft_image}`} alt="Loading..."></img>
        </Image>
        <StyledInfo>
          <p>
            {" "}
            이름 : {nftdetail.nft_name} #{nftdetail.token_id}{" "}
          </p>
          <p> 소유자 : {listdetail.holder_account}</p>
          <p> 담보 토큰 : KUSDT</p>
          <p> 담보 토큰 양 : {listdetail.collateral_amount} KUSDT</p>
          <p> 대여료(일당) : {listdetail.rent_fee_per_block} KUSDT</p>
          <p> 최대 대여 일수 : {listdetail.max_rent_duration} days</p>
        </StyledInfo>
      </StyledDetail>
      <p>Description : {nftdetail.description}</p>
      <StyledButton>
        <p>
          담보토큰 양 : {listdetail.collateral_amount}, 대여료 {rentfee}, 총
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
        </div>
      </StyledButton>
    </Layout>
  );
}

function KickDetail(params) {
  const [nftdetail, setNFTdetail] = useState([]);
  const [listdetail, setListdetail] = useState([]);
  const [rentdetail, setRentdetail] = useState([]);
  const [inputday, setInputday] = useState(0);
  const [block, setBlock] = useState();

  async function searchApi() {
    const url = `http://localhost:4000/api/${params.contractaddress}/${params.tokenid}/${params.detail}`;
    await axios
      .get(url)
      .then(function (response) {
        console.log("성공");
        setNFTdetail(response.data[0][0]);
        setListdetail(response.data[1][0]);
        setRentdetail(response.data[2][0]);
      })
      .catch(function (error) {
        console.log("실패");
      });
  }
  async function getBlockNumber() {
    await setBlock(await getBlock());
  }

  const rentfee = listdetail.rent_fee_per_block * inputday;
  const total = parseInt(listdetail.collateral_amount) + rentfee;
  const onChange = (e) => setInputday(e.target.value);

  useEffect(() => {
    searchApi();
    getBlockNumber();
  }, []);
  return (
    <Layout>
      <StyledDetail>
        <Image>
          <img src={`${nftdetail.nft_image}`} alt="Loading..."></img>
        </Image>
        <StyledInfo>
          <p>
            {" "}
            이름 : {nftdetail.nft_name} #{nftdetail.token_id}
          </p>
          <p> 대여자 : {rentdetail.renter_accounts}</p>
          <p> 총 대여료 : {total} KUSDT</p>
          <p> 대여 일자 : {rentdetail.rent_block}</p>
        </StyledInfo>
      </StyledDetail>
      <p>Description : {nftdetail.description}</p>
      <StyledButton>
        {block - rentdetail.rent_block > rentdetail.rent_duration ? (
          remaintime(block - (rentdetail.rent_duration + rentdetail.rent_block))
        ) : (
          <button>Kick!</button>
        )}
      </StyledButton>
    </Layout>
  );
}

function ListDetail(params) {
  const [nftdetail, setNFTdetail] = useState([]);
  const [listdetail, setListdetail] = useState([]);
  const [rentdetail, setRentdetail] = useState([]);
  const [inputday, setInputday] = useState(0);
  const [block, setBlock] = useState();

  async function searchApi() {
    const url = `http://localhost:4000/api/${params.contractaddress}/${params.tokenid}/${params.detail}`;
    await axios
      .get(url)
      .then(function (response) {
        console.log("성공");
        setNFTdetail(response.data[0][0]);
        setListdetail(response.data[1][0]);
        setRentdetail(response.data[2][0]);
      })
      .catch(function (error) {
        console.log("실패");
      });
  }
  async function getBlockNumber() {
    await setBlock(await getBlock());
  }

  const rentfee = listdetail.rent_fee_per_block * inputday;
  const total = parseInt(listdetail.collateral_amount) + rentfee;
  const onChange = (e) => setInputday(e.target.value);

  useEffect(() => {
    searchApi();
    getBlockNumber();
  }, []);
  return (
    <Layout>
      <StyledDetail>
        <Image>
          <img src={`${nftdetail.nft_image}`} alt="Loading..."></img>
        </Image>
        <StyledInfo>
          <p>
            {" "}
            이름 : {nftdetail.nft_name} #{nftdetail.token_id}
          </p>
          <p> 대여자 : {rentdetail.renter_accounts}</p>
          <p> 총 대여료 : {total} KUSDT</p>
          <p> 대여 일자 : {rentdetail.rent_block}</p>
        </StyledInfo>
      </StyledDetail>
      <p>Description : {nftdetail.description}</p>
      <StyledButton>
        {block - rentdetail.rent_block > rentdetail.rent_duration ? (
          remaintime(block - (rentdetail.rent_duration + rentdetail.rent_block))
        ) : (
          <div>
            \<button>Modify!</button>
            <button>Cancel!</button>
          </div>
        )}
      </StyledButton>
    </Layout>
  );
}

export default Detail;
