import Itemlist from "../Components/Itemlist";
import styled from "styled-components";
import Background from "../Components/Background";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Menu from "../Components/Menu";
import { useQuery } from "react-query";

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
    { value: undefined, label: "모든 NFT" },
    { value: "listed", label: "리스팅된 NFT" },
    { value: "rented", label: "대여중인 NFT" },
  ];

  const sortMenu = [
    { value: "token_id", label: "ID 정렬" },
    { value: "maxrent_duration", label: "최대 대여기간 정렬" },
    { value: "rent_fee_per_block", label: "대여료 정렬" },
  ];

  async function fetchNFTlist() {
    const url =
    process.env.REACT_APP_API_URL + `/collection/${params.collectionAddress}`;
    return await (
      await axios.get(url)
    ).data;
  }

  useQuery("nftlist", fetchNFTlist, {
    refetchOnWindowFocus: false, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
    retry: 0, // 실패시 재호출 몇번 할지
    onSuccess: data => {
      setMetadata(data)
    },
    onError: e => {
      // 실패시 호출 (401, 404 같은 error가 아니라 정말 api 호출이 실패한 경우만 호출됩니다.)
      // 강제로 에러 발생시키려면 api단에서 throw Error 날립니다. (참조: https://react-query.tanstack.com/guides/query-functions#usage-with-fetch-and-other-clients-that-do-not-throw-by-default)
      console.log(e.message);
    }
  });

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
