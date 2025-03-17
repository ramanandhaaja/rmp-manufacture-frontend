export const PageConfig = {
  moduleTitle: "Trial Formula",
  pageTitle: "Trial Formula",
  baseEnpoint: "research-development/trial-formulasi",
  pageCreate: "/research-development/trial-formulasi/trial-formula/add",
  primaryKey: "id",
  maxBottomIndexDropdown: 2,
  enableExportTools: false,
  enableFilterTools: false,
  enableColumnTools: false,
  enableActions: true,
  enableCreate: true,
  enableDetails: true,
  enableEdit: true,
  enableDelete: true,
  enableBulkDelete: true,
  enablePagination: true,
  enableLimitPerPage: true,
  enableRefreshTable: false,
  listFields: [
    {
      key: "name",
      label: "Nama Trial",
      sortable: true,
      width: "auto",
      is_show: true,
      type: "id",
    },
    {
      key: "version",
      label: "Versi",
      sortable: true,
      width: "auto",
      is_show: true,
    },
    {
      key: "procedure",
      label: "Prosedur",
      sortable: false,
      width: "auto",
      is_show: true,
    },
    {
      key: "updated_at",
      label: "Pembaruan Terakhir",
      sortable: false,
      width: "auto",
      is_show: true,
    },
    {
      key: "status",
      label: "Status",
      sortable: false,
      width: "auto",
      is_show: true,
    },
  ],
};
