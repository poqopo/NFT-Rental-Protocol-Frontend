import Itemlist from "../Components/Itemlist";
import styled from "styled-components";
import Background from "../Components/Background";
import Button from "../Components/Button";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import EditProfile from "../Components/EditProfile";

const StyledMyPage = styled.div`
  position: relative;
  top: 80px;
  width: 100%;
  height: 100vh;

  & .background {
    margin: auto;
    width: 100%;
    min-height: 300px;
    height: 20%;
  }
  & .Title {
    margin: auto;
    color: black;
    font-size: 32px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: center;
  }
  & .list {
    margin: auto;
    width: 90%;
  }

  & .Toggle {
    display: flex;
    place-content: space-evenly;
  }
`;
const Image = styled.div`
  position: relative;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  & .image {
    margin: auto;
    width: 200px;
    height: 200px;
    border-radius: 50%;
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

export default function MyPage() {
  const params = useParams();
  const [metadata, setMetadata] = useState([]);
  const [activity, setActivity] = useState([]);
  const [isitem, setIsitem] = useState(true);
  const currentAddress = window.klaytn
    ? window.klaytn.selectedAddress
    : undefined;

  const viewMenu = [
    { value: "owner", label: "소유중인 NFT 보기" },
    { value: "lender_address", label: "리스팅한 NFT 보기" },
    { value: "renter_address", label: "대여한 NFT 보기" },
  ];

  const sortMenu = [
    { value: "ORDER BY nft.token_id", label: "ID 정렬" },
    {
      value: "ORDER BY rentinfo.maxrent_duration",
      label: "최대 대여기간 정렬",
    },
    { value: "ORDER BY rentinfo.rent_fee_per_block", label: "대여료 정렬" },
  ];

  async function fetchMypage() {
    const metadataurl =
      process.env.REACT_APP_API_URL + `/user/${params.useraddress}`;
    const metadata = (await axios.get(metadataurl)).data;
    const activityurl =
      process.env.REACT_APP_API_URL + `/user/activity/${params.useraddress}`;
    const activity = (await axios.get(activityurl)).data;
    return { metadata, activity };
  }

  useQuery("Mypage", fetchMypage, {
    refetchOnWindowFocus: false, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
    retry: 0, // 실패시 재호출 몇번 할지
    onSuccess: (data) => {
      setMetadata(data.metadata);
      setActivity(data.activity);
    },
    onError: (e) => {
      // 실패시 호출 (401, 404 같은 error가 아니라 정말 api 호출이 실패한 경우만 호출됩니다.)
      // 강제로 에러 발생시키려면 api단에서 throw Error 날립니다. (참조: https://react-query.tanstack.com/guides/query-functions#usage-with-fetch-and-other-clients-that-do-not-throw-by-default)
      console.log(e.message);
    },
  });
  return (
    <StyledMyPage>
      <div className="background">
        <Background url={"/background.jpg"} />
      </div>
      <Image>
        <img
          className="image"
          src={metadata.image ? metadata.image : "/avatar.png"}
          alt="Workflow"
        />
        <div
          style={{
            display: "flex",
            margin: "auto",
            width: "fit-content",
            paddingLeft: "30px",
          }}
        >
          <div className="Title">{metadata?.nickname}</div>
          {currentAddress === params.useraddress ? (
            <EditProfile />
          ) : (
            <div></div>
          )}
        </div>
      </Image>

      {isitem ? (
        <div className="list">
          <Itemlist
            searchText={"컬렉션 이름으로 검색"}
            category={"user"}
            subject={`nfts/${params.useraddress}`}
            viewMenu={viewMenu}
            sortMenu={sortMenu}
            menuVisible={true}
          />
        </div>
      ) : (
        <div className="list">
          <StyledActivity>
            <div className="item">
              <p>From</p>
              <p>Event</p>
              <p>Block</p>
              <p>Collateral_amount</p>
              <p>Rent_fee</p>
            </div>
            {activity ? (
              activity.map((data, index) => (
                <div className="item" key={index}>
                  <p className="text">{data.from}</p>
                  <p>{data.event}</p>
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
      )}
    </StyledMyPage>
  );
}
