import React, { useEffect, useState } from "react";
import { getMyReview } from "../../api/MyApi";
import Button from "../../components/button/Button";
import useModal from "../../hooks/useModal";
import Bookmark from "../bookmark/Bookmark";
import CountingStar from "../common/CountingStar";
import ResultModal from "../common/ResultModal";
import {
  MyBookCardBookButton,
  MyMoreViewButton,
  MyReviewCardContent,
  MyReviewCardDateContent,
  MyReviewCardInfo,
  MyReviewCardInfoTitle,
  MyReviewCardName,
  MyReviewCardPlace,
  MyReviewCardSubTitle,
  MyReviewCardTitle,
  MyReviewCardVisual,
  MyReviewCardWrapper,
} from "./styles/MyReviewCardStyle";
import useCustomMy from "./hooks/useCustomMy";

const MyReviewCard = props => {
  const [myReviewList, setMyReviewList] = useState([]);
  const { page, MoveToReviewPage } = useCustomMy();

  useEffect(() => {
    const param = { page };
    getMyReview({ param, successFn, failFn, errorFn });
  }, [page]);

  const successFn = result => {
    setMyReviewList(result);
    console.log(result);
  };
  const failFn = result => {
    console.log(result);
  };
  const errorFn = result => {
    console.log(result);
  };

  const { storeimg } = props;
  const { useResultModal, openModal, closeModal } = useModal();
  const handleDeleteReview = () => {
    openModal();
  };

  const handleMyReviewView = () => {
    MoveToReviewPage({ page: page + 1 });
  };

  return (
    <>
      {myReviewList.map((myReviewList, index) => (
        <MyReviewCardWrapper key={index}>
          <MyReviewCardVisual>
            <img src={storeimg} alt="가게 이미지"></img>
          </MyReviewCardVisual>
          <MyReviewCardContent>
            <MyReviewCardTitle>
              <MyReviewCardSubTitle>
                <Bookmark isBook={myReviewList.isBook}></Bookmark>
                <MyReviewCardPlace>
                  <span>
                    {myReviewList.checkShop === 0 ? "고깃집" : "정육점"}
                  </span>
                </MyReviewCardPlace>
              </MyReviewCardSubTitle>
              <MyReviewCardName>{myReviewList.name}</MyReviewCardName>
            </MyReviewCardTitle>
            <MyReviewCardInfo>
              <CountingStar star={myReviewList.star}></CountingStar>
              <MyReviewCardInfoTitle>
                <li>날짜</li>
                <li>리뷰</li>
              </MyReviewCardInfoTitle>
              <MyReviewCardDateContent>
                <li>{myReviewList.createdAt}</li>
                <li>{myReviewList.review}</li>
              </MyReviewCardDateContent>
            </MyReviewCardInfo>
            <MyBookCardBookButton>
              <div
                onClick={() => {
                  handleDeleteReview();
                }}
              >
                <Button bttext="리뷰삭제"></Button>
              </div>
            </MyBookCardBookButton>
            {useResultModal && (
              <ResultModal
                title="리뷰 삭제"
                content="작성한 리뷰를 삭제하시겠습니까?"
                callFn={() => {
                  closeModal();
                }}
              />
            )}
          </MyReviewCardContent>
        </MyReviewCardWrapper>
      ))}
      <MyMoreViewButton onClick={handleMyReviewView}>
        <span>더보기</span>
      </MyMoreViewButton>
    </>
  );
};
export default MyReviewCard;
