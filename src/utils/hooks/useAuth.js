import { loginApi } from "../../services/AuthService";
import { REDIRECT_URL_KEY } from "../../const/app.constant";
import appConfig from "../../config/app.config";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  onSignInSuccess,
  onSignOutSuccess,
} from "../../store/Auth/sessionSlice";
import { setUser, userLoggedOut } from "../../store/Auth/userSlice";

function useAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [query] = useSearchParams();
  const { token, signedIn, refreshToken } = useSelector(
    (state) => state.auth.session
  );

  const signIn = async (values) => {
    try {
      const resp = await loginApi(values);
      // console.log(resp.data.data);
      if (resp.data) {
        const { token } = resp.data.data;
        const { user } = resp.data.data;
        dispatch(onSignInSuccess({ token: token }));
        dispatch(setUser({ user: user }));
        const redirectUrl = query.get(REDIRECT_URL_KEY);
        window.localStorage.setItem("isLogin", true);
        window.localStorage.setItem("user", JSON.stringify(user));
        window.localStorage.setItem("token", token);

        navigate(redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath);
        return {
          status: "success",
          message: "",
        };
      }
      navigate(appConfig.authenticatedEntryPath);
    } catch (errors) {
      return {
        status: "failed",
        message: errors?.response?.data?.message || errors.toString(),
      };
    }
  };

  const handleSignOut = () => {
    window.localStorage.setItem("isLogin", false);
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("token");

    dispatch(onSignOutSuccess());
    dispatch(userLoggedOut());
    navigate(appConfig.unAuthenticatedEntryPath);
  };

  return {
    authenticated:
      token && signedIn && window.sessionStorage.getItem("isLogin"),
    signIn,
    handleSignOut,
    token,
    signedIn,
    refreshToken,
    userLoggedOut,
  };
}

export default useAuth;
