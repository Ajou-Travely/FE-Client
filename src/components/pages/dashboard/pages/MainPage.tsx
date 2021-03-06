import { css } from "@emotion/react";
import { Logo } from "@src/components/logo";
import { Link, useNavigate } from "react-router-dom";
import { BiHomeAlt, BiPlus, BiTrip, BiWorld } from "react-icons/bi";
import { Avatar, AvatarGroup } from "@pages/liveSchedule";
import travelApi from "@src/app/api/travelApi";
import ScheduleElement from "@organisms/scheduleElement";

const PopularPlace = ({
  title,
  address,
}: {
  title: string;
  address: string;
}) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid black;
        gap: 10px;
      `}
    >
      <img
        css={css`
          width: 50px;
          height: 50px;
          border-radius: 5px;
        `}
        src="https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=a4027925-8ca4-4b7b-aead-826c9a1fbddc"
      />
      <div>
        <div
          css={css`
            font-size: 18px;
            font-weight: 500;
          `}
        >
          {title}
        </div>
        <div
          css={css`
            font-size: 12px;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.79);
          `}
        >
          {address}
        </div>
      </div>
    </div>
  );
};
const MainPage = () => {
  const navigate = useNavigate();

  const { data: travelsData } = travelApi.useGetTravelsQuery();
  return (
    <div
      css={css`
        width: 100%;
        padding: 24px;
        box-sizing: border-box;
        display: flex;
        gap: 24px;
        flex-direction: column;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
        `}
      >
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
          `}
        >
          <div
            css={css`
              font-size: 24px;
              font-weight: 700;
            `}
          >
            ???????????? ??????
          </div>

          <button>
            <BiPlus />
            ?????? ????????????
          </button>
        </div>

        <div
          css={css`
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-gap: 20px;
          `}
        >
          {travelsData?.content !== undefined &&
            travelsData?.content.map(
              ({ id, title, users, startDate, endDate }) => (
                <div onClick={() => navigate("travels/" + id.toString())}>
                  <ScheduleElement
                    title={title}
                    users={users}
                    startDate={startDate}
                    endDate={endDate}
                  />
                </div>
              )
            )}
        </div>
      </div>

      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 10px;
        `}
      >
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
          `}
        >
          <div
            css={css`
              font-size: 24px;
              font-weight: 700;
            `}
          >
            ?????? ?????????
          </div>
        </div>
        <PopularPlace title="?????????" address="?????? ?????????" />
        <PopularPlace title="?????????????????????" address="?????? ?????????" />
        <PopularPlace title="?????????" address="?????? ?????????" />
        <PopularPlace title="?????????" address="?????? ?????????" />
        <PopularPlace title="????????????????????????" address="?????? ?????????" />
        <PopularPlace title="?????? ????????????" address="?????? ?????????" />
        <PopularPlace title="????????????" address="?????? ?????????" />
        <PopularPlace title="?????? ????????? ?????????" address="?????? ?????????" />
        <PopularPlace title="?????? ??????????????????" address="?????? ??????" />
        <PopularPlace title="???????????? ??????" address="?????? ?????????" />
      </div>
    </div>
  );
};

export default MainPage;
