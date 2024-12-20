import React from "react";

export const ROUTE_LIST = [
  {
    key: "base.users",
    path: "/base/users",
    component: React.lazy(() => import("views/BaseUsers")),
    authority: [],
  },
  {
    key: "vendorManagement",
    path: "/vendor-management",
    component: React.lazy(() => import("views/VendorManagement")),
    authority: [],
  },
  {
    key: "vendorManagement.addVendor",
    path: "/vendor-management/tambah-vendor",
    component: React.lazy(() => import("views/VendorManagement/AddVendor")),
    authority: [],
  },
  {
    key: "vendorManagement.detailVendor",
    path: "/vendor-management/detail-vendor/:id",
    component: React.lazy(() => import("views/VendorManagement/DetailVendor")),
    authority: [],
  },
  {
    key: "vendorManagement.editVendor",
    path: "/vendor-management/edit-vendor/:id",
    component: React.lazy(() => import("views/VendorManagement/EditVendor")),
    authority: [],
  },
  {
    key: "masterData.barangPurchase",
    path: "/master-data/barang-purchase",
    component: React.lazy(() => import("views/masterDataGoods")),
    authority: [],
  },
  {
    key: "masterData.barangPurchase.add",
    path: "/master-data/barang-purchase/tambah-barang-purchase",
    component: React.lazy(() => import("views/masterDataGoods/AddGoods")),
    authority: [],
  },
  {
    key: "purchase.request",
    path: "/purchase/request",
    component: React.lazy(() => import("views/PurchaseRequest")),
    authority: [],
  },
];
