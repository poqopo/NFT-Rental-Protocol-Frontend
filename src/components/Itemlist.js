import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import dotenv from "dotenv";
dotenv.config();

const StyledList = styled.div`
  width : 100%;
  margin: 5%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 5%;
`;
const Item = styled.div`
  margin: auto;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  border: 2px solid #FF8826;
  border-radius: 30px;

  & .image {
    margin-top: 5%;
    width: 80%;
    height: 80%;
  }
`;

function Itemlist({ type, link }) {
  const [itemlist, setItemlist] = useState([]);
  // 통신 메서드
  async function searchApi() {
    const url = process.env.REACT_APP_API_URL + `/api/NFT/${type}`;
    console.log(url)
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

  if (itemlist.length > 0) {
    return (
      <StyledList>
        {itemlist.map((info, index) => (
          <Item>
            <h3>
              이름 : {info.nft_name} #{info.token_id}
            </h3>
            <Link to={`/${info.collection_address}/${info.token_id}/${link ? link : info.link}`}>
              <img className="image" src={info.nft_image} alt="loading..." />
            </Link>
          </Item>
        ))}
      </StyledList>
    );
  } else {
    return (
      <div>
        <h3>파일을 가져오는데 실패하였습니다. 잠시후에 다시 이용해주세요.</h3>
      </div>
    );
  }
}
export default Itemlist;
