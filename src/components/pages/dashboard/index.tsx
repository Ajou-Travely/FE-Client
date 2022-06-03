import { Link, NavLink, Outlet, useMatch, useNavigate } from "react-router-dom";
import TravelListPage from "@pages/dashboard/pages/TravelListPage";
import { css } from "@emotion/react";
import { Logo } from "@src/components/logo";
import { BiHomeAlt } from "react-icons/bi";
import { motion } from "framer-motion";
import { Avatar } from "@pages/liveSchedule";
import styled from "@emotion/styled";
import FriendsPage from "@pages/dashboard/pages/FriendsPage";
import MainPage from "@pages/dashboard/pages/MainPage";
import useBreadcrumbs, { BreadcrumbsRoute } from "use-react-router-breadcrumbs";
import { api } from "@src/app/api/api";
import FeedPage from "@pages/dashboard/pages/FeedPage";
import EventPage from "@pages/dashboard/pages/EventPage";
import NoticePage from "@pages/dashboard/pages/NoticePage";
import TravelEditPage from "@pages/dashboard/pages/TravelEditPage";
import travelApi from "@src/app/api/travelApi";
import TextAvatar from "@src/components/atoms/textAvatar";

const LLink = styled(Link)`
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const SideBarMenu = ({
  toPath,
  children,
}: {
  toPath: string;
  children: any;
}) => {
  const isMatch = useMatch(toPath);

  return (
    <LLink to={toPath}>
      <div
        css={css`
          position: relative;
          display: flex;
          align-items: center;
          height: 40px;
          margin: 7px 0;
          gap: 10px;
        `}
        style={{ color: isMatch ? "#1e52e2" : "rgba(0, 0, 0, 0.4)" }}
      >
        {isMatch && (
          <motion.div
            css={css`
              position: absolute;
              width: 5px;
              height: 100%;
              border-radius: 0 10px 10px 0;
              background: #1e52e2;
            `}
            layoutId="outline"
            initial={false}
          />
        )}
        <div
          css={css`
            padding: 10px 24px;
            display: flex;
            align-items: center;
            font-weight: 600;
          `}
        >
          {children}
        </div>
      </div>
    </LLink>
  );
};

const SideBar = ({ type }) => {
  const tabs = type === "dashboard" ? DASHBOARD_TAB : ADMIN_TAB;
  return (
    <div
      css={css`
        background: rgba(255, 255, 255);
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        border-right: 1px solid rgba(0, 0, 0, 0.1);

        // FIXME : Is there better way?
        width: 250px;
        min-width: 250px;
      `}
    >
      <div
        css={css`
          padding: 24px;
        `}
      >
        <Logo color="#1e52e2" />
      </div>

      <div
        css={css`
          width: 100%;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          align-content: stretch;
        `}
      >
        {tabs.map((tab) => (
          <SideBarMenu toPath={tab.toPath}>
            <BiHomeAlt size={24} style={{ marginRight: 12 }} />
            {tab.title}
          </SideBarMenu>
        ))}
      </div>
    </div>
  );
};

const TravelNameBreadCrumb = ({ match }) => {
  const { data: travelData } = travelApi.useGetTravelQuery(
    match.params.travelId
  );
  return (
    <span>{travelData ? `${travelData.id}-${travelData.title}` : "..."}</span>
  );
};

const TopBar = () => {
  const { data: myInfoData } = api.useGetMyInfoQuery();
  const navigate = useNavigate();
  const breadcrumbs = useBreadcrumbs(dashboardRoute, { disableDefaults: true });

  return (
    <>
      <div>
        <span
          css={css`
            font-weight: 500;
            font-size: 24px;
          `}
        >
          메인
        </span>

        <div>
          {breadcrumbs.map(({ match, breadcrumb }) => (
            <span key={match.pathname}>
              <NavLink to={match.pathname}>{breadcrumb} / </NavLink>
            </span>
          ))}
        </div>
      </div>

      <div
        css={css`
          display: flex;
          flex-direction: row;
          align-items: center;
          cursor: pointer;
          :hover {
            opacity: 50%;
          }
        `}
      >
        <div onClick={() => navigate("/mypage")}>
          <TextAvatar name={myInfoData?.name ?? "게스트"} />
        </div>
      </div>
    </>
  );
};

export const DashboardTemplate = ({ type = DASHBOARD }) => {
  return (
    <div
      css={css`
        height: 100vh;
        display: flex;
      `}
    >
      <SideBar type={type} />
      <div
        css={css`
          flex-grow: 1;

          display: flex;
          flex-direction: column;
        `}
      >
        <div
          css={css`
            height: 80px;
            padding: 0 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          `}
        >
          <TopBar />
        </div>
        <div
          css={css`
            background: rgba(244, 244, 244);
            flex-grow: 1;
          `}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const dashboardRoute: BreadcrumbsRoute<string>[] = [
  {
    path: "dashboard",
    element: <DashboardTemplate />,
    children: [
      {
        index: true,
        element: <MainPage />,
        breadcrumb: "홈",
      },
      {
        path: "travels",
        element: <TravelListPage />,
        breadcrumb: "여행",
      },
      {
        path: "travels/:travelId",
        element: <TravelEditPage />,
        breadcrumb: TravelNameBreadCrumb,
      },
      {
        path: "friends",
        element: <FriendsPage />,
        breadcrumb: "친구",
      },
      {
        path: "feed",
        element: <FeedPage />,
        breadcrumb: "피드",
      },
      {
        path: "notice",
        element: <NoticePage />,
        breadcrumb: "공지사항",
      },
      {
        path: "event",
        element: <EventPage />,
        breadcrumb: "이벤트",
      },
    ],
  },
];

export default dashboardRoute;

const DASHBOARD_TAB = [
  {
    toPath: "/dashboard",
    title: "홈",
  },
  {
    toPath: "/dashboard/travels",
    title: "내 여행",
  },
  {
    toPath: "/dashboard/friends",
    title: "친구",
  },
  {
    toPath: "/dashboard/feed",
    title: "피드",
  },
  {
    toPath: "/dashboard/notice",
    title: "공지사항",
  },
  {
    toPath: "/dashboard/event",
    title: "이벤트",
  },
  {
    toPath: "/dashboard/setting",
    title: "설정",
  },
  {
    toPath: "/logout",
    title: "로그아웃",
  },
];

const ADMIN_TAB = [
  {
    toPath: "/admin",
    title: "홈",
  },
  {
    toPath: "/admin/travels",
    title: "여행",
  },
  {
    toPath: "/admin/users",
    title: "사용자",
  },
  {
    toPath: "/admin/posts",
    title: "게시글",
  },
  {
    toPath: "/admin/notice",
    title: "공지사항",
  },
  {
    toPath: "/admin/event",
    title: "이벤트",
  },
  {
    toPath: "/logout",
    title: "로그아웃",
  },
];

const DASHBOARD = "dashboard";
