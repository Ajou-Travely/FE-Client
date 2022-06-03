import { css } from "@emotion/react";
import { api } from "@src/app/api/api";

const Event = () => {
  const { data, isLoading, isError, isSuccess } = api.useGetAllEventsQuery();

  if (isLoading) return <div>...loading</div>;
  if (isError) return <div>Post Page API Error</div>;
  const events = isSuccess ? data.content : [];
  return (
    <div>
      {events.map((event) => (
        <div
          key={event.eventId}
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

export default Event;
