export const PageConfig = {
  moduleTitle: "R&D",
  pageTitle: "Permintaan Pengembangan Produk",
  baseEnpoint: "/purchase/product-r&d",
  pageCreate: "/purchase/product-r&d/tambah-permintaan",
  primaryKey: "id",
  maxBottomIndexDropdown: 2,
  enableSearchTools: true,
  enableExportTools: true,
  enableFilterTools: true,
  enableColumnTools: true,
  enableActions: true,
  enableCreate: true,
  enableDetails: true,
  enableEdit: true,
  enableDelete: true,
  enableBulkDelete: false,
  enablePagination: true,
  enableLimitPerPage: true,
  enableRefreshTable: true,
  listFields: [
    {
      key: "id",
      label: "No PDR",
      sortable: true,
      width: "120px",
      is_show: true,
      type: "id",
    },
    {
      key: "title",
      label: "Judul Permintaan",
      sortable: true,
      width: "150px",
      is_show: true,
    },
    {
      key: "created_at",
      label: "Tanggal Permintaan",
      sortable: true,
      width: "150px",
      is_show: true,
    },
    {
      key: "launching_date",
      label: "Target Launching",
      sortable: false,
      width: "150px",
      is_show: true,
    },
    {
      key: "approved_date",
      label: "Tanggal Persetujuan",
      sortable: false,
      width: "120px",
      is_show: true,
    },
    {
      key: "priority",
      label: "Prioritas",
      sortable: true,
      width: "180px",
      is_show: true,
      type: "date",
    },
    {
      key: "document",
      label: "Dokumen",
      sortable: false,
      width: "100px",
      is_show: true,
      type: "date",
    },

    {
      key: "status",
      label: "Status",
      sortable: false,
      width: "180px",
      is_show: true,
      type: "status",
    },
  ],
  formFilterFields: [
    {
      key: "department_id",
      label: "Departemen",
      type: "select",
      rules: [],
    },
    {
      key: "category",
      label: "Kategori",
      type: "select",
      rules: [],
    },
    {
      key: "po_type",
      label: "Tipe",
      type: "select",
      rules: [],
    },
    {
      key: "po_date",
      label: "Tanggal Request",
      type: "daterange",
      rules: [],
    },
    {
      key: "status",
      label: "Status",
      type: "select",
      rules: [],
    },
  ],
};

export const PageConfigDevelopment = {
  moduleTitle: "R&D",
  pageTitle: "Permintaan Pengembangan Produk",
  baseEnpoint: "/purchase/product-r&d",
  primaryKey: "id",
  maxBottomIndexDropdown: 2,
  enableSearchTools: true,
  enableExportTools: true,
  enableFilterTools: true,
  enableColumnTools: true,
  enableActions: false,
  enableCreate: false,
  enableDetails: true,
  enableEdit: true,
  enableDelete: true,
  enableBulkDelete: false,
  enablePagination: true,
  enableLimitPerPage: true,
  enableRefreshTable: true,
  listFields: [
    {
      key: "id",
      label: "No PDR",
      sortable: true,
      width: "120px",
      is_show: true,
      type: "id",
    },
    {
      key: "title",
      label: "Judul Permintaan",
      sortable: true,
      width: "150px",
      is_show: true,
    },
    {
      key: "created_at",
      label: "Tanggal Permintaan",
      sortable: true,
      width: "150px",
      is_show: true,
    },

    {
      key: "approved_date",
      label: "Tanggal Persetujuan",
      sortable: false,
      width: "120px",
      is_show: true,
    },

    {
      key: "progress",
      label: "Status",
      sortable: false,
      width: "180px",
      is_show: true,
      type: "status",
    },
  ],
  formFilterFields: [
    {
      key: "department_id",
      label: "Departemen",
      type: "select",
      rules: [],
    },
    {
      key: "category",
      label: "Kategori",
      type: "select",
      rules: [],
    },
    {
      key: "po_type",
      label: "Tipe",
      type: "select",
      rules: [],
    },
    {
      key: "po_date",
      label: "Tanggal Request",
      type: "daterange",
      rules: [],
    },
    {
      key: "status",
      label: "Status",
      type: "select",
      rules: [],
    },
  ],
};
