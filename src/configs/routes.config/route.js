import React from "react";
import { ROLES } from "constants/roles.constant";

export const ROUTE_LIST = [
  {
    key: "base.users",
    path: "/base/users",
    component: React.lazy(() => import("views/BaseUsers")),
    authority: [],
  },
  {
    key: "accessDenied",
    path: `/access-denied`,
    component: React.lazy(() => import("views/auth/access/denied")),
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
    authority: [ROLES.Procurement, ROLES.Department],
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
    authority: [ROLES.Procurement, ROLES.Department],
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
    // authority: [!ROLES.Procurement, !ROLES.Bod],
  },
  {
    key: "purchase.request.add",
    path: "/purchase/request/tambah",
    component: React.lazy(() => import("views/PurchaseRequest/AddPurchaseReq")),
    authority: [],
  },
  {
    key: "purchase.request.edit",
    path: "/purchase/request/edit/:id",
    component: React.lazy(() =>
      import("views/PurchaseRequest/EditPurchaseReq")
    ),
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
  {
    key: "purchase.request.detail.followUp",
    path: "/purchase/request/detail/follow-up/:id",
    component: React.lazy(() =>
      import("views/PurchaseRequest/DetailPurchaseReq")
    ),
    authority: [],
  },
  {
    key: "purchase.request.antrianBarang",
    path: "/purchase/request/antrian-barang",
    component: React.lazy(() => import("views/PurchaseProcurement/ItemQueues")),
    authority: [],
  },
  {
    key: "purchase.procurement",
    path: "/purchase/pengadaan",
    component: React.lazy(() => import("views/PurchaseProcurement")),
    authority: [ROLES.Procurement, ROLES.Bod],
  },
  {
    key: "purchase.procurement.process",
    path: "/purchase/pengadaan/proses-po/:id",
    component: React.lazy(() =>
      import("views/PurchaseProcurement/ProcessPurchaseOrder")
    ),
    authority: [ROLES.Procurement],
  },
  {
    key: "purchase.procurement.detail.vendorOffer.add",
    path: "/purchase/pengadaan/tambah-penawaran-vendor/:id",
    component: React.lazy(() =>
      import("views/PurchaseProcurement/VendorOffer")
    ),
    authority: [ROLES.Procurement],
  },
  {
    key: "purchase.procurement.detail.vendorOffer.edit",
    path: "/purchase/pengadaan/edit-penawaran-vendor/:id",
    component: React.lazy(() =>
      import("views/PurchaseProcurement/EditVendorOffer")
    ),
    authority: [ROLES.Procurement],
  },
  {
    key: "purchase.procurement.detail",
    path: "/purchase/pengadaan/detail-po/:id",
    component: React.lazy(() =>
      import("views/PurchaseProcurement/DetailPurchaseOrder")
    ),
    authority: [ROLES.Procurement, ROLES.Bod],
  },
  {
    key: "purchase.procurement.detailPenawaran",
    path: "/purchase/pengadaan/detail-penawaran-vendor/:id",
    component: React.lazy(() =>
      import("views/PurchaseProcurement/DetailVendorOffer")
    ),
    authority: [ROLES.Procurement, ROLES.Bod],
  },
  {
    key: "purchase.payment",
    path: "/purchase/pembayaran",
    component: React.lazy(() => import("views/Payment")),
    authority: [ROLES.Procurement],
  },

  {
    key: "purchase.payment.detail",
    path: "/purchase/pembayaran/detail-pembayaran/:id",
    component: React.lazy(() => import("views/Payment/DetailPayment")),
    authority: [ROLES.Procurement],
  },

  {
    key: "purchase.productR&D",
    path: "/purchase/product-r&d",
    component: React.lazy(() => import("views/R&D/PermintaanProdukR&d")),
    authority: [],
  },

  {
    key: "purchase.productR&D.addPermintaan",
    path: "/purchase/product-r&d/add",
    component: React.lazy(() => import("views/R&D/AddPermintaan")),
    authority: [],
  },
  {
    key: "purchase.productR&D.detailPermintaan",
    path: "/purchase/product-r&d/detail-permintaan/:id",
    component: React.lazy(() => import("views/R&D/DetailPermintaan")),
    authority: [],
  },

  {
    key: "purchase.productR&D.addPermintaan",
    path: "/purchase/product-r&d/tambah-permintaan",
    component: React.lazy(() => import("views/R&D/AddPermintaan")),
    authority: [],
  },

  {
    key: "researchAndDevelopment",
    path: "/research-development",
    component: React.lazy(() => import("views/R&D/index")),
    authority: [],
  },

  {
    key: "researchAndDevelopment.detailPermintaan",
    path: "/research-development/detail-permintaan/:id",
    component: React.lazy(() => import("views/R&D/DetailPermintaan")),
    authority: [],
  },

  {
    key: "researchAndDevelopment.productR&D.detailPengembangan",
    path: "/research-development/detail-pengembangan/:id",
    component: React.lazy(() => import("views/R&D/DetailPengembangan")),
    authority: [],
  },

  {
    key: "researchAndDevelopment.qttp",
    path: "/research-development/pra-formulasi/qttp",
    component: React.lazy(() => import("views/R&D/PraFormulasi/Qttp")),
    authority: [],
  },
  {
    key: "researchAndDevelopment.cqa",
    path: "/research-development/pra-formulasi/cqa",
    component: React.lazy(() => import("views/R&D/PraFormulasi/CQA")),
    authority: [],
  },
  {
    key: "researchAndDevelopment.cma",
    path: "/research-development/pra-formulasi/cma",
    component: React.lazy(() => import("views/R&D/PraFormulasi/CMA")),
    authority: [],
  },
  {
    key: "researchAndDevelopment.cpp",
    path: "/research-development/pra-formulasi/cpp",
    component: React.lazy(() => import("views/R&D/PraFormulasi/CPP")),
    authority: [],
  },
  {
    key: "researchAndDevelopment.technicalFeasibility",
    path: "/research-development/pra-formulasi/technical-feasibility",
    component: React.lazy(() =>
      import("views/R&D/PraFormulasi/TechnicalFeasibility")
    ),
    authority: [],
  },
];
