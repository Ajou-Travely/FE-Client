import Spinner from "@atoms/spinner";
import { useNavigate } from "react-router-dom";
import { Api } from "@utils/api";
import { useEffect } from "react";
import { useQuery } from "react-query";

const OAuth2RedirectHandler = () => {
  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery("oauth", () => {
    let code = new URL(window.location.href).searchParams.get("code");
    return Api.get(`/api/v1/oauth2/authorization/kakao?code=${code}`, {
      withCredentials: true,
    });
  });

  useEffect(() => {
    if (data === undefined) return;
    const { status, kakaoId } = data as any;
    if (status === 301) navigate("/signUp", { state: { kakaoId } });
    else navigate("/");
  }, [data]);

  if (isLoading) return <p>"Loading..."</p>;

  if (error) return <p>{"An error has occurred: " + (error as any).message}</p>;

  return (
    <>
      <Spinner />
    </>
  );
};

export default OAuth2RedirectHandler;
