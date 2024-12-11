const useUser = () => {
  const getUser = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    return user;
  };
  return {
    getUser,
  };
};
export default useUser;
