import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { RootState } from "@src/app/store";
import { createSelector, createSlice } from "@reduxjs/toolkit";
import { TRAVEL_BASE_URL, USER_BASE_URL } from "@src/utils/type";

interface IUserResponse {
  userId: number;
  userName: string;
}

interface IScheduleResponse {
  scheduleId: number;
  startDate: number;
  endDate: number;
  place: {
    placeId: number;
    placeName: string;
  };
  users: IUserResponse[];
}
interface IPaginationResponse<T> {
  page: number | null;
  size: number | null;
  content: T[];
}

interface ITravelResponse {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  memo: string;
  managerId: number;
  users: IUserResponse[];
  schedules: IScheduleResponse[];
}

interface ICostResponse {
  id: number;
  title: string;
  startDate: number;
  endDate: number;
  memo: string;
  managerId: number;
  users: IUserResponse[];
  schedules: IScheduleResponse[];
}

interface AmountPerUserProps {
  [key: number]: number;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.dev.travely.guide",
    // baseUrl: "http://192.168.25.117:8080",
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const { token } = (getState() as RootState).auth;
      if (token) {
        headers.set("Authentication", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  keepUnusedDataFor: 0,
  tagTypes: ["Travel"],
  endpoints: (builder) => ({
    oauthLogin: builder.mutation<
      {
        status: number;
        token: string;
        kakaoId: string;
      },
      string
    >({
      query: (authorizationCode) => ({
        url: "/v1/oauth2/authorization/kakao",
        method: "GET",
        params: { code: authorizationCode },
      }),
    }),
    login: builder.mutation<
      {
        status: number;
        token: string;
        message?: string;
      },
      {
        email: string;
        password: string;
      }
    >({
      query: (arg) => ({
        url: "/v1/login",
        method: "POST",
        body: {
          email: arg.email,
          password: arg.password,
        },
      }),
    }),
    signUp: builder.mutation<any, any>({
      query: (signUpData) => ({
        url: USER_BASE_URL + "/signup",
        method: "POST",
        body: signUpData,
      }),
    }),
    logout: builder.mutation<undefined, void>({
      queryFn: () => {
        return {
          data: undefined,
        };
      },
    }),
    getMyInfo: builder.query<
      {
        email: string;
        name: string;
        phoneNumber: string;
        userId: string;
        userType: string;
      },
      void
    >({
      query: () => ({
        url: USER_BASE_URL + "/my-info",
        method: "GET",
      }),
    }),

    /**
     * Travel Apis
     */
    createTravel: builder.mutation<
      any,
      {
        title: string;
        startDate: string;
        endDate: string;
        userEmails: string[];
      }
    >({
      query: (arg) => ({
        method: "POST",
        url: TRAVEL_BASE_URL,
        body: {
          ...arg,
        },
      }),
      invalidatesTags: (result, error) => [{ type: "Travel" }],
    }),
    getTravels: builder.query<IPaginationResponse<ITravelResponse>, void>({
      query: () => ({
        url: TRAVEL_BASE_URL + `/travels`,
        method: "GET",
      }),
      providesTags: (result) => [{ type: "Travel" }],
    }),
    getTravel: builder.query<ITravelResponse, string>({
      query: (travelId) => ({
        url: TRAVEL_BASE_URL + `/${travelId}`,
        method: "GET",
      }),
    }),
    getUsers: builder.query<any, string>({
      query: (travelId) => ({
        url: TRAVEL_BASE_URL + `/${travelId}/users`,
        method: "GET",
      }),
    }),
    /**
     * Schedule Apis
     */
    createSchedule: builder.mutation<
      any,
      {
        travelId: number;
        endTime: "2022-05-23T13:30:07.247Z";
        place: {
          addressName: string;
          addressRoadName: string;
          kakaoMapId: number;
          phoneNumber: string;
          placeName: string;
          placeUrl: string;
          lat: number;
          lng: number;
        };
        startTime: "2022-05-23T13:30:07.247Z";
        userIds: number[];
      }
    >({
      query: (arg) => ({
        url: TRAVEL_BASE_URL + `/${arg.travelId}/schedules`,
        method: "POST",
        body: {
          endTime: arg.endTime,
          place: arg.place,
          startTime: arg.startTime,
          userIds: arg.userIds,
        },
      }),
    }),
    /**
     * Cost Apis
     */
    getCostById: builder.query<
      any,
      {
        travelId: string;
        costId: string;
      }
    >({
      query: (arg) => ({
        url: TRAVEL_BASE_URL + `/${arg.travelId}/costs/${arg.costId}`,
        method: "GET",
      }),
    }),
    getCostByTravelId: builder.query<any, string>({
      query: (travelId) => ({
        url: TRAVEL_BASE_URL + `/${travelId}/costs`,
        method: "GET",
      }),
    }),
    createCost: builder.mutation<
      any,
      {
        amountsPerUser: AmountPerUserProps[];
        content: string;
        payerId: number;
        title: string;
        totalAmount: number;
        travelId: string;
      }
    >({
      query: (arg) => ({
        url: TRAVEL_BASE_URL + `/${arg.travelId}/costs`,
        method: "POST",
        body: {
          amountsPerUser: arg.amountsPerUser,
          content: arg.content,
          payerId: arg.payerId,
          title: arg.title,
          totalAmount: arg.totalAmount,
        },
      }),
    }),
  }),
});

type AuthState = {
  token: string | null;
};

const initialAuthState = { token: null } as AuthState;
export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        api.endpoints.oauthLogin.matchFulfilled,
        (state, { payload }) => {
          state.token = payload.token;
        }
      )
      .addMatcher(api.endpoints.login.matchFulfilled, (state, { payload }) => {
        state.token = payload.token;
      })
      .addMatcher(api.endpoints.logout.matchFulfilled, (state) => {
        return initialAuthState;
      });
  },
});

export const isLoginSelector = createSelector(
  (state: RootState) => state.auth.token,
  (token) => token !== null
);
