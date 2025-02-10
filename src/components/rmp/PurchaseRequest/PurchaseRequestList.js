import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Notification, toast } from "components/ui";
import DataTable from "components/shared/DataTable";
import { Tools } from "./Tools";
import usePurchaseRequest from "utils/hooks/PurchaseRequest/usePurchaseRequest";
import { useSelector } from "react-redux";
import useColumns from "utils/hooks/PurchaseRequest/useColumn";
import TableListDropdown from "components/template/TableListDropdown";
import ConfirmationCustom from "components/custom/ConfirmationCustom";
import ModalStatusInput from "components/custom/ModalStatusInput";
import { PageConfig, getColumnConfig } from "./config";
import useUser from "utils/hooks/useUser";
import { findDepartement, getStatusClassName, formatDate } from "utils/helpers";
import capitalize from "components/ui/utils/capitalize";

const PurchaseRequestList = () => {
  const navigate = useNavigate();
  const [localState, setLocalState] = useState({
    params: {
      page: 1,
      per_page: 10,
      q: "",
      options: {},
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState(null);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenStatus, setIsOpenStatus] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const { getPurchaseReqList, deletePurchaseReq, updatePurchaseReqStatus } =
    usePurchaseRequest();
  const { goodsType } = useSelector((state) => state.goodsType);
  const { userRole } = useUser();
  const pageConfig = PageConfig(userRole);

  const getActionColumn = () => {
    if (userRole.includes("department")) {
      return {
        Header: "Action",
        accessor: "action",
        Cell: ({ row }) => (
          <TableListDropdown
            dropdownItemList={[
              {
                label: "Lihat Detail",
                onClick: () =>
                  navigate(`/purchase/request/detail/${row.original.id}`),
              },
              {
                label: "Edit",
                // onClick: () =>
                //   navigate(`/vendor-management/edit-vendor/${row.original.id}`),
              },
              {
                label: "Delete",
                onClick: () => {
                  setIsOpen(true);
                  setId(row.original.id);
                },
              },
            ]}
            placement={
              localState.params.data.length > 1 && row.index < 1
                ? "bottom-end"
                : "top-end"
            }
          />
        ),
      };
    }

    if (userRole.includes("ppic")) {
      return {
        Header: "Action",
        accessor: "action",
        Cell: ({ row }) => {
          const renderDropdown = () => {
            if (row.original.buyer === null) {
              return [
                {
                  label: "Follow-up Permintaan",
                  onClick: () =>
                    navigate(
                      `/purchase/request/detail/follow-up/${row.original.id}`
                    ),
                },
                {
                  label: "Lihat Detail",
                  onClick: () =>
                    navigate(`/purchase/request/detail/${row.original.id}`),
                },
                {
                  label: "Delete",
                  onClick: () => {
                    setIsOpen(true);
                    setId(row.original.id);
                  },
                },
              ];
            } else {
              return [
                {
                  label: "Lihat Detail",
                  onClick: () =>
                    navigate(`/purchase/request/detail/${row.original.id}`),
                },
                {
                  label: "Delete",
                  onClick: () => {
                    setIsOpen(true);
                    setId(row.original.id);
                  },
                },
              ];
            }
          };

          return (
            <TableListDropdown
              dropdownItemList={renderDropdown()}
              placement={
                localState.params.data.length > 1 && row.index < 1
                  ? "bottom-end"
                  : "top-end"
              }
            />
          );
        },
      };
    }

    if (userRole.includes("factoryManager")) {
      return {
        Header: "Action",
        accessor: "action",
        Cell: ({ row }) => {
          const { status } = row.original;
          if (status === "approved") {
            return (
              <TableListDropdown
                dropdownItemList={[
                  {
                    label: "Lihat Detail",
                    onClick: () =>
                      navigate(`/purchase/request/detail/${row.original.id}`),
                  },
                ]}
                placement={
                  localState.params.data.length > 1 && row.index < 1
                    ? "bottom-end"
                    : "top-end"
                }
              />
            );
          }
          return (
            <TableListDropdown
              dropdownItemList={[
                {
                  label: "Konfirmasi Permintaan",
                  onClick: () => {
                    setIsOpenStatus(true);
                    setId(row.original.id);
                  },
                },
                {
                  label: "Lihat Detail",
                  onClick: () =>
                    navigate(`/purchase/request/detail/${row.original.id}`),
                },
              ]}
              placement={
                localState.params.data.length > 1 && row.index < 1
                  ? "bottom-end"
                  : "top-end"
              }
            />
          );
        },
      };
    }

    if (userRole.includes("viewOnly")) {
      return {
        Header: "Action",
        accessor: "action",
        Cell: ({ row }) => (
          <TableListDropdown
            dropdownItemList={[
              {
                label: "Lihat Detail",
                onClick: () =>
                  navigate(`/purchase/request/detail/${row.original.id}`),
              },
            ]}
            placement={
              localState.params.data.length > 1 && row.index < 1
                ? "bottom-end"
                : "top-end"
            }
          />
        ),
      };
    }

    return {
      Header: "Action",
      accessor: "action",
      Cell: ({ row }) => (
        <TableListDropdown
          placement={
            localState.params.data.length > 1 && row.index < 1
              ? "bottom-end"
              : "top-end"
          }
          dropdownItemList={[
            {
              label: "Lihat Detail",
              onClick: () =>
                navigate(`/purchase/request/detail/${row.original.id}`),
            },
          ]}
        />
      ),
    };
  };

  const getColumns = (userRole) => {
    const columnConfig = getColumnConfig(userRole);

    const columns = columnConfig.map((field) => ({
      Header: field.label,
      accessor: field.key,
      sortable: field.sortable,
      width: field.width,
      Cell: ({ row }) => {
        const value = row.original[field.key];
        switch (field.key) {
          case "department_id":
            return findDepartement(value);
          case "request_date":
          case "approval_date":
            return formatDate(value);
          case "buyer":
            return value || "-";
          case "hod":
            return value || "-";
          case "status":
            return (
              <span
                className={`px-2 py-1 rounded-full text-xs ${getStatusClassName(
                  value
                )}`}
              >
                {capitalize(value)}
              </span>
            );
          default:
            return value;
        }
      },
    }));

    if (pageConfig.enableActions) {
      columns.push(getActionColumn());
    }

    return columns;
  };

  const fetchData = async (params = localState.params) => {
    setIsLoading(true);
    try {
      const response = await getPurchaseReqList(goodsType);

      setLocalState((prev) => ({
        ...prev,
        params: {
          ...params,
          total: response.data?.total,
          per_page: response.data?.per_page,
          data: response.data?.data,
        },
      }));
    } catch (error) {
      console.error("Error fetching purchase requests:", error);
      toast.push(
        <Notification type="danger" title="Gagal memuat data permintaan" />,
        {
          placement: "top-center",
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [goodsType]);

  const handlePaginationChange = (page) => {
    fetchData({
      ...localState.params,
      page,
    });
  };

  const handlePageSizeChange = (size) => {
    fetchData({
      ...localState.params,
      per_page: size,
      page: 1,
    });
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const response = await deletePurchaseReq(selectedId);

      if (response.status === "success") {
        toast.push(<Notification type="success" title={response.message} />, {
          placement: "top-center",
        });
        fetchData();
      }
    } finally {
      setIsLoading(false);
      setIsOpenDelete(false);
    }
  };

  const handleStatusUpdate = async (values) => {
    try {
      setIsLoading(true);
      const response = await updatePurchaseReqStatus(selectedId, {
        status: values.status.value,
      });

      if (response.status === "success") {
        toast.push(<Notification type="success" title={response.message} />, {
          placement: "top-center",
        });
        fetchData();
      }
    } finally {
      setIsLoading(false);
      setIsOpenStatus(false);
    }
  };

  return (
    <div className="space-y-4">
      <Tools
        localState={localState}
        getData={fetchData}
        deleteIds={selectedIds}
        setIds={setSelectedIds}
        pageConfig={pageConfig}
        onAddNew={() => navigate("/purchase/request/tambah")}
        addBtnTitle="Permintaan Pembelian Baru"
      />

      <DataTable
        columns={getColumns(userRole)}
        data={localState.params.data || []}
        loading={isLoading}
        pagingData={{
          total: localState.params.total || 0,
          pageIndex: localState.params.page,
          pageSize: localState.params.per_page,
        }}
        onPaginationChange={handlePaginationChange}
        onSelectChange={handlePageSizeChange}
        selectable={pageConfig.enableBulkDelete}
        onCheckBoxChange={(checked, row) => {
          setSelectedIds((prev) =>
            checked ? [...prev, row.id] : prev.filter((id) => id !== row.id)
          );
        }}
        showPagination={pageConfig.enablePagination}
        showLimitPerPage={pageConfig.enableLimitPerPage}
      />

      <ConfirmationCustom
        isOpen={isOpenDelete}
        onClose={() => setIsOpenDelete(false)}
        onConfirm={handleDelete}
        title="Konfirmasi Hapus"
        text="Anda yakin akan menghapus data ini?"
        confirmText="Hapus"
        isLoading={isLoading}
      />

      <ModalStatusInput
        isOpen={isOpenStatus}
        onClose={() => setIsOpenStatus(false)}
        onSave={handleStatusUpdate}
        title="Konfirmasi Status"
        text="Pilih status baru untuk permintaan ini"
        confirmText="Simpan Perubahan"
        isLoading={isLoading}
      />
    </div>
  );
};

export default PurchaseRequestList;
