import Itemlist from "../Components/Itemlist";
import styled from "styled-components";
import Background from "../Components/Background";
import Button from "../Components/Button";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

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
border-radius : 15px;
box-shadow: 5px 5px 5px gray;

& .item {
  display: grid;
  grid-template-columns: repeat(5, 20%);
  grid-row-gap : 50px;
  text-align: center;
  padding : 5px;
}

& .text {
  overflow-x: hidden;
  max-width: 100%;
  width: 100%;
  color : white;
  box-sizing: border-box;
  text-overflow: ellipsis;
}
`;

export default function MyPage() {
  const params = useParams();
  const [metadata, setmetadata] = useState([]);
  const [activity, setActivity] = useState([]);
  const [isitem, setIsitem] = useState(true);
  const viewMenu = [
    { value: 0, label: "소유중인 NFT 보기" },
    { value: 1, label: "리스팅한 NFT 보기" },
    { value: 2, label: "대여한 NFT 보기" },
  ];

  const sortMenu = [
    { value: 0, label: "ID 정렬" },
    { value: 1, label: "최대 대여기간 정렬" },
    { value: 2, label: "대여료 정렬" },
  ];


  async function searchApi() {
    const url = process.env.REACT_APP_API_URL + `/user/${params.useraddress}`;
    await axios
      .get(url)
      .then(function (response) {
        setmetadata(response.data);
        console.log("성공");
      })
      .catch(function (error) {
        console.log(error);
      });

    const activityurl =
      process.env.REACT_APP_API_URL + `/user/activity/${params.useraddress}`;
    await axios
      .get(activityurl)
      .then(function (response) {
        setActivity(response.data);
        console.log("성공");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const onToggle= () => setIsitem(!isitem)

  useEffect(() => {
    searchApi();
  }, []);
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
        <p className="Title">{metadata?.nickname}</p>
      </Image>

      {isitem ? (
        <div className="list">
          <Itemlist
            category={"user"}
            subject={"nfts"}
            detail={params.useraddress}
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
