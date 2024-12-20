import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/auth/userSlice";

const useUser = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth.user);

  const getUser = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      dispatch(setUser(userData));
    }
    return {
      status: "success",
      message: "",
    };
  };

  return {
    getUser,
    user,
  };
};
export default useUser;
