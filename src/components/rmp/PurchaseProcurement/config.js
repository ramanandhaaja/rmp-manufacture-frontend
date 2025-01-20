export const PageConfigReqList = {
  moduleTitle: "Procurement",
  pageTitle: "Procurement Request",
  baseEnpoint: "/procurement/requests",
  primaryKey: "id",
  maxBottomIndexDropdown: 2,
  enableSearchTools: true,
  enableExportTools: true,
  enableFilterTools: true,
  enableColumnTools: false,
  enableActions: true,
  enableCreate: false,
  enableDetails: true,
  enableEdit: false,
  enableDelete: false,
  enableBulkDelete: false,
  enablePagination: true,
  enableLimitPerPage: true,
  enableRefreshTable: false,
  listFields: [
    {
      key: "id",
      label: "ID Request",
      sortable: false,
      width: "120px",
      is_show: true,
      type: "id",
    },
    {
      key: "total_items",
      label: "Item Permintaan",
      sortable: false,
      width: "150px",
      is_show: true,
    },
    {
      key: "department_id",
      label: "Departemen",
      sortable: true,
      width: "150px",
      is_show: true,
    },
    {
      key: "hod",
      label: "HOD",
      sortable: false,
      width: "120px",
      is_show: true,
    },
    {
      key: "request_date",
      label: "Tanggal Permintaan",
      sortable: true,
      width: "180px",
      is_show: true,
      type: "date",
    },
    {
      key: "approval_date",
      label: "Tanggal Persetujuan",
      sortable: true,
      width: "180px",
      is_show: true,
      type: "date",
    },
    {
      key: "buyer",
      label: "Dibeli Oleh",
      sortable: false,
      width: "150px",
      is_show: true,
    },
    {
      key: "status",
      label: "Status",
      sortable: false,
      width: "120px",
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
      key: "request_date",
      label: "Tanggal Permintaan",
      type: "daterange",
      rules: [],
    },
    {
      key: "approval_date",
      label: "Tanggal Persetujuan",
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

export const PageConfigOrderList = {
  moduleTitle: "Procurement",
  pageTitle: "Purchase Order",
  baseEnpoint: "/procurement/orders",
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
      label: "ID PO",
      sortable: true,
      width: "120px",
      is_show: true,
      type: "id",
    },
    {
      key: "po_name",
      label: "Nama PO",
      sortable: true,
      width: "150px",
      is_show: true,
    },
    {
      key: "department_id",
      label: "Departemen",
      sortable: true,
      width: "150px",
      is_show: true,
    },
    {
      key: "category",
      label: "Kategori",
      sortable: false,
      width: "150px",
      is_show: true,
    },
    {
      key: "po_type",
      label: "Tipe",
      sortable: false,
      width: "120px",
      is_show: true,
    },
    {
      key: "po_date",
      label: "Tanggal Request PO",
      sortable: true,
      width: "180px",
      is_show: true,
      type: "date",
    },
    {
      key: "status",
      label: "Status",
      sortable: false,
      width: "120px",
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
