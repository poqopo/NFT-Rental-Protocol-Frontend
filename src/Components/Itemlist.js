import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import Menu from "./Menu";
import { useQuery } from "react-query";

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
  box-shadow: 3px 3px 3px gray;
  transform: scale(1);
  -webkit-transform: scale(1);
  -moz-transform: scale(1);
  -ms-transform: scale(1);
  -o-transform: scale(1);
  transition: all 0.3s ease-in-out; 

  & .image {
    width: 100%;
    height: auto;
    max-width: 300px;
    max-height: 300px;
    border-radius: 15px;

  }
  &:hover {
    transform: scale(1.1);
    -webkit-transform: scale(1.1);
    -moz-transform: scale(1.1);
    -ms-transform: scale(1.1);
    -o-transform: scale(1.1);
  }
`;

export default function Itemlist({
  category,
  subject,
  detail,
  viewMenu,
  sortMenu,
  menuVisible,
}) {
  const [itemlist, setItemlist] = useState([]);
  const [selectedViewMenu, setViewMenu] = useState();
  const [selectedSortMenu, setSortMenu] = useState();

  async function fetchItemlist( type, subtype ) {
    const url =
      process.env.REACT_APP_API_URL +
      `/${category}/${subject}/${detail ? detail : ""}${
        type ? `/view/${type}` : ""
      }${subtype ? `/sort/${subtype}` : ""}`;
    return await (
      await axios.get(url)
    ).data;
  }

  useQuery(
    ["itemlist", selectedViewMenu? `/${selectedViewMenu.value}`: "", selectedSortMenu? `/${selectedSortMenu.value}` : "" ],
     () => fetchItemlist(selectedViewMenu?.value, selectedSortMenu?.value),
    {
      refetchOnWindowFocus: false, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
      retry: 0, // 실패시 재호출 몇번 할지
      onSuccess: (data) => {
        setItemlist(data);
      },
      onError: (e) => {
        console.log(e.message);
      },
    }
  );
  return (
    <div>
      <Menu
        viewMenu={viewMenu}
        onViewMenuChange={setViewMenu}
        sortMenu={sortMenu}
        onSortMenuChange={setSortMenu}
        selectedViewMenu={selectedViewMenu}
        selectedSortmenu={selectedSortMenu}
        menuVisible={menuVisible}
      />
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
                Name : {data.name} {data.token_id ? "#" + data.token_id : ""}
              </h3>
            </Item>
          </div>
        ))}
      </StyledList>
    </div>
  );
}
