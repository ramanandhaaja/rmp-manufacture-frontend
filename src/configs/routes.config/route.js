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
    key: "masterData.kategoriBarang",
    path: "/master-data/kategori-barang",
    component: React.lazy(() => import("views/masterGoodsCategory")),
    authority: [],
  },
  {
    key: "masterData.kategoriBarang.add",
    path: "/master-data/kategori-barang/tambah-kategori-barang",
    component: React.lazy(() =>
      import("views/masterGoodsCategory/AddGoodsCategory")
    ),
    authority: [],
  },
  {
    key: "purchase.request",
    path: "/purchase/request",
    component: React.lazy(() => import("views/PurchaseRequest")),
    authority: [],
  },
  {
    key: "purchase.request.add",
    path: "/purchase/request/tambah",
    component: React.lazy(() => import("views/PurchaseRequest/AddPurchaseReq")),
    authority: [],
  },
  {
    key: "purchase.request.detail",
    path: "/purchase/request/detail/:id",
    component: React.lazy(() =>
      import("views/PurchaseRequest/DetailPurchaseReq")
    ),
    authority: [],
  },
  {
    key: "purchase.request.detail.informasi",
    path: "/purchase/request/detail/informasi-pembelian/:id",
    component: React.lazy(() =>
      import("views/PurchaseRequest/InformasiPembelian")
    ),
    authority: [],
  },
];
