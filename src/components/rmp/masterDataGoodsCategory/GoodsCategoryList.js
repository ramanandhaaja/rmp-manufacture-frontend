import CustomTable from "components/custom/CustomTable";
import useGoodsCategory from "utils/hooks/useGoodsCategory";
import { useEffect, useState } from "react";
import { formatDate } from "utils/helpers";
import { useNavigate } from "react-router-dom";
import TableListDropdown from "components/template/TableListDropdown";
import { Pagination, Alert } from "components/ui";
import ConfirmationCustom from "components/custom/ConfirmationCustom";
import TableHeader from "../TableHeader";
import capitalize from "components/ui/utils/capitalize";
import { Notification, toast } from "components/ui";

const GoodsCategoryList = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState(null);
  const { getGoodsCategory, dataGoodsCategory, deleteGoodsCategory } =
    useGoodsCategory();

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
      Header: "Tipe Barang",
      accessor: "goods_type",
      Cell: ({ row }) => capitalize(row.original.goods_type) || "-",
    },
    {
      Header: "Status Barang",
      accessor: "status",
      Cell: ({ row }) => {
        return capitalize(row.original.status);
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

  useEffect(() => {
    const fetchGoodsCategory = async () => {
      try {
        const response = await getGoodsCategory();
        const data = response.data;
        setTotal(data.total);
        setPageSize(data.per_page);
      } catch (error) {
        console.error("Error fetching goods category:", error);
      }
    };
    fetchGoodsCategory();
  }, []);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return dataGoodsCategory.slice(startIndex, endIndex);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const response = await deleteGoodsCategory(id);

      if (response.status === "success") {
        console.log("success");
        toast.push(
          <Notification
            type="success"
            title={"Kategori Barang berhasil dihapus "}
          />,
          {
            placement: "top-center",
          }
        );
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        console.log(response.status);
        toast.push(<Notification type="danger" title={response.message} />, {
          placement: "top-center",
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        setIsOpen(false);
      }, 1000);
    }
  };

  return (
    <div>
      <TableHeader
        onClickAdd={() =>
          navigate("/master-data/kategori-barang/tambah-kategori-barang")
        }
        addBtnTitle={"Tambah Kategori Barang"}
      />
      <CustomTable data={getCurrentPageData()} columns={columns} />
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
        isLoading={isLoading}
      />
    </div>
  );
};

export default GoodsCategoryList;
