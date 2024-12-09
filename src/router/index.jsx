import { createBrowserRouter } from "react-router-dom";
import RNDPages from "../pages/RNDPages";
import TestPage from "../pages/TestPage";
import VendorManagement from "../pages/vendorManagement/index";
import AddVendorPage from "../pages/vendorManagement/AddVendorPage";
import DetailVendorPage from "../pages/vendorManagement/DetailVendorPage";
import TipeBarangPage from "../pages/vendorManagement/TipeBarangPage";
import AddTipeBarangPage from "../pages/vendorManagement/AddTipeBarangPage";

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
    path: "/vendor-management/vendor",
    element: <VendorManagement />,
  },
  {
    path: "/vendor-management/add-vendor",
    element: <AddVendorPage />,
  },
  {
    path: "/vendor-management/detail-vendor/:id",
    element: <DetailVendorPage />,
  },
  {
    path: "/vendor-management/tipe-barang",
    element: <TipeBarangPage />,
  },
  {
    path: "/vendor-management/add-tipe-barang",
    element: <AddTipeBarangPage />,
  },
]);

export default router;
