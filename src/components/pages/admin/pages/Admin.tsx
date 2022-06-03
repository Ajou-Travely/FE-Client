import { css } from "@emotion/react";
import { PopularPlace } from "../../dashboard/pages/MainPage";

const Admin = () => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 10px;
      `}
    >
      <div
        css={css`
          font-size: 24px;
          font-weight: 700;
        `}
      >
        추천 여행지
      </div>
      <PopularPlace title="퍼플교" address="전남 신안군" />
      <PopularPlace title="흰여울문화마을" address="부산 영도구" />
      <PopularPlace title="익선동" address="서울 종로구" />
      <PopularPlace title="남이섬" address="강원 춘천시" />
      <PopularPlace title="청풍호반케이블카" address="충북 제천시" />
      <PopularPlace title="익산 미륵사지" address="전북 익산시" />
      <PopularPlace title="광명동굴" address="경기 광명시" />
      <PopularPlace title="울주 반구대 암각화" address="울산 울주군" />
      <PopularPlace title="부산 송도해수욕장" address="부산 서구" />
      <PopularPlace title="창덕궁과 후원" address="서울 종로구" />
    </div>
  );
};

export default Admin;
