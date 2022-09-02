import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledMypage = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5% 8%;
  border: 1px solid blue;
  border-radius: 30px;
`;
const Image = styled.div`
  margin: 5% auto;
  text-align: center;
  & .image {
    margin: auto;
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
`;

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

function Mypagelist() {
  const currentAddress = window.klaytn.selectedAddress;
  const [listdetail, setListdetail] = useState([]);
  const [rentdetail, setRentdetail] = useState([]);
  const [toggleHistory, setToggle] = useState(false);

  // 통신 메서드
  async function searchApi() {
    const url = `http://localhost:4000/api/mypage/${currentAddress}`;
    await axios
      .get(url)
      .then(function (response) {
        setListdetail(response.data[0]);
        setRentdetail(response.data[1]);
        console.log(response.data)
        console.log("성공");
      })
      .catch(function (error) {
        console.log("실패");
      });
  }

  useEffect(() => {
    searchApi();
  }, []);

  return (
    <StyledList>
      {listdetail.map((info, index) => (
        <Item>
          <Link to={`/${info.collection_address}/${info.token_id}/Rent`}>
            <img className="image" src={info.nft_image} alt="loading..." />
            <p>
              이름 : {info.nft_name} #{info.token_id}
            </p>
          </Link>
        </Item>
      ))}
      {rentdetail.map((info, index) => (
        <Item>
          <Link to={`/${info.collection_address}/${info.token_id}/Rent`}>
            <img className="image" src={info.nft_image} alt="loading..." />
            <p>
              이름 : {info.nft_name} #{info.token_id}
            </p>
          </Link>
        </Item>
      ))}
    </StyledList>
  );
}

export default Mypagelist;
