export const PageConfig = {
  moduleTitle: "Pembayaran",
  pageTitle: "Pembayaran",
  baseEnpoint: "purchase/pembayaran",
  primaryKey: "id",
  maxBottomIndexDropdown: 2,
  enableSearchTools: true,
  enableExportTools: true,
  enableFilterTools: true,
  enableColumnTools: false,
  enableActions: true,
  enableCreate: false,
  enableDetails: true,
  enableEdit: true,
  enableDelete: true,
  enableBulkDelete: true,
  enablePagination: true,
  enableLimitPerPage: true,
  enableRefreshTable: false,
  listFields: [
    {
      key: "id",
      label: "Id",
      sortable: true,
      width: "auto",
      is_show: true,
      type: "id",
    },
    {
      key: "idPo",
      label: "Id Po",
      sortable: true,
      width: "auto",
      is_show: false,
    },
    {
      key: "namePO",
      label: "Name PO",
      sortable: true,
      width: "auto",
      is_show: false,
    },
    {
      key: "vendor",
      label: "Vendor",
      sortable: true,
      width: "auto",
      is_show: true,
    },
    {
      key: "jumlahPengeluaran",
      label: "Jumlah Pengeluaran",
      sortable: false,
      width: "auto",
      is_show: true,
    },
    {
      key: "kategori",
      label: "Kategori",
      sortable: false,
      width: "auto",
      is_show: true,
    },
    {
      key: "periode",
      label: "Periode",
      sortable: true,
      width: "auto",
      is_show: true,
    },
    {
      key: "tanggalPengajuan",
      label: "Tanggal Pengajuan",
      sortable: true,
      width: "auto",
      is_show: true,
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      width: "auto",
      is_show: true,
      type: "status",
      // sticky: "right",
    },
  ],
};
