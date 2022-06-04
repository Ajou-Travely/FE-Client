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

type UserType = {
  userId: number;
  profilePath: string;
  name: string;
  email: string;
  phoneNumber: string;
  userType: string;
};

const User = () => {
  const [allUsers, setAllUsers] = useState<UserType[]>([]);

  useEffect(() => {
    axios
      .get("https://api.dev.travely.guide/v1/admin/users?page=0")
      .then((u) => setAllUsers(u.data.content));
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">profile</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Phone Number</th>
          <th scope="col">userType</th>
        </tr>
      </thead>
      <tbody>
        {allUsers.map((u) => (
          <tr key={u.userId}>
            <th scope="col">{u.userId}</th>
            <th scope="col">
              <Img img={u.profilePath} />
            </th>
            <th scope="col">{u.name}</th>
            <th scope="col">{u.email}</th>
            <th scope="col">{u.phoneNumber}</th>
            <th scope="col">{u.userType}</th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default User;
