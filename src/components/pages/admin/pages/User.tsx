import { css } from "@emotion/react";
import { api } from "@src/app/api/api";
import React from "react";

const User = () => {
  const { data, isLoading, isError, isSuccess } = api.useGetAllUsersQuery();

  if (isLoading) return <div>...loading</div>;
  if (isError) return <div>User Page API Error</div>;
  const users = isSuccess ? data.content : [];
  return (
    <div>
      {users.map((user) => (
        <div
          key={user.userId}
          css={css`
            display: flex;
          `}
        >
          <div>{user.email}</div>
          <div>{user.name}</div>
          <div>{user.phoneNumber}</div>
          <div>{user.profilePath}</div>
          <div>{user.userType}</div>
        </div>
      ))}
    </div>
  );
};

export default User;
