import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledList = styled.div`
  margin : auto;
  width: 90%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  grid-gap: 5%;
`;
const Item = styled.div`
  margin: auto;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  border: 1px solid #ff8826;

  & .image {
    width: 100%;
    height: auto;
    max-width : 300px;
    max-height : 300px;
  }
`;

export default function Itemlist({ category, subject, detail }) {
  const [itemlist, setItemlist] = useState([]);
  // 통신 메서드
  async function searchApi() {
    const url =
      process.env.REACT_APP_API_URL +
      `/${category}/${subject}/${detail ? detail : ""}`;
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
      {itemlist.map((data, index) => (
        <div key={index}>
          <Item>
            <Link to={`/${data.collection_address}/${data.token_id ? data.token_id : ""}`}>
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
