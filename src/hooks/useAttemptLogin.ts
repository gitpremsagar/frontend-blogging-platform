import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useRefreshAccessToken from "@/hooks/useRefreshAccessToken";
import { RootState } from "@/redux/store";

const useAttemptLogin = () => {
    const dispatch = useDispatch();
    const {refreshToken, isRefreshing, error, refreshRejected, isRefreshed} = useRefreshAccessToken();
    const user = useSelector((state: RootState) => state.user);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    

    useEffect(() => {
        console.log("useAttemptLogin called");
        console.log("userstate in redux store :", user);
        refreshToken();
    }, []);

    return {
        isUserLoggedIn,
    }
}

export default useAttemptLogin;