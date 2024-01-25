import React, { useEffect, useState } from "react";
import {
  MyModifyPageButton,
  MyModifyPageForm,
  MyModifyPageInfo,
  MyModifyPageProfile,
  MyModifyPageTitle,
  MyModifyPageWrapper,
  MyNickName,
  ProfileImg,
} from "./styles/MyModifyPageStyle";
import Button from "../../components/button/Button";
import { getUserInfo } from "../../api/MyApi";
import useModal from "../../hooks/useModal";
import ResultModal from "../../components/common/ResultModal";

const initialProfie = {
  email: "",
  name: "",
  nickname: "",
  birth: "",
  gender: "",
  address: "",
  pic: "",
  tel: "",
};

// 프로필 수정 페이지
const MyModifyPage = () => {
  const [myProfileData, setMyProfileData] = useState(initialProfie);
  const [selectedAddress, setSelectedAddress] = useState("");

  useEffect(() => {
    const param = {};
    getUserInfo({ param, successFn, failFn, errorFn });
  }, []);

  const successFn = result => {
    setMyProfileData(result);
    console.log(result);
  };
  const failFn = result => {
    console.log(result);
  };
  const errorFn = result => {
    console.log(result);
  };

  // 우편번호 찾기 (Daum Postcode)
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // 우편번호 찾기 버튼
  const handleFindPostcode = () => {
    const daum = window.daum;
    new daum.Postcode({
      oncomplete: function (data) {
        console.log(data);
        setSelectedAddress(data.address);
      },
    }).open();
  };

  // input 휴대폰 번호 부분 (11자리 숫자만 입력 가능하도록 제한)
  const handlePhoneNumberChange = e => {
    const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 11);
    e.target.value = value;
  };

  const { useResultModal, openModal, closeModal } = useModal();
  const handleDeleteUser = () => {
    openModal();
  };

  return (
    <MyModifyPageWrapper>
      <MyModifyPageTitle>
        <span>프로필 수정</span>
      </MyModifyPageTitle>
      <MyModifyPageProfile>
        <ProfileImg>
          <img src="" alt=""></img>
          <button>
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/profile_camera.svg`}
            ></img>
          </button>
        </ProfileImg>
        <MyNickName>{myProfileData.nickname}</MyNickName>
      </MyModifyPageProfile>
      <MyModifyPageInfo>
        <p>이름</p>
        <span>{myProfileData.name}</span>
        <p>성별</p>
        <span>{myProfileData.gender}</span>
        <p>생년월일</p>
        <span>{myProfileData.birth}</span>
        <p>이메일</p>
        <span>{myProfileData.email}</span>
      </MyModifyPageInfo>
      <MyModifyPageForm>
        <p>휴대폰 번호</p>
        <span>{myProfileData.tel}</span>
        <input
          type="text"
          placeholder="변경할 휴대폰 번호를 입력하세요."
          onChange={handlePhoneNumberChange}
        ></input>
        <p>닉네임</p>
        <span>{myProfileData.nickname}</span>
        <input type="text" placeholder="변경할 닉네임을 입력하세요."></input>
        <p>주소</p>
        <span>{myProfileData.address}</span>
        <div
          onClick={() => {
            handleFindPostcode();
          }}
        >
          <Button bttext="우편번호 찾기"></Button>
        </div>
        <input
          type="text"
          placeholder="변경할 주소를 입력하세요."
          value={selectedAddress} // 선택한 주소를 입력란에 표시
          onChange={e => setSelectedAddress(e.target.value)}
        ></input>
      </MyModifyPageForm>

      <MyModifyPageButton>
        <Button bttext="저장하기"></Button>
        <div
          onClick={() => {
            handleDeleteUser();
          }}
        >
          <Button bttext="회원탈퇴"></Button>
        </div>
        {useResultModal && (
          <ResultModal
            title="회원 탈퇴"
            content="모든 회원 정보가 삭제됩니다."
            callFn={() => {
              closeModal();
            }}
          />
        )}
      </MyModifyPageButton>
    </MyModifyPageWrapper>
  );
};

export default MyModifyPage;
