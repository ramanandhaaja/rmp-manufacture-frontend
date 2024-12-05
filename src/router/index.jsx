import { createBrowserRouter } from "react-router-dom";
import RNDPages from "../pages/RNDPages";
import TestPage from "../pages/TestPage";
import VendorManagement from "../pages/vendorManagement/index";
import AddVendorPage from "../pages/vendorManagement/AddVendorPage";
import DetailVendorPage from "../pages/vendorManagement/DetailVendorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RNDPages />,
  },
  {
    path: "/test",
    element: <TestPage />,
  },
  {
    path: "/vendor-management/vendor-list",
    element: <VendorManagement />,
  },
  {
    path: "/vendor-management/add-vendor",
    element: <AddVendorPage />,
  },
  {
    path: "/vendor-management/detail-vendor",
    element: <DetailVendorPage />,
  },
]);

export default router;
