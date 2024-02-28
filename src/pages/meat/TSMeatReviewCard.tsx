import { CSSProperties, ChangeEvent, MouseEvent, useState } from "react";
import CountingStar from "../../components/common/CountingStar";
import {
  ContentWrap,
  ReviewContentWrap,
  ReviewDateWrap,
  ReviewInfoWrap,
  ReviewProfileItem,
  ReviewUserInfoWrap,
  SwiperWrap,
} from "../admin/styles/AdminPageStyle";
import "../admin/styles.css";
import { useParams } from "react-router";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { API_SERVER_HOST } from "../../api/config";
import { ReviewCardWrap } from "../admin/styles/AdminReviewStyle";
import { ReportForm, ReviewDataForm } from "./Meat";
import { useMutation } from "@tanstack/react-query";
import { postReportTS } from "../../api/typeApi";

const TSMeatReviewCard = ({ reviewData }: { reviewData: ReviewDataForm }) => {
  const { ishop } = useParams();
  console.log("ishop", ishop);
  console.log("value임", reviewData);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const baseApi = API_SERVER_HOST;
  // const host = `${baseApi}/pic/shop/${ishop}/shop_pic/`;
  const handleClickReply = () => {
    console.log("작성이 완료되었습니다.");
  };
  interface SwiperStyles extends CSSProperties {
    "--swiper-navigation-color"?: string;
    "--swiper-pagination-color"?: string;
  }

  const swiperStyles: SwiperStyles = {
    "--swiper-navigation-color": "transparent",
    "--swiper-pagination-color": "transparent",
  };
  // const numberIshop = parseInt(ishop);
  const initState: ReportForm = {
    ireview: reviewData.ireview,
    ireport: 0,
    ishop: 0,
    checkShop: 0,
  };

  const [reportData, setReportData] = useState(initState);
  const ReportMutation = useMutation({
    mutationFn: (reportData: ReportForm) => postReportTS({ reportData }),
    onSuccess: () => {},
    onError: () => {},
  });

  const reviewNum = reviewData.ireview;

  console.log("ishop", typeof ishop);
  console.log("ireview", reviewData.ireview);
  console.log("ireview :", reportData.ireview);
  console.log("---------");
  const handleClickReport = (e: MouseEvent<HTMLButtonElement>) => {
    // console.log("report Data :", report);
    const report = {
      ireview: reviewData.ireview,
      ireport: reportData.ireport,
      ishop: ishop !== undefined ? Number(ishop) : 0,
      checkShop: 0,
    };
    console.log("최종 입력 폼 ", report);
    ReportMutation.mutate(report);
  };
  const handleChangeReport = (e: ChangeEvent<HTMLInputElement>) => {
    setReportData(prevValue => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <ReviewCardWrap>
        <div style={{ width: "100%", display: "flex" }}>
          <div>
            <ContentWrap>
              <SwiperWrap>
                <Swiper
                  style={swiperStyles}
                  loop={true}
                  spaceBetween={10}
                  navigation={true}
                  thumbs={{ swiper: thumbsSwiper }}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper2"
                >
                  {reviewData?.pic.map((pic, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={`${baseApi}/pic/shop/${ishop}/review/${reviewData.ireview}/${reviewData.pic[index]}`}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <Swiper
                  onSwiper={swiper => setThumbsSwiper}
                  loop={true}
                  spaceBetween={10}
                  slidesPerView={5}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper"
                >
                  {reviewData?.pic.map((pic, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={`${baseApi}/pic/shop/${ishop}/review/${reviewData.ireview}/${reviewData.pic[index]}`}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </SwiperWrap>
              <ReviewInfoWrap>
                <ReviewUserInfoWrap>
                  <ReviewProfileItem>
                    <div>
                      <img
                        src={
                          process.env.PUBLIC_URL + "/assets/images/favicon.png"
                        }
                        alt=""
                      />
                    </div>
                    <div>
                      <span>{reviewData.nickname}</span>
                    </div>
                  </ReviewProfileItem>
                  <ReviewDateWrap>
                    <span>2024.02.19</span>
                  </ReviewDateWrap>
                  <div>
                    <CountingStar star={reviewData.star} />
                  </div>
                </ReviewUserInfoWrap>
                <ReviewContentWrap>
                  <span>{reviewData.review}</span>
                </ReviewContentWrap>
              </ReviewInfoWrap>
            </ContentWrap>
          </div>
          <div>
            <span>신고하고싶다 이말이야</span>
            <input
              type="text"
              name="ireport"
              value={reportData.ireport}
              onChange={e => handleChangeReport(e)}
            />
            <button onClick={handleClickReport}>신고슛</button>
          </div>
        </div>
      </ReviewCardWrap>
    </div>
  );
};

export default TSMeatReviewCard;
