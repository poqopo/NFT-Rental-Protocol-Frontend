import Itemlist from "../Components/Itemlist";
import styled from "styled-components";
import Background from "../Components/Background";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Menu from "../Components/Menu";

const StyledCollection = styled.div`
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
    margin: auto;
    width: 90%;
  }
  & .description {
    width: 85%;
    margin: auto;
    color: black;
    font-size: 14px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.38;
    letter-spacing: normal;
    margin-bottom: 48px;
    text-align: start;
  }
`;

export default function Collection() {
  const params = useParams();
  const [metadata, setMetadata] = useState({});
  const viewMenu = [
    { value: 0, label: "모든 NFT" },
    { value: 1, label: "리스팅된 NFT" },
    { value: 2, label: "대여중인 NFT" },
  ];

  const sortMenu = [
    { value: 0, label: "ID 정렬" },
    { value: 1, label: "최대 대여기간 정렬" },
    { value: 2, label: "대여료 정렬" },
  ];
  async function searchApi() {
    const url =
      process.env.REACT_APP_API_URL + `/collection/${params.collectionAddress}`;
    await axios
      .get(url)
      .then(function (response) {
        setMetadata(response.data);
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
    <StyledCollection>
      <div className="background">
        <Background
          url={metadata.banner ? metadata.banner : "/background.jpg"}
        />
      </div>
      <div className="Title">{metadata?.name}</div>
      <div className="description">
        <div>{metadata?.description}</div>
      </div>
      <div className="list">
        <Itemlist
          category={"collection"}
          subject={"nfts"}
          detail={params.collectionAddress}
          viewMenu={viewMenu}
          sortMenu={sortMenu}
          menuVisible={true}
        />
      </div>
    </StyledCollection>
  );
}
