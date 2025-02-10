import { useSelector, useDispatch } from "react-redux";
import { setUser, initialState, setUserRole } from "store/auth/userSlice";
import {
  apiSignIn,
  apiSignOut,
  apiSignUp,
  apiGetMe,
  apiSignInCurrent,
} from "services/AuthService";
import { onSignInSuccess, onSignOutSuccess } from "store/auth/sessionSlice";
import appConfig from "configs/app.config";
import { REDIRECT_URL_KEY } from "constants/app.constant";
import { useNavigate } from "react-router-dom";
import useQuery from "./useQuery";

function useAuth() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const query = useQuery();

  const { access_token, refresh_token, signedIn } = useSelector(
    (state) => state.auth.session
  );
  const { user } = useSelector((state) => state.auth.user);

  const signIn = async (values) => {
    try {
      const resp = await apiSignInCurrent(values);
      console.log(resp);
      if (resp.data) {
        dispatch(
          onSignInSuccess({
            access_token: resp.data?.data.token || "",
            access_token_expires_at: resp.data?.access_token_expires_at || "",
            refresh_token: resp.data?.refresh_token || "",
            refresh_token_expires_at: resp.data?.refresh_token_expires_at || "",
            session_id: resp.data?.session_id || "",
          })
        );

        if (resp.data?.data.user) {
          dispatch(
            setUser(
              resp.data?.data.user || {
                avatar: "",
                userName: "Anonymous",
                authority: ["USER"],
                email: "",
              }
            )
          );
          localStorage.setItem("user", JSON.stringify(resp.data?.data.user));
        }
        const redirectUrl = query.get(REDIRECT_URL_KEY);
        navigate(redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath);

        navigate(appConfig.authenticatedEntryPath);

        return {
          status: "success",
          message: "",
        };
      }
    } catch (errors) {
      return {
        status: "failed",
        message: errors?.response?.data?.message || errors.toString(),
      };
    }
  };

  const getMe = async () => {
    try {
      const resp = await apiGetMe();
      if (resp.data) {
        dispatch(
          setUser({
            user: resp.data.data,
          })
        );
      }
    } catch (error) {}
  };

  const signUp = async (values) => {
    try {
      const resp = await apiSignUp(values);
      if (resp.data) {
        const { token } = resp.data;
        dispatch(onSignInSuccess(token));
        if (resp.data.user) {
          dispatch(
            setUser(
              resp.data.user || {
                avatar: "",
                userName: "Anonymous",
                authority: ["USER"],
                email: "",
              }
            )
          );
        }
        const redirectUrl = query.get(REDIRECT_URL_KEY);
        navigate(redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath);
        return {
          status: "success",
          message: "",
        };
      }
    } catch (errors) {
      return {
        status: "failed",
        message: errors?.response?.data?.message || errors.toString(),
      };
    }
  };

  const handleSignOut = () => {
    dispatch(onSignOutSuccess());
    dispatch(setUser(initialState));
    dispatch(setUserRole([]));
    localStorage.removeItem("user");
    localStorage.removeItem("admin");
    navigate(appConfig.unAuthenticatedEntryPath);
  };

  const signOut = async () => {
    await apiSignOut();
    handleSignOut();
  };

  return {
    authenticated: access_token && signedIn,
    signIn,
    signUp,
    signOut,
    getMe,
    user,
  };
}

export default useAuth;
