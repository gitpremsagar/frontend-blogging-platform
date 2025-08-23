"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAuthState } from "@/redux/authSlice";
import {axiosWithCredentials} from "@/lib/custom-axios-request";
import { API_ROUTES } from "@/lib/constants";
import { setUser } from "@/redux/userSlice";

const useRefreshAccessToken = () => {
    
    const dispatch = useDispatch();
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [refreshRejected, setRefreshRejected] = useState(false);
    const [isRefreshed, setIsRefreshed] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const refreshToken = async () => {
        console.log("useRefreshAccessToken called");
        try {
            setIsRefreshing(true);
            setError(null);
            setRefreshRejected(false);
            setIsRefreshed(false);
            
            const response = await axiosWithCredentials.post(API_ROUTES.auth.refreshAccessToken);
            console.log("response from refresh token", response);
            if (response.data.accessToken) {
                dispatch(setAuthState({
                    isAuthenticated: true,
                    accessToken: response.data.accessToken,
                }));
                dispatch(setUser({...response.data.user}));
                setIsRefreshed(true);
            }
        } catch (error) {
            console.log("error from refresh token\n", error);
            setError(error instanceof Error ? error.message : "Failed to refresh access token");
            setRefreshRejected(true);
        } finally {
            setIsRefreshing(false);
        }
    };
    
    return { refreshToken, isRefreshing, error, refreshRejected, isRefreshed };
};

export default useRefreshAccessToken;