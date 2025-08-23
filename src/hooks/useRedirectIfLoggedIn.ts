import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const useRedirectIfLoggedIn = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  // redirect to home page if user is signed in
  useEffect(() => {
    if (isAuthenticated) 
      router.push("/");
  }, [isAuthenticated]);
}

export default useRedirectIfLoggedIn;