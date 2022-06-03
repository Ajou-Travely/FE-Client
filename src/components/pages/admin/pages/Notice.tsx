import { css } from "@emotion/react";
import { api } from "@src/app/api/api";

const Notice = () => {
  const { data, isLoading, isError, isSuccess } = api.useGetAllNoticesQuery();

  if (isLoading) return <div>...loading</div>;
  if (isError) return <div>Post Page API Error</div>;
  const notices = isSuccess ? data.content : [];
  return (
    <div>
      {notices.map((notice) => (
        <div
          key={notice.noticeId}
          css={css`
            display: flex;
          `}
        >
          s
        </div>
      ))}
    </div>
  );
};

export default Notice;
