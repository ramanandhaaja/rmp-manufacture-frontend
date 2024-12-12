import { createBrowserRouter } from "react-router-dom";
import RNDPages from "../pages/RNDPages";
import TestPage from "../pages/TestPage";
import VendorManagement from "../pages/vendorManagement/index";
import AddVendorPage from "../pages/vendorManagement/AddVendorPage";
import DetailVendorPage from "../pages/vendorManagement/DetailVendorPage";
import TipeBarangPage from "../pages/vendorManagement/TipeBarangPage";
import AddTipeBarangPage from "../pages/vendorManagement/AddTipeBarangPage";
<<<<<<< Updated upstream
import LoginPage from "../pages/LoginPage";
=======
import PurchaseRequestPage from "../pages/PurchaseManagement/PurchaseRequest";
import AddPurchaseRequestPage from "../pages/PurchaseManagement/AddPurchaseRequest";
>>>>>>> Stashed changes

const router = createBrowserRouter([
  { path: "/", element: <RNDPages />, },
  {
    path: "/login",
    element: <LoginPage />,
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
    path: "/vendor-management/edit-vendor/:id",
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
  {
    path: "/vendor-management/edit-tipe-barang/:id",
    element: <AddTipeBarangPage />,
  },
  {
    path: "/purchase-management/purchase-request",
    element: <PurchaseRequestPage />,
  },
  {
    path: "/purchase-management/add-purchase-request",
    element: <AddPurchaseRequestPage />,
  },
  
]);

export default router;
