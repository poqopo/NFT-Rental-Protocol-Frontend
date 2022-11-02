import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import Menu from "./Menu";
import { useInfiniteQuery } from "react-query";
import { useSelector } from "react-redux";

const StyledList = styled.div`
  margin: auto;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 260px);
  grid-gap: 50px;
  place-content: center;
  animation: fadeIn 1s;
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
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
  searchText,
}) {
  const [selectedViewMenu, setViewMenu] = useState();
  const [selectedSortMenu, setSortMenu] = useState();
  const network = useSelector(state => state.network.value)
  console.log(network)
  const { data, fetchNextPage } = useInfiniteQuery(
    [
      "itemlist",
      selectedViewMenu ? `/${selectedViewMenu.value}` : "",
      selectedSortMenu ? `/${selectedSortMenu.value}` : "",
    ],
    ({ pageParam = 1 }) =>
      axios.get(
        process.env.REACT_APP_API_URL +
          `/${category}/${subject}${detail ? `/${detail}` : ""}?view=${
            selectedViewMenu ? selectedViewMenu.value : ""
          }&sort=${
            selectedSortMenu ? selectedSortMenu.value : ""
          }&page=${pageParam}&size=20`
      ),
    {
      getNextPageParam: (lastPage, allPages) => {
        return allPages.length + 1;
      },
    }
  );

  const observeRef = useRef();
  const ref = useRef(null);
  const intersectionObserver = (entries, io) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        io.unobserve(entry.target);
        fetchNextPage();
      }
    });
  };
  useEffect(() => {
    if (observeRef.current) {
      observeRef.current.disconnect();
    }
    observeRef.current = new IntersectionObserver(intersectionObserver);
    ref.current && observeRef.current.observe(ref.current);
  }, [data]);

  return (
    <div>
      <Menu
        text={searchText}
        viewMenu={viewMenu}
        onViewMenuChange={setViewMenu}
        sortMenu={sortMenu}
        onSortMenuChange={setSortMenu}
        selectedViewMenu={selectedViewMenu}
        selectedSortmenu={selectedSortMenu}
        menuVisible={menuVisible}
      />
      <StyledList>
        {data?.pages.map((page, pageIndex) => {
          const list = page.data;
          return list.map((nft, index) => {
            return (
              <div
                key={index}
                ref={
                  list.length * pageIndex + index ===
                  data.pages.length * list.length - 1
                    ? ref
                    : null
                }
              >
                <Item>
                  <Link
                    to={`/${nft.collection_address}/${
                      nft.token_id ? nft.token_id : ""
                    }`}
                  >
                    <img className="image" src={nft.image} alt="loading..." />
                  </Link>
                  <h3>
                    Name : {nft.name}{" "}
                    {nft.token_id
                      ? nft?.name.includes("#")
                        ? ""
                        : "#" + nft.token_id
                      : ""}
                  </h3>
                </Item>
              </div>
            );
          });
        })}
      </StyledList>
    </div>
  );
}
