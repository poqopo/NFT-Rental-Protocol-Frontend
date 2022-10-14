import Itemlist from "../Components/Itemlist";
import styled from "styled-components";
import Background from "../Components/Background";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const StyledNFT = styled.div`
  position: relative;
  top: 80px;
  width : 100%;
  height: 100vh;

  & .layout {
    margin : auto;
    padding : 5%;
    width: 75%;
    height : 90%;
  }
  & .gridbox {
    display : grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    width : 100%;
    height : 100%;
    border : 1px solid blue;
  }
  & .image-box {
    width : 90%;
    height : 100%;
  }
  img{
    width : 90%;
    height : 90%;
  }

  & .text {
    display: block;
    width: 50%;
    padding-left: 20px;
  }
`;

export default function NFT() {
  const params = useParams()
  const [metadata, setMetadata] = useState([])
  const [rentinfo, setRentinfo] = useState([])
  const [activity, setactivity] = useState([])


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

  console.log(metadata)

  return (
    <StyledNFT>
      <div className="layout">
        <div className="gridbox">
          <div className="image-box">
            <img src={metadata.image}/>
          </div>
          <div>Rentinfo!</div>
          <div className="text">
            <p>{metadata.name} {metadata.token_id}</p>
            <p>{metadata.description}</p>
          </div>
          <div>rent input</div>
        </div>
      </div>
    </StyledNFT>
  );
}
