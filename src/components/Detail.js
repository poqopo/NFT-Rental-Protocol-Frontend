import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Description from "./Description";
import Input from "./Input";
import { getImage } from "../Utils/contract";
import dotenv from "dotenv";
dotenv.config();

const StyledDetail = styled.div`
  display: flex;
`;

const Image = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
`;

const StyledInfo = styled.div`
  padding: 0 10%;
  font-size: 18px;
  font-weight: 800;
`;

const Layout = styled.div`
  margin: 5%;
  font-size: 14px;
  font-weight: 500;
`;

function Detail({ type, contract_address, token_id }) {
  const [itemdetail, setItemdetail] = useState([]);

  async function searchApi() {
    const url = process.env.REACT_APP_API_URL + `/api/${contract_address}/${token_id}/${type}`;
    await axios
      .get(url)
      .then(function (response) {
        console.log("성공");
        setItemdetail(response.data);
      })
      .catch(function (error) {
        console.log("실패");
      });
  }

  useEffect(() => {
    searchApi();
  }, []);

  return (
    <Layout>
      <StyledDetail>
        <Image>
          <img src={`${itemdetail.nft_image}`} alt="Loading..."></img>
        </Image>
        <StyledInfo>
          <Description type={type} itemdetail={itemdetail} />
        </StyledInfo>
      </StyledDetail>
      <p>Description : {itemdetail.description}</p>
    </Layout>
  );
}

export default Detail;
