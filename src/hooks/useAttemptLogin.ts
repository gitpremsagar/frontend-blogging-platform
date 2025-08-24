import { useEffect, useState } from "react";
import useRefreshAccessToken from "@/hooks/useRefreshAccessToken";

const useAttemptLogin = () => {
  const { refreshToken } = useRefreshAccessToken();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const attemptRefresh = async () => {
      const isRefreshed = await refreshToken();
      if (isRefreshed) {
        setIsUserLoggedIn(true);
      } else {
        setIsUserLoggedIn(false);
      }
    };
    attemptRefresh();
  }, [refreshToken]);

  return {
    isUserLoggedIn,
  };
};

export default useAttemptLogin;
