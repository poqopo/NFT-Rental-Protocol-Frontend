import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "./Button";
import { useInfiniteQuery } from "react-query";
import { getBlock, getGracePeriod, kickNFT } from "../Utils/Contract";

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
  padding: 1px;
  border-radius: 15px;
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
    border-radius: 15px;
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
  const [block, setBlock] = useState(10);
  const [grace_period, setGracePeriod] = useState(60 * 60 * 24);

  const { data, fetchNextPage } = useInfiniteQuery(
    ["itemlist"],
    ({ pageParam = 1 }) =>
      axios.get(
        process.env.REACT_APP_API_URL +
          `/nft/kicklist?page=${pageParam}&size=20`
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

  async function getInfo() {
    setBlock(await getBlock());
    setGracePeriod(await getGracePeriod());
  }

  useEffect(() => {
    getInfo();
  }, [getInfo]);

  return (
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
                <div className="imagelayout">
                  <Link
                    to={`/${nft.collection_address}/${
                      nft.token_id ? nft.token_id : ""
                    }`}
                  >
                    <img className="image" src={nft.image} alt="loading..." />
                  </Link>
                </div>
                <div className="text">
                  <Link
                    to={`/${nft.collection_address}/${
                      nft.token_id ? nft.token_id : ""
                    }`}
                  >
                    <p>
                      이름 : {nft.name}{" "}
                      {nft.token_id
                        ? nft?.name.includes("#")
                          ? ""
                          : "#" + nft.token_id
                        : ""}
                    </p>
                    <p>대여자 : {nft.renter_address}</p>
                    {block >=
                    Number(nft.rent_block) +
                      Number(nft.rent_duration) +
                      Number(grace_period) ? (
                      <p>Kick 할 수 있습니다</p>
                    ) : (
                      <p>
                        남은 시간 :{" "}
                        {Number(nft.rent_duration) +
                          Number(nft.rent_block) +
                          Number(grace_period) -
                          block}
                      </p>
                    )}
                  </Link>
                </div>
                {block >=
                Number(nft.rent_block) +
                  Number(nft.rent_duration) +
                  Number(grace_period) ? (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Button
                      className="box"
                      text={"Kick!"}
                      onClick={() =>
                        kickNFT(nft.collection_address, nft.token_id)
                      }
                    />
                  </div>
                ) : (
                  <div></div>
                )}
              </Item>
            </div>
          );
        });
      })}
    </StyledList>
  );
}
