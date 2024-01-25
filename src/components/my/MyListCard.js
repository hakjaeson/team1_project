import React, { useEffect, useState } from "react";
import { getMyList } from "../../api/MyApi";
import Bookmark from "../bookmark/Bookmark";
import {
  MyListCardContent,
  MyListCardDateContent,
  MyListCardInfo,
  MyListCardInfoTitle,
  MyListCardName,
  MyListCardPlace,
  MyListCardSubTitle,
  MyListCardTitle,
  MyListCardVisual,
  MyListCardWrapper,
  MyMoreViewButton,
} from "./styles/MyListCardStyle";
import useCustomMy from "./hooks/useCustomMy";

const MyListCard = props => {
  const [myList, setMyList] = useState([]);
  const { page, MoveToListPage } = useCustomMy();

  useEffect(() => {
    const param = { page };
    getMyList({ param, successFn, failFn, errorFn });
  }, [page]);

  const successFn = result => {
    setMyList([...myList, ...result]);
    console.log(result);
  };
  const failFn = result => {
    console.log(result);
  };
  const errorFn = result => {
    console.log(result);
  };

  const handleMyListView = () => {
    MoveToListPage({ page: page + 1 });
  };

  const { storeimg } = props;
  return (
    <>
      {myList.map((myList, index) => (
        <MyListCardWrapper key={index}>
          <MyListCardVisual>
            <img src={storeimg} alt="가게 이미지"></img>
          </MyListCardVisual>
          <MyListCardContent>
            <MyListCardTitle>
              <MyListCardSubTitle>
                <Bookmark></Bookmark>
                <MyListCardPlace>
                  <span>{myList.checkShop === 0 ? "고깃집" : "정육점"}</span>
                </MyListCardPlace>
              </MyListCardSubTitle>
              <MyListCardName>{myList.name}</MyListCardName>
            </MyListCardTitle>
            <MyListCardInfo>
              <MyListCardInfoTitle>
                <li>주소</li>
                <li>전화번호</li>
                <li>영업시간</li>
                <li>종류</li>
                <li>서비스</li>
              </MyListCardInfoTitle>
              <MyListCardDateContent>
                <li>{myList.location}</li>
                <li>{myList.tel}</li>
                <li>{myList.open}</li>
                <li>{myList.mtype}</li>
                <li>{myList.facilities}</li>
              </MyListCardDateContent>
            </MyListCardInfo>
          </MyListCardContent>
        </MyListCardWrapper>
      ))}
      <MyMoreViewButton onClick={handleMyListView}>
        <span>더보기</span>
      </MyMoreViewButton>
    </>
  );
};
export default MyListCard;
