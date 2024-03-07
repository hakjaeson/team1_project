import React, { MouseEvent } from "react";
import { useNavigate, useParams } from "react-router";
import { API_SERVER_HOST } from "../../api/config";
import { PropsList } from "../../pages/meat/Meat";
import ResultModal from "../common/ResultModal";
import OptiPlaceholder from "../image-optimization/OptiPlaceholder";
import OptiWireframe from "../image-optimization/OptiWireframe";
import useCustomHook from "./hooks/useCustomHook";
import useCustomLoginTS from "./hooks/useCustomLoginTS";
import {
  CardWrapper,
  InfoTagWrap,
  MeatSotreCardImg,
  MeatStoreBox,
  MeatStoreCard,
  MeatStoreInfo,
  MeatStoreTitle,
  ReserBtnWrap,
  ReserveBtn,
} from "./styles/GCardStyle";

const ListCard: React.FC<PropsList> = ({ serverData }) => {
  const navigate = useNavigate();
  console.log(serverData);
  const { ishop } = useParams();
  const { moveToRead, moveToReser, isModal, openModal, moveToLogin } =
    useCustomHook();

  const { isLogin } = useCustomLoginTS();
  const baseApi = API_SERVER_HOST;
  const host = `${baseApi}/pic/shop/`;
  const handleReserClick = (
    e: MouseEvent<HTMLButtonElement>,
    ishop: number,
    name: string,
  ) => {
    e.stopPropagation();
    if (isLogin) {
      // PATH랑 같이 보내야함 stireInfo.name
      // console.log("가게이름 ",   name);
      navigate(`/meat/reservation/${ishop}`, {
        state: {
          storeName: name,
        },
      });
    } else {
      openModal("로그인 필요", "로그인이 필요한 서비스입니다.", moveToLogin);
    }
  };
  return (
    <CardWrapper>
      {isModal.isOpen && (
        <ResultModal
          title={isModal.title}
          content={isModal.content}
          callFn={isModal.callFn}
        />
      )}
      {serverData &&
        serverData.map((item: any) => (
          <MeatStoreCard
            key={item.ishop}
            onClick={() => moveToRead(item.ishop)}
          >
            <MeatStoreInfo>
              <MeatStoreBox>
                <MeatStoreTitle>{item.name}</MeatStoreTitle>
                <InfoTagWrap>
                  {item.facilities
                    .slice(0, 4)
                    .map((tag: string, index: number) => (
                      <button key={index}>
                        <span>{tag}</span>
                      </button>
                    ))}
                </InfoTagWrap>
                {/* 예약하기 */}
                <ReserBtnWrap>
                  <ReserveBtn
                    onClick={e => handleReserClick(e, item.ishop, item.name)}
                  >
                    <span>예약하기</span>
                  </ReserveBtn>
                </ReserBtnWrap>
              </MeatStoreBox>
            </MeatStoreInfo>
            <MeatSotreCardImg>
              <OptiPlaceholder
                src={`${host}${item.ishop}/shop_pic/${item.pics[0]}`}
                alt={"고기 이미지"}
                width={350}
                height={240}
                placeholder={
                  <div>
                    <OptiWireframe width={350} height={240} />
                  </div>
                }
              />
              {/* <img
                src={`${host}${item.ishop}/shop_pic/${item.pics[0]}`}
                alt="고기 더미 이미지"
                loading="lazy"
              /> */}
              {/* <BlurredImage
                alt="고기 더미 이미지"
                host={host}
                src={`${item.ishop}/shop_pic/${item.pics[0]}`}
              /> */}
            </MeatSotreCardImg>
          </MeatStoreCard>
        ))}
    </CardWrapper>
  );
};
export default ListCard;
