import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Contents from "../Components/Contents";
import { GrRefresh } from "react-icons/gr";
import { AiOutlineHome } from "react-icons/ai";
import { BsTwitter } from "react-icons/bs";
import { FaDiscord } from "react-icons/fa";
import { useQuery } from "react-query";

const StyledNFT = styled.div`
  position: relative;
  top: 80px;
  width: 100%;
  height: 100vh;

  & .layout {
    margin: auto;
    padding: 5%;
    width: 80%;
  }
  & .flexbox {
    display: grid;
    grid-template-columns: 500px 78px 1fr;
    margin: auto;
    width: 100%;
    height: 500px;
    font-weight: 500;
  }
  & .image-box {
    width: 500px;
    height: 500px;
  }
  img {
    width: 100%;
    height: 100%;
    border-radius: 15px;
    box-shadow: 5px 5px 5px gray;
  }
  & .nftinfo-box {
    width: 90%;
    height: 100%;
  }
  & .nftinfo {
    width: 100%;
    height: 100px;
  }
  & .rentinfo {
    width: 100%;
    height: 400px;
  }

  & .text {
    font-size: 40px;
    font-weight: bold;
    line-height: 1.2;
  }

  & .menu {
    font-size: 24px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.4;
    letter-spacing: normal;
  }

  & .icons {
    width: 30%;
    display: flex;
    align-items: center;
    place-content: space-evenly;
  }
  a {
    text-decoration : none;
    color : black;
  }
`;

const StyledProperty = styled.div`
  margin: auto;
  display: grid;
  grid-gap: 3%;
  grid-template-columns: repeat(auto-fill, 120px);

  & .item {
    text-align: center;
    border-radius: 12px;
    padding: 1px;
    color: rgb(255, 255, 255);
    background-color: rgba(43, 45, 55, 0.6);
    height: 100%;
    word-break: break-word;
  }
`;

const StyledActivity = styled.div`
  width: 100%;
  color: rgb(255, 255, 255);
  background-color: rgba(43, 45, 55, 0.6);
  border-radius: 15px;
  box-shadow: 5px 5px 5px gray;

  & .item {
    display: grid;
    grid-template-columns: repeat(5, 20%);
    grid-row-gap: 50px;
    text-align: center;
    padding: 5px;
  }

  & .text {
    overflow-x: hidden;
    max-width: 100%;
    width: 100%;
    color: white;
    box-sizing: border-box;
    text-overflow: ellipsis;
  }
`;

export default function NFT() {
  const params = useParams();
  const [metadata, setMetadata] = useState([]);
  const [rentinfo, setRentinfo] = useState([]);
  const [activity, setActivity] = useState([]);

  async function fetchNFTdata() {
    const metadataurl =
    process.env.REACT_APP_API_URL +
    `/NFT/${params.collectionAddress}/${params.token_id}`;
    const metadata = (await axios.get(metadataurl)).data
    const rentinfourl =
    process.env.REACT_APP_API_URL +
    `/NFT/${params.collectionAddress}/${params.token_id}/rentinfo`;
    const rentinfo = (await axios.get(rentinfourl)).data
    const activityurl =
    process.env.REACT_APP_API_URL +
    `/NFT/${params.collectionAddress}/${params.token_id}/activity`;
    const activity = (await axios.get(activityurl)).data
    return {metadata, activity, rentinfo}
  }

  useQuery("NFTdata", fetchNFTdata, {
    refetchOnWindowFocus: false, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
    retry: 0, // 실패시 재호출 몇번 할지
    onSuccess: data => {
      setMetadata(data.metadata)
      setActivity(data.activity)
      setRentinfo(data.rentinfo)
    },
    onError: e => {
      // 실패시 호출 (401, 404 같은 error가 아니라 정말 api 호출이 실패한 경우만 호출됩니다.)
      // 강제로 에러 발생시키려면 api단에서 throw Error 날립니다. (참조: https://react-query.tanstack.com/guides/query-functions#usage-with-fetch-and-other-clients-that-do-not-throw-by-default)
      console.log(e.message);
    }
  });

  return (
    <StyledNFT>
      <div className="layout">
        <div className="flexbox">
          <div className="image-box">
            <img src={metadata.image} alt="Loading..." />
          </div>
          <div></div>
          <div className="nftinfo-box">
            <div className="nftinfo">
              <div style={{ display: "flex", placeContent: "space-between" }}>
                <div>
                  <div className="text">
                    {metadata?.name} #{metadata.token_id}
                  </div>
                  <a
                    href={`https://baobab.scope.klaytn.com/account/${metadata?.collection_address}?tabId=txList`}
                  >
                    {metadata?.collection_address}
                  </a>
                </div>
                <div className="icons">
                  <GrRefresh size="24px" />
                  <a href={metadata?.website}>
                    <AiOutlineHome size="24px" />
                  </a>
                  <a href={metadata?.twitter}>
                    <BsTwitter size="24px" />
                  </a>
                  <a href={metadata?.discord}>
                    <FaDiscord size="24px" />
                  </a>
                </div>
              </div>
            </div>
            <div className="rentinfo">
              <Contents rentinfo={rentinfo} owner={metadata.owner}/>
            </div>
          </div>
        </div>
        <div style={{ margin: "50px auto" }}>
          <p className="menu">Attribute</p>
        </div>
        <StyledProperty>
          {metadata.property ? (
            metadata.property.map((data, index) => (
              <div className="item" key={index}>
                <p>{data.trait_type}</p>
                <p>{data.value}</p>
              </div>
            ))
          ) : (
            <div>No property</div>
          )}
        </StyledProperty>
        <div style={{ margin: "50px auto" }}>
          <p className="menu">Activity</p>
        </div>

        <StyledActivity>
          <div className="item">
            <p>Event</p>
            <p>From</p>

            <p>Block</p>
            <p>Collateral_amount</p>
            <p>Rent_fee</p>
          </div>
          {activity ? (
            activity.map((data, index) => (
              <div className="item" key={index}>
                <p>{data.event}</p>
                <p>{data.from}</p>

                <p>{data.block}</p>
                <p>{data.collateral_amount}</p>
                <p>{data.rent_fee}</p>
              </div>
            ))
          ) : (
            <div>No transcation before</div>
          )}
        </StyledActivity>
      </div>
    </StyledNFT>
  );
}
