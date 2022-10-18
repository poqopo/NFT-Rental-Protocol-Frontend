import Itemlist from "../Components/Itemlist";
import styled from "styled-components";
import Background from "../Components/Background";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Input from "../Components/Input";
import Button from "../Components/Button";
import Contents from "../Components/Contents";

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
    margin: auto;
    width: 100%;
    height: 500px;
    display: flex;
    border: 1px solid blue;
  }
  & .image-box {
    width: 500px;
    height: 500px;
  }
  img {
    width: 100%;
    height: 100%;
  }
  & .nftinfo {
    width: auto;
    padding-left: 78px;
    height: 125px;
  }
  & .rentinfo {
    width : 100%;
    height: 375px;
    display: flex;
    flex-direction: column;
    place-content: space-around;
    padding-left: 78px;   
    font-size: px;
    font-weight: bold;
    line-height: 1.2;
  }
  & .kickinfo {
    display : flex;
    place-content : space-between;
    height: 125px;
  }

  & .text {
    font-size: 40px;
    font-weight: bold;
    line-height: 1.2;
  }
  & .form {
    padding: 15px;
    margin-top: 50px;
    background-color: ivory;
    width: 90%;
  }
`;

const StyledProperty = styled.div`
  margin: auto;
  display: grid;
  grid-gap: 3%;
  grid-template-columns: repeat(auto-fill, 120px);

  & .item {
    width: 100%;
    margin: auto;
    border: 1px solid blue;
    padding: 3%;
  }
`;

const StyledActivity = styled.div`
  width: 100%;
  border: 1px solid blue;

  & .item {
    display: grid;
    grid-template-columns: repeat(5, 20%);
  }

  & .text {
    overflow-x: hidden;
    max-width: 100%;
    width: 100%;
    box-sizing: border-box;
    text-overflow: ellipsis;
  }
`;

export default function NFT() {
  const params = useParams();
  const [metadata, setMetadata] = useState([]);
  const [rentinfo, setRentinfo] = useState([]);
  const [activity, setactivity] = useState([]);


  async function searchApi() {
    const metadataurl =
      process.env.REACT_APP_API_URL +
      `/NFT/${params.collectionAddress}/${params.token_id}`;
    await axios
      .get(metadataurl)
      .then(function (response) {
        setMetadata(response.data);
        console.log("성공");
      })
      .catch(function (error) {
        console.log(error);
      });

    const rentinfourl =
      process.env.REACT_APP_API_URL +
      `/NFT/${params.collectionAddress}/${params.token_id}/rentinfo`;
    await axios
      .get(rentinfourl)
      .then(function (response) {
        setRentinfo(response.data);
        console.log("성공");
      })
      .catch(function (error) {
        console.log(error);
      });

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

  console.log(metadata);
  return (
    <StyledNFT>
      <div className="layout">
        <div className="flexbox">
          <div className="image-box">
            <img src={metadata.image} alt="Loading..." />
          </div>
          <div style={{width : "fill"}}>
            <div className="nftinfo">
              <div className="text">
                {metadata?.name} #{metadata?.token_id}
              </div>
              <a href="">{metadata?.collection_address}</a>
            </div>

            <Contents rentinfo={rentinfo}/>
          </div>
        </div>
        <div>
          <p>Attribute</p>
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
        <div>
          <p>Activity</p>
        </div>

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
    </StyledNFT>
  );
}
