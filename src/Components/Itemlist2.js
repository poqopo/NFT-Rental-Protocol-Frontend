import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "./Button";
import { useQuery } from "react-query";

const StyledList = styled.div`
  margin: auto;
  width: 90%;
  display: grid;
  grid-template-columns: repeat(2, 500px);
  grid-auto-rows: 120px;
  grid-gap: 50px;
  place-content: center;
`;
const Item = styled.div`
  margin: auto;
  display: flex;
  text-align: start;
  font-size: 12px;
  font-weight: 400;
  padding : 1px;
  border-radius : 15px;
  box-shadow: 5px 5px 5px gray;
  transform: scale(1);
  -webkit-transform: scale(1);
  -moz-transform: scale(1);
  -ms-transform: scale(1);
  -o-transform: scale(1);
  transition: all 0.3s ease-in-out; 

  & .imagelayout {
    width: 25%;
  }

  & .image {
    width: 100%;
    height: auto;
    border-radius : 15px;
  }

  & .text {
    display: block;
    width: 50%;
    padding-left: 20px;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }

  & .box {
    position: absolute;
    bottom: 0%;
  }
  a {
    color: black;
    text-decoration: none;
  }
  &:hover {
    transform: scale(1.1);
    -webkit-transform: scale(1.1);
    -moz-transform: scale(1.1);
    -ms-transform: scale(1.1);
    -o-transform: scale(1.1);
  }
`;

export default function Kicklist({ category, subject, detail }) {
  const [kicklist, setKicklist] = useState([]);
  const [block, setBlock] = useState(10);

  async function fetchKicklist() {
    const url =
      process.env.REACT_APP_API_URL +
      `/${category}/${subject}/${detail ? detail : ""}`;
    return await (
      await axios.get(url)
    ).data;
  }

  useQuery("kicklist", fetchKicklist, {
    refetchOnWindowFocus: false, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
    retry: 0, // 실패시 재호출 몇번 할지
    onSuccess: data => {
      setKicklist(data)
    },
    onError: e => {
      // 실패시 호출 (401, 404 같은 error가 아니라 정말 api 호출이 실패한 경우만 호출됩니다.)
      // 강제로 에러 발생시키려면 api단에서 throw Error 날립니다. (참조: https://react-query.tanstack.com/guides/query-functions#usage-with-fetch-and-other-clients-that-do-not-throw-by-default)
      console.log(e.message);
    }
  });

  
  return (
    <StyledList>
      {kicklist.map((data, index) => (
        <div key={index}>
          <Item>
            <div className="imagelayout">
              <Link
                to={`/${data.collection_address}/${
                  data.token_id ? data.token_id : ""
                }`}
              >
                <img className="image" src={data.image} alt="loading..." />
              </Link>
            </div>
            <div className="text">
              <Link
                to={`/${data.collection_address}/${
                  data.token_id ? data.token_id : ""
                }`}
              >
                <p>
                  이름 : {data.name} {data.token_id ? data.token_id : ""}
                </p>
                <p>대여자 : {data.renter_address}</p>
                {block >=
                parseInt(data.rent_block) + parseInt(data.rent_duration) ? (
                  <p>Kick 할 수 있습니다</p>
                ) : (
                  <p>
                    남은 시간 :{" "}
                    {parseInt(data.rent_duration) +
                      parseInt(data.rent_block) -
                      block}
                  </p>
                )}
              </Link>
            </div>
            <div style={{display : "flex", alignItems : "center"}}>
              <Button className="box" text={"Kick!"}></Button>
            </div>
          </Item>
        </div>
      ))}
    </StyledList>
  );
}
