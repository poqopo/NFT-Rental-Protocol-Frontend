import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "./Button";

const StyledList = styled.div`
  margin: auto;
  width: 90%;
  display: grid;
  grid-template-columns: repeat(2, 500px);
  grid-auto-rows: 120px;
  grid-gap: 5%;
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
`;

export default function Kicklist({ category, subject, detail }) {
  const [kicklist, setKicklist] = useState([]);
  const [block, setBlock] = useState(10);
  // 통신 메서드
  async function searchApi() {
    const url =
      process.env.REACT_APP_API_URL +
      `/${category}/${subject}/${detail ? detail : ""}`;
    console.log(url);
    await axios
      .get(url)
      .then(function (response) {
        setKicklist(response.data);
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
