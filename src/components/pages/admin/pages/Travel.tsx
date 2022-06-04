import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useState } from "react";

const Img = styled.div<{ img: string }>`
  width: 30px;
  height: 30px;
  border-radius: 30px;
  margin-right: 10px;
  background-image: url(${({ img }) => img});
  background-position: center;
  background-size: cover;
`;

const Travel = () => {
  const [allTravels, setAllTravels] = useState([]);

  useEffect(() => {
    axios.get("https://api.dev.travely.guide/v1/admin/travels").then((t) => {
      setAllTravels(t.data.content);
    });
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Title</th>
          <th scope="col">Start Date</th>
          <th scope="col">End Date</th>
          <th scope="col">Manager</th>
        </tr>
      </thead>
      <tbody>
        {allTravels.map((t) => (
          <tr>
            <th scope="col">{t.Id}</th>
            <th scope="col">{t.title}</th>
            <th scope="col">{t.startDate}</th>
            <th scope="col">{t.endDate}</th>
            <th scope="col">{t.managerId}</th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Travel;
