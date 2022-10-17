import Itemlist from "../Components/Itemlist";
import styled from "styled-components";
import Background from "../Components/Background";
import Button from "../Components/Button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
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
    line-height: 1.38;
    letter-spacing: normal;
    margin-bottom: 48px;
    text-align: center;
  }
  & .list {
    margin: 5% auto;
    width: 90%;
  }

  & .Toggle {
    display : flex;
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
  margin : auto;
  width: 80%;
  border: 1px solid blue;

  & .item {
    display: grid;
    grid-template-columns: repeat(5, 20%);
  }

  & .text{
    overflow-x: hidden;
    max-width: 100%;
    width: 100%;
    box-sizing: border-box;
    text-overflow : ellipsis;
  }
`;

export default function MyPage() {
    const params= useParams()
    const [activity, setactivity] = useState([]);
  const currentAddress = window.klaytn.selectedAddress;
  async function searchApi() {
    const activityurl =
    process.env.REACT_APP_API_URL +
    `/NFT/${params.collectionAddress}/${params.token_id}/activity`;
  await axios
    .get(activityurl)
    .then(function (response) {
      setactivity(response.data);
      console.log("성공");
    })
    .catch(function (error) {
      console.log(error);
    });
}

  useEffect(() => {
    searchApi();
  }, []);
  return (
    <StyledMyPage>
      <div className="background">
        <Background url={"/background.jpg"} />
      </div>
      <Image>
        <img className="image" src="/avatar.png" alt="Workflow" />
        <p>Hello!</p>
      </Image>
      <div className="Toggle">
        <Button></Button>
        <Button></Button>
      </div>

      <div className="list">
        <Itemlist category={"user"} subject={"nfts"} detail={currentAddress}/>
      </div>


      <StyledActivity>
          <div className="item">
            <p>From</p>
            <p>Event</p>
            <p>Block</p>
            <p>Collateral_amount</p>
            <p>Rent_fee</p>
          </div>
        {activity? activity.map((data, index) => (
            <div className="item" key={index}>
              <p className="text">{data.from}</p>
              <p>{data.event}</p>
              <p>{data.block}</p>
              <p>{data.collateral_amount}</p>
              <p>{data.rent_fee}</p>
            </div>
          )) :
          <div>No transcation before</div>
          }
        </StyledActivity>

      <div></div>
    </StyledMyPage>
  );
}
