import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Menu from "./Menu";

const StyledList = styled.div`
  margin: auto;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 260px);
  grid-gap: 50px;
  place-content: center;
`;
const Item = styled.div`
  margin: auto;
  padding: 1px;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  border-radius: 15px;
  box-shadow: 5px 5px 5px gray;

  & .image {
    width: 100%;
    height: auto;
    max-width: 300px;
    max-height: 300px;
    border-radius: 15px;
  }
`;

export default function Itemlist({ category, subject, detail }) {
  const [itemlist, setItemlist] = useState([]);
  // 통신 메서드
  async function searchApi() {
    const url =
      process.env.REACT_APP_API_URL +
      `/${category}/${subject}/${detail ? detail : ""}`;
    console.log(url);
    await axios
      .get(url)
      .then(function (response) {
        setItemlist(response.data);
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
      {itemlist?.map((data, index) => (
        <div key={index}>
          <Item>
            <Link
              to={`/${data.collection_address}/${
                data.token_id ? data.token_id : ""
              }`}
            >
              <img className="image" src={data.image} alt="loading..." />
            </Link>
            <h3>
              Name : {data.name} {data.token_id ? data.token_id : ""}
            </h3>
          </Item>
        </div>
      ))}
    </StyledList>
  );
}
