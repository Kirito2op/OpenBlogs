import {create} from 'zustand';
import Cookies from "js-cookie";

const useAuthStore = create((set) => ({
    isAuth: (Cookies.get("auth")) ? true : false,
    authdata: (Cookies.get("auth")) ? JSON.parse(Cookies.get("auth")) : {},
    isLoadingCookie: false,
    setIsAuth: (isAuth) => set({isAuth}),
    setAuthData : (id , username , token) => set({authdata: {id, username, token}}),
    setIsLoadingCookie: (isLoading) => set({isLoading})
}));

export default useAuthStore;