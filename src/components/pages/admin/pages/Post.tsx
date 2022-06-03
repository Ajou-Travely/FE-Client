import { css } from "@emotion/react";
import { api } from "@src/app/api/api";

const Post = () => {
  const { data, isLoading, isError, isSuccess } = api.useGetAllPostsQuery();

  if (isLoading) return <div>...loading</div>;
  if (isError) return <div>Post Page API Error</div>;
  const posts = isSuccess ? data.content : [];
  return (
    <div>
      {posts.map((post) => (
        <div
          key={post.postId}
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

export default Post;
