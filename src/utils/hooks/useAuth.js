import { loginApi } from "../../services/AuthService";
import { REDIRECT_URL_KEY } from "../../const/app.constant";
import appConfig from "../../config/app.config";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  onSignInSuccess,
  onSignOutSuccess,
} from "../../store/Auth/sessionSlice";

const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [query] = useSearchParams();
  const { token, signedIn, refreshToken, user } = useSelector(
    (state) => state.auth.session
  );

  const { roles } = useSelector((state) => state.auth.user);
  const signIn = async (values) => {
    try {
      const resp = await loginApi(values);
      // console.log(resp.data.data);
      if (resp.data) {
        const { token } = resp.data.data;
        const { user } = resp.data.data;
        dispatch(onSignInSuccess({ token }));
        const redirectUrl = query.get(REDIRECT_URL_KEY);
        window.sessionStorage.setItem("isLogin", true);
        window.sessionStorage.setItem("user", JSON.stringify(user));

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
    window.sessionStorage.setItem("isLogin", false);
    window.sessionStorage.removeItem("user");
    dispatch(onSignOutSuccess());
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
    user,
    roles,
  };
};

export default useAuth;
