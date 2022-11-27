import { useEffect, useState } from "react";

const useToken = (email) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    if (email) {
      fetch(
        `https://assignment-12-server-side-atikdev-bd.vercel.app/jwt?email=${email}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.AccessToken) {
            localStorage.setItem("AccessToken", data.AccessToken);
            setToken(data?.AccessToken);
          }
        });
    }
  }, [email]);
  return [token];
};

export default useToken;
