import {
  Map,
  MapMarker,
  Polyline,
  useInjectKakaoMapApi,
} from "react-kakao-maps-sdk";
import { travelLocations, travelPaths } from "@pages/liveSchedule/dummyData";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import DashBoard from "@organisms/dashBoard";
import InnerDashBoard from "@organisms/dashBoard/inner";
import { css } from "@emotion/react";
import LabelBtn from "@src/components/atoms/button/label";
import { useParams } from "react-router-dom";
import { api } from "@src/app/api";
import axios from "axios";
import ListProto from "@pages/dashboard/components/timeline/ListProto";
import SplitBill from "@pages/dashboard/components/timeline/SplitBill";

function TravelEditPage() {
  const { travelId } = useParams<"travelId">();
  const { data: travelData } = api.useGetTravelQuery(travelId!);
  const [map, setMap] = useState<any>();
  const [type, setType] = useState<"search" | "recommend">("search");

  const [tempData, setTempData] = useState([
    { name: "강남역", address: "강남구" },
    { name: "역삼역", address: "강남구" },
    { name: "양재역", address: "강남구" },
  ]);
  /**
   * Update Route Info Data
   */
  const [routeInfos, setRouteInfos] = useState<any[]>();
  useEffect(() => {
    if (!travelData) {
      return;
    }

    console.log(travelData);
    async function getRoute(origLat, origLng, destLat, destLng) {
      const routeResponse = await axios.get(
        "http://123.214.75.32:18080/ors/v2/directions/driving-car",
        {
          params: {
            start: `${origLng},${origLat}`,
            end: `${destLng},${destLat}`,
          },
        }
      );

      console.log(routeResponse);

      return routeResponse.data;
    }

    const promises: Promise<any>[] = [];
    for (let i = 0; i < travelData.schedules.length - 1; i += 1) {
      const origin = travelData.schedules[i];
      const destination = travelData.schedules[i + 1];
      promises.push(
        getRoute(
          origin.place.lat,
          origin.place.lng,
          destination.place.lat,
          destination.place.lng
        )
      );
    }

    Promise.all(promises).then((result) => {
      setRouteInfos(
        result.map((r) => ({
          type: "driving",
          distance: r.features[0].properties.summary.distance,
          duration: r.features[0].properties.summary.distance,
          path: r.features[0].geometry.coordinates,
        }))
      );
    });
  }, [travelData]);

  const [seletedPosition, setSelectedPosition] = useState<
    { lat: number; lng: number } | undefined
  >(undefined);
  const bounds = useMemo(() => {
    if (!travelData) return undefined;

    const latlngbounds = new kakao.maps.LatLngBounds();

    travelData.schedules.forEach((travelLocation) => {
      latlngbounds.extend(
        new kakao.maps.LatLng(
          travelLocation.place.lat,
          travelLocation.place.lng
        )
      );
    });

    console.log(latlngbounds);
    return latlngbounds;
  }, [travelData]);

  useEffect(() => {
    if (map && bounds) {
      map.setBounds(bounds);
    }
  }, [map, bounds]);

  const onMapCreated = useCallback(
    (internalKakaoMap) => {
      setMap(internalKakaoMap);
    },
    [bounds]
  );

  const onMapClicked = useCallback((mouseEvent) => {
    const clickedLat = mouseEvent.latLng?.getLat();
    const clickedLng = mouseEvent.latLng?.getLng();

    if (clickedLat && clickedLng) {
      setSelectedPosition({
        lat: clickedLat,
        lng: clickedLng,
      });
    }
  }, []);

  const [innerDashBoardOnOff, setInnerDashBoardOnOff] = useState(false);
  const [markers, setMarkers] = useState<any[]>([]);
  function deleteMarker() {
    markers.map((v) => v.setMap(null));
    setMarkers([]);
  }

  if (!travelData) {
    return <div>Loading...</div>;
  }

  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;

          background: white;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: row;
          `}
        >
          <label htmlFor="tab1" role="button"><span>Tab 1</span></label>
          <input type="radio" value="Day 1" />
          <label>Day 1</label>
          <input type="radio" value="Day 2" />
          <label>Day 1</label>
          <input type="radio" value="Day 3" />
          <label>Day 1</label>
        </div>
        <SplitBill />
        <ListProto data={tempData} updateData={setTempData}/>
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: row;
          position: relative;
        `}
      >
        <DashBoard
          map={map}
          travelId={travelId}
          setMarkers={setMarkers}
          deleteMarker={deleteMarker}
          setInnerDashBoardOnOff={setInnerDashBoardOnOff}
        />
        {innerDashBoardOnOff && (
          <InnerDashBoard
            travelData={travelData}
            type={type}
            map={map}
            setMarkers={setMarkers}
            deleteMarker={deleteMarker}
          />
        )}

        {innerDashBoardOnOff && (
          <div
            css={css`
              position: absolute;
              right: -2rem;
              z-index: 3;
            `}
          >
            <LabelBtn
              url="/cancel.svg"
              onClick={() => {
                setInnerDashBoardOnOff(false);
                deleteMarker();
              }}
            />
            <LabelBtn url="/search.svg" onClick={() => setType("search")} />
            <LabelBtn
              url="/recommend.svg"
              onClick={() => setType("recommend")}
            />
          </div>
        )}
      </div>

      {bounds && (
        <div
          css={css`
            flex-grow: 1;
          `}
        >
          <Map
            onCreate={onMapCreated}
            onClick={onMapClicked}
            center={{
              lat: travelLocations[0].lnglat[1],
              lng: travelLocations[0].lnglat[0],
            }}
            style={{ width: "100%", height: "100%" }}
          >
            {seletedPosition && (
              <MapMarker // 마커를 생성합니다
                position={seletedPosition}
              />
            )}

            {travelData.schedules.map((schedule) => (
              <MapMarker // 마커를 생성합니다
                position={{
                  // 마커가 표시될 위치입니다
                  lat: schedule.place.lat,
                  lng: schedule.place.lng,
                }}
              >
                <div>{schedule.place.placeName}</div>
              </MapMarker>
            ))}

            {routeInfos &&
              routeInfos.map((routeInfo) => (
                <Polyline
                  path={routeInfo.path.map(([lng, lat]) => ({
                    lat,
                    lng,
                  }))}
                />
              ))}
          </Map>
        </div>
      )}
    </div>
  );
}

export default TravelEditPage;
