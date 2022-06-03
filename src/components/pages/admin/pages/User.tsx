import { api } from "@src/app/api/api";
import React from "react";

const User = () => {
  const { data: users, isLoading, isError } = api.useGetAllUsersQuery();
  if (isLoading) return <div>...loading</div>;
  if (isError) return <div>User Page API Error</div>;
  return (
    <div>
      {users.map((user) => (
        <React.Fragment key={user.userId}>
          <div>{user.email}</div>
          <div>{user.name}</div>
          <div>{user.phoneNumber}</div>
          <div>{user.profilePath}</div>
          <div>{user.userType}</div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default User;
