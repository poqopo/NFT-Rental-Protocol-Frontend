import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getBlock, remaintime } from "../Utils/contract";

const StyledList = styled.div`
  margin: 3%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 300px;
  grid-gap: 5%;
  width: 80%;
`;
const Item = styled.div`
  margin: auto;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  border: 1px solid blue;
  border-radius: 30px;

  & .image {
    margin-top: 5%;
    width: 80%;
    height: 80%;
  }
`;

function Kicklist() {
  const [itemlist, setItemlist] = useState([]);
  const [block, setBlock] = useState();

  // 통신 메서드
  async function searchApi() {
    const url = "http://localhost:4000/api/Kickinfo";
    await axios
      .get(url)
      .then(function (response) {
        setItemlist(response.data);
        console.log("성공");
      })
      .catch(function (error) {
        console.log("실패");
      });
  }

  async function getBlockNumber() {
    await setBlock(await getBlock());
  }



  useEffect(() => {
    searchApi();
    getBlockNumber();
  }, []);

  if (itemlist.length > 0) {
    return (
      <StyledList>
        {itemlist.map((info, index) => (
          <Item>
            <Link to={`/${info.collection_address}/${info.token_id}/Kick`}>
              <img className="image" src={info.nft_image} alt="loading..." />
              <p>
                이름 : {info.nft_name} #{info.token_id}
              </p>
            </Link>
            { block > (info.rent_duration + info.rent_block) ? (
              remaintime(block - (info.rent_duration + info.rent_block))
            ) : (
              <button>Kick!</button>
            )}
          </Item>
        ))}
      </StyledList>
    );
  } else {
    return <div></div>;
  }
}
export default Kicklist;
