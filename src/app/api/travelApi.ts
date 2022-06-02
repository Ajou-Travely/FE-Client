import baseApi, { IPaginationResponse } from "@src/app/api/baseApi";
import { TRAVEL_BASE_URL } from "@utils/type";
import { ITravelResponse } from "@src/app/api/api";

const travelApi = baseApi
  .enhanceEndpoints({
    addTagTypes: ["Travel"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getTravels: builder.query<IPaginationResponse<ITravelResponse>, void>({
        query: () => ({
          url: TRAVEL_BASE_URL,
          method: "GET",
        }),
        providesTags: (result, error, travelId) => [
          { type: "Travel", id: "LIST" },
        ],
      }),

      getTravel: builder.query<ITravelResponse, string>({
        query: (travelId) => ({
          url: `${TRAVEL_BASE_URL}/${travelId}`,
          method: "GET",
        }),
        providesTags: (result, error, travelId) => [
          { type: "Travel", id: travelId },
        ],
      }),

      createTravel: builder.mutation<
        any,
        {
          title: string;
          userEmails: string[];
          startDate: string;
          endDate: string;
        }
      >({
        query: (arg) => ({
          method: "POST",
          url: TRAVEL_BASE_URL,
          body: {
            ...arg,
          },
        }),
        invalidatesTags: (result, error, travelId) => [
          { type: "Travel", id: "LIST" },
        ],
      }),

      changeTravelScheduleOrder: builder.mutation<
        any,
        {
          travelId: string;
          date: string;
          scheduleOrder: number[];
        }
      >({
        query: ({ travelId, date, scheduleOrder }) => ({
          url: `${TRAVEL_BASE_URL}/${travelId}/change`,
          method: "POST",
          body: {
            scheduleOrder: scheduleOrder,
          },
          params: {
            date: date,
          },
        }),
        onQueryStarted: async (
          { travelId, date, scheduleOrder },
          {
            dispatch,
            getState,
            extra,
            requestId,
            queryFulfilled,
            getCacheEntry,
          }
        ) => {
          const patchResult = dispatch(
            travelApi.util.updateQueryData("getTravel", travelId, (draft) => {
              const dateDatas = draft.dates.find(
                (dateData) => dateData.date === date
              )!;

              dateDatas.schedules = scheduleOrder.map(
                (scheduleId) =>
                  dateDatas.schedules.find(
                    (scheduleData) => scheduleData.scheduleId === scheduleId
                  )!
              );
            })
          );
          try {
            await queryFulfilled;
          } catch {
            patchResult.undo();
          }
        },
      }),
      createTravelDate: builder.mutation<
        any,
        { travelId: string; date: string; title: string }
      >({
        query: ({ travelId, date, title }) => ({
          url: `${TRAVEL_BASE_URL}/${travelId}/travelDates`,
          method: "POST",
          body: {
            date: date,
            title: title,
          },
        }),
      }),
    }),
  });

export default travelApi;