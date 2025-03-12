import CustomTable from "components/custom/CustomTable";
import useMasterGoods from "utils/hooks/useMasterGoods";
import { useEffect, useState } from "react";
import { formatDate } from "utils/helpers";
import { useNavigate } from "react-router-dom";
import TableListDropdown from "components/template/TableListDropdown";
import { Pagination, Alert } from "components/ui";
import ConfirmationCustom from "components/custom/ConfirmationCustom";
import TableHeader from "../TableHeader";
import { Notification, toast } from "components/ui";

const PurchaseGoodsList = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [id, setId] = useState(null);
  const { dataMasterGoods, getGoods, deleteGoods } = useMasterGoods();
  const columns = [
    {
      Header: "ID",
      accessor: "id",
      Cell: ({ row }) => row.original.id,
    },
    {
      Header: "Nama Barang",
      accessor: "name",
      Cell: ({ row }) => row.original.name,
    },
    {
      Header: "Kategori Barang",
      accessor: "category.name",
      Cell: ({ row }) => {
        return row.original.category.name || "-";
      },
    },
    {
      Header: "Measurement",
      accessor: "measurement",
      Cell: ({ row }) => {
        return row.original.measurement || "-";
      },
    },
    {
      Header: "Deskripsi",
      accessor: "description",
      Cell: ({ row }) => {
        return row.original.description || "-";
      },
    },
    {
      accessor: "action",
      Cell: ({ row }) => (
        <TableListDropdown
          dropdownItemList={[
            {
              label: "Edit",
              onClick: () =>
                navigate(`/vendor-management/edit-vendor/${row.original.id}`),
            },
            {
              label: "Delete",
              onClick: () => {
                setIsOpen(true);
                setId(row.original.id);
              },
            },
          ]}
          placement="center-end"
        />
      ),
    },
  ];

  const fetchMasterGoods = async () => {
    setIsLoading(true);
    try {
      const response = await getGoods();
      const data = response.data;
      setTotal(data.total);
      setPageSize(data.per_page);
    } catch (error) {
      console.error("Error fetching purchase requests:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMasterGoods();
  }, []);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return dataMasterGoods.slice(startIndex, endIndex);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = async () => {
    try {
      setIsLoadingDelete(true);
      const response = await deleteGoods(id);
      const data = response.data;
      setTotal(data?.total);
      setPageSize(data?.per_page);
      if (response.status === "success") {
        toast.push(
          <Notification type="success" title={"Barang berhasil dihapus "} />,
          {
            placement: "top-center",
          }
        );
        setTimeout(() => {
          fetchMasterGoods;
        }, 1000);
      } else {
        toast.push(
          <Notification
            type="danger"
            title={"Maaf terjadi kesalahan, Barang gagal dihapus "}
          />,
          {
            placement: "top-center",
          }
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => {
        setIsLoadingDelete(false);
        setIsOpen(false);
      }, 1000);
    }
  };

  return (
    <div>
      <TableHeader
        onClickAdd={() =>
          navigate("/master-data/barang-purchase/tambah-barang-purchase")
        }
        addBtnTitle={"Tambah Barang"}
      />
      <CustomTable
        data={getCurrentPageData()}
        columns={columns}
        isLoading={isLoading}
      />
      <div className="flex justify-end mt-2">
        <Pagination
          total={total}
          currentPage={currentPage}
          pageSize={pageSize}
          onChange={handlePageChange}
          displayTotal
        />
      </div>
      <ConfirmationCustom
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => handleDelete(id)}
        title="Delete Confirmation"
        text="Anda yakin akan menghapus data ini?"
        confirmText="Hapus"
        isLoading={isLoadingDelete}
      />
    </div>
  );
};

export default PurchaseGoodsList;
