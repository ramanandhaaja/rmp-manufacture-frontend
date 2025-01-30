import { useCallback } from "react";
import { formatDate } from "utils/helpers";
import TableListDropdown from "components/template/TableListDropdown";
import { useNavigate } from "react-router-dom";
import capitalize from "components/ui/utils/capitalize";
import { findDepartement } from "utils/helpers";
import { getStatusClassName } from "utils/helpers";

const useColumns = (
  setIsOpen,
  setIsOpenStatus,
  setIsOpenDelete,
  setId,
  setEditingItem
) => {
  const navigate = useNavigate();

  const columnsDepartment = useCallback(
    () => [
      {
        Header: "ID",
        accessor: "id",
        Cell: ({ row }) => row.original.id,
      },
      {
        Header: "Item Permintaan",
        accessor: "total_items",
        Cell: ({ row }) => row.original.total_items,
      },
      {
        Header: "Tanggal Permintaan",
        accessor: "request_date",
        Cell: ({ row }) => {
          return formatDate(row.original.request_date);
        },
      },
      {
        Header: "Tanggal Persetujuan",
        accessor: "approval_date",
        Cell: ({ row }) => {
          return formatDate(row.original.approval_date);
        },
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ row }) => (
          <span
            className={`px-2 py-1 rounded-full text-xs ${getStatusClassName(
              row.original.status
            )}`}
          >
            {capitalize(row.original.status)}
          </span>
        ),
      },
      {
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
                  console.log(row.original.id);
                  setId(row.original.id);
                },
              },
            ]}
            placement="center-end"
          />
        ),
      },
    ],
    [navigate, setIsOpen, setId]
  );

  const columnsPpic = useCallback(
    () => [
      {
        Header: "ID",
        accessor: "id",
        Cell: ({ row }) => row.original.id,
      },
      {
        Header: "Item Permintaan",
        accessor: "total_items",
        Cell: ({ row }) => row.original.total_items,
      },

      {
        Header: "Departemen",
        accessor: "department_id",
        Cell: ({ row }) => findDepartement(row.original.department_id) || "-",
      },
      {
        Header: "HOD",
        accessor: "hod",
        Cell: ({ row }) => row.original.hod || "-",
      },
      {
        Header: "Tanggal Permintaan",
        accessor: "request_date",
        Cell: ({ row }) => {
          return formatDate(row.original.request_date);
        },
      },
      {
        Header: "Tanggal Persetujuan",
        accessor: "approval_date",
        Cell: ({ row }) => {
          return formatDate(row.original.approval_date);
        },
      },
      {
        Header: "Dibeli Oleh",
        accessor: "buyer",
        Cell: ({ row }) => {
          return row.original.buyer || "-";
        },
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ row }) => (
          <span
            className={`px-2 py-1 rounded-full text-xs ${getStatusClassName(
              row.original.status
            )}`}
          >
            {capitalize(row.original.status)}
          </span>
        ),
      },
      {
        accessor: "action",
        Cell: ({ row }) => {
          const renderDropdown = () => {
            if (row.original.buyer === null) {
              return [
                {
                  label: "Follow-up Permintaan",
                  onClick: () =>
                    `/purchase/request/detail/follow-up/${row.original.id}`,
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
              placement="center-end"
            />
          );
        },
      },
    ],
    [navigate, setIsOpen, setId]
  );

  const columnsFactoryManager = useCallback(
    () => [
      {
        Header: "ID",
        accessor: "id",
        Cell: ({ row }) => row.original.id,
      },

      {
        Header: "Departemen",
        accessor: "department_id",
        Cell: ({ row }) => findDepartement(row.original.department_id),
      },
      {
        Header: "HOD",
        accessor: "hod",
        Cell: ({ row }) => row.original.hod || "-",
      },
      {
        Header: "Tanggal Permintaan",
        accessor: "request_date",
        Cell: ({ row }) => {
          return formatDate(row.original.request_date);
        },
      },
      {
        Header: "Tanggal Persetujuan",
        accessor: "approval_date",
        Cell: ({ row }) => {
          return formatDate(row.original.approval_date);
        },
      },
      {
        Header: "Dibeli Oleh",
        accessor: "buyer",
        Cell: ({ row }) => row.original.buyer || "-",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ row }) => (
          <span
            className={`px-2 py-1 rounded-full text-xs ${getStatusClassName(
              row.original.status
            )}`}
          >
            {capitalize(row.original.status)}
          </span>
        ),
      },
      {
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
                placement="center-end"
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
              placement="center-end"
            />
          );
        },
      },
    ],
    [navigate, setIsOpen, setId]
  );

  const columnsItemPurchase = useCallback(
    () => [
      {
        Header: "Kode",
        accessor: "id",
        Cell: ({ row }) => row.original.goods_id,
      },
      {
        Header: "Barang",
        accessor: "goods",
        Cell: ({ row }) => row.original.goods_name,
      },
      {
        Header: "Kategori Barang",
        accessor: "goods_category",
        Cell: ({ row }) => row.original.goods_category_name,
      },
      {
        Header: "Quantity",
        accessor: "quantity",
        Cell: ({ row }) => row.original.quantity,
      },
      {
        Header: "UOM",
        accessor: "measurement",
        Cell: ({ row }) =>
          row.original.measurement.label || row.original.measurement,
      },

      {
        accessor: "action",
        Cell: ({ row }) => (
          <TableListDropdown
            dropdownItemList={[
              {
                label: "Edit",
                onClick: () => {
                  setIsOpen(true);
                  setEditingItem(row.original);
                },
              },
              {
                label: "Delete",
                onClick: () => {
                  setIsOpenDelete(true);
                  setId(row.original.id);
                },
              },
            ]}
            placement="center-end"
          />
        ),
      },
    ],
    [setIsOpen, setIsOpenDelete, setId, setEditingItem]
  );

  return {
    columnsDepartment,
    columnsPpic,
    columnsItemPurchase,
    columnsFactoryManager,
  };
};

export default useColumns;
