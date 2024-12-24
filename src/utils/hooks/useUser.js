import { useDispatch, useSelector } from "react-redux";
import { setUser, setUserRole } from "../../store/auth/userSlice";

const useUser = () => {
  const dispatch = useDispatch();
  const { user, userRole } = useSelector((state) => state.auth.user);

  const getUser = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      dispatch(setUser(userData));
      const role = userData.roles?.map((role) => role);
      dispatch(setUserRole(role));
    }
    return {
      status: "success",
      message: "",
    };
  };

  return {
    getUser,
    user,
    userRole,
  };
};
export default useUser;
