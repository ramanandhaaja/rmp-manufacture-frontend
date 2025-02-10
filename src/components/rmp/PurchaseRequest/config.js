export const getColumnConfig = (userRole) => {
  if (userRole.includes("department")) {
    return [
      {
        key: "id",
        label: "ID Request",
        sortable: true,
        width: "100px",
        is_show: true,
        type: "id",
      },
      {
        key: "total_items",
        label: "Item Permintaan",
        sortable: false,
        width: "100px",
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
        key: "status",
        label: "Status",
        sortable: false,
        width: "120px",
        is_show: true,
        type: "status",
      },
    ];
  }

  if (userRole.includes("ppic")) {
    return [
      {
        key: "id",
        label: "ID Request",
        sortable: true,
        width: "150px",
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
    ];
  }

  // Default fields for other roles
  return [
    {
      key: "id",
      label: "ID Request",
      sortable: true,
      width: "100px",
      is_show: true,
      type: "id",
    },
    {
      key: "total_items",
      label: "Item Permintaan",
      sortable: false,
      width: "100px",
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
      key: "status",
      label: "Status",
      sortable: false,
      width: "120px",
      is_show: true,
      type: "status",
    },
  ];
};

export const PageConfig = (userRole) => ({
  moduleTitle: "Purchase",
  pageTitle: "Permintaan Pembelian",
  baseEndpoint: "/purchase/request",
  primaryKey: "id",
  pageCreate: "/purchase/request/tambah",
  enableSearchTools: true,
  enableExportTools: true,
  enableFilterTools: true,
  enableColumnTools: false,
  enableActions: true,
  enableCreate: userRole.some((role) => ["department", "ppic"].includes(role)),
  enableDetails: true,
  enableEdit: false,
  enableDelete: true,
  enableBulkDelete: false,
  enablePagination: true,
  enableLimitPerPage: true,
  enableRefreshTable: true,
  listFields: getColumnConfig(userRole),
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
});
