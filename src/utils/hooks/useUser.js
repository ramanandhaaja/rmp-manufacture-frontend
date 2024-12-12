import { useDispatch, useSelector } from "react-redux";
import { onSignInSuccess } from "../../store/Auth/sessionSlice";

const useUser = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth.session);

  const getUser = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    dispatch(onSignInSuccess({ user: user }));
    return {
      status: "success",
      message: "",
    };
  };
  return {
    getUser,
  };
};
export default useUser;
