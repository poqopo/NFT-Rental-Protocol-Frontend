import Itemlist from "../Components/Itemlist";
import styled from "styled-components";
import Background from "../Components/Background";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Input from "../Components/Input";

const StyledNFT = styled.div`
  position: relative;
  top: 80px;
  width: 100%;
  height: 100vh;

  & .layout {
    margin: auto;
    padding: 5%;
    width: 75%;
  }
  & .gridbox {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    height: 100%;
    border: 1px solid blue;
  }
  & .image-box {
    width: 90%;
    height: 100%;
  }
  img {
    width: 90%;
    height: 90%;
  }
  & .text {
    display: block;
    width: 100%;
    padding-left: 20px;
  }
  & .form {
    display: block;
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

  & .text{
    overflow-x: hidden;
    max-width: 100%;
    width: 100%;
    box-sizing: border-box;
    text-overflow : ellipsis;
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

  console.log(activity);

  return (
    <StyledNFT>
      <div className="layout">
        <div className="gridbox">
          <div className="image-box">
            <img src={metadata.image} alt="Loading..." />
          </div>
          <div>
            <p>owner : {metadata.owner}</p>
            <p>collateral : {rentinfo.collateral_token}</p>
            <p>collateral_amount : {rentinfo.collateral_amount}</p>
            <p>rent_fee_per_block : {rentinfo.rent_fee_per_block}</p>
            <p>max_rent_duration : {rentinfo.maxrent_duration}</p>
            {rentinfo.renter_address ? (
              <div>
                <p>renter_address : {rentinfo.renter_address}</p>
                <p>rent_duration : {rentinfo.rent_duration}</p>
                <p>rent_block : {rentinfo.rent_block}</p>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="text">
            <p>
              {metadata?.name} {metadata?.token_id}
            </p>
            <p>{metadata?.description}</p>
          </div>
          <div className="form">
            <div>
              <p>collateral : 1000 KUSDT</p>
              <p>rent_fee : 1000KUSDT</p>
              <Input />
            </div>
          </div>
        </div>
        <div>
          <p>Attribute</p>
        </div>
        <StyledProperty>
          {metadata.property? metadata.property.map((data, index) => (
            <div className="item" key={index}>
              <p>{data.trait_type}</p>
              <p>{data.value}</p>
            </div>
          ))
        :
        <div>No property</div>
        }
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
      </div>
    </StyledNFT>
  );
}
