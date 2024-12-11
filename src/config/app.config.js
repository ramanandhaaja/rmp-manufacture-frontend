import { API_URL } from "../const/api.constant";

const appConfig = {
  apiPrefix: API_URL,
  authenticatedEntryPath: "/vendor-management/vendor",
  unAuthenticatedEntryPath: "/login",
  tourPath: "/",
  enableMock: false,
};

export default appConfig;
