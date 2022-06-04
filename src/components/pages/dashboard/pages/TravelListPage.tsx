import { NavLink, useNavigate } from "react-router-dom";
import { ScheduleElement } from "@organisms/scheduleElement";
import { css } from "@emotion/react";
import { useCallback, useState } from "react";
import travelApi from "@src/app/api/travelApi";
import { theme } from "@src/styles/theme";
import Modal from "@src/components/organisms/modal";
import CreateTravelModal from "@src/components/organisms/createTravelModal";
import { BiPlus } from "react-icons/bi";

const TravelListPage = () => {
  const navigate = useNavigate();
  const { data: travelsData } = travelApi.useGetTravelsQuery();

  const [isCrateTravelModelOpened, setIsCreateTravelModalOpened] =
    useState(false);

  const openCreateTravelModal = useCallback(() => {
    setIsCreateTravelModalOpened(true);
  }, []);

  const closeCreateTravelModal = useCallback(() => {
    setIsCreateTravelModalOpened(false);
  }, []);

  return (
    <>
      {isCrateTravelModelOpened && (
        <Modal onClick={closeCreateTravelModal}>
          <CreateTravelModal onSuccess={closeCreateTravelModal} />
        </Modal>
      )}
      <div
        css={css`
          position: relative;
          padding: 2rem;
          width: calc(100vw - 250px);
          height: 100%;
        `}
      >
        <div
          css={css`
            display: grid;
            overflow: auto;
            grid-template-columns: repeat(4, 1fr);
            gap: 24px;
            * {
              border-bottom-style: none;
            }
          `}
        >
          <div
            css={css`
              border-radius: 10px;
              max-width: 20vw;
              height: 100%;
              box-shadow: 0px 0px 3px ${theme.colors.shadow};
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
              :hover {
                opacity: 50%;
              }
            `}
            onClick={openCreateTravelModal}
          >
            <BiPlus
              css={css`
                width: 3rem;
                height: 3rem;
              `}
            />
          </div>
          {travelsData?.content !== undefined &&
            travelsData?.content.map(
              ({ id, title, users, startDate, endDate }) => (
                <div onClick={() => navigate(id.toString())}>
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
    </>
  );
};

export default TravelListPage;
