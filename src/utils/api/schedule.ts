import { Api } from "../api";

export const createSchedule = (travelId: number) => async () => {
  await Api.post(`/v1/travels/${travelId}/schedules`, {
    endTime: "2022-05-15T08:50:55.957Z",
    place: {
      addressName: "string",
      addressRoadName: "string",
      kakaoMapId: 0,
      phoneNumber: "string",
      placeName: "string",
      placeUrl: "string",
      x: 0,
      y: 0,
    },
    startTime: "2022-05-15T08:50:55.957Z",
    userIds: [0],
  });
};