import CustomTable from "components/custom/CustomTable";
import useMasterGoods from "utils/hooks/useMasterGoods";
import { useEffect, useState } from "react";
import { formatDate } from "utils/helpers";
import { useNavigate } from "react-router-dom";
import TableListDropdown from "components/template/TableListDropdown";
import { Pagination, Alert } from "components/ui";
import ConfirmationCustom from "components/custom/ConfirmationCustom";
import TableHeader from "../TableHeader";

const PurchaseGoodsList = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
        return row.original.category.name;
      },
    },
    {
      Header: "Measurement",
      accessor: "measurement",
      Cell: ({ row }) => {
        return row.original.measurement;
      },
    },
    {
      Header: "Deskripsi",
      accessor: "description",
      Cell: ({ row }) => {
        return row.original.description;
      },
    },
    {
      accessor: "action",
      Cell: ({ row }) => (
        <TableListDropdown
          dropdownItemList={[
            {
              label: "Lihat Detail",
              onClick: () =>
                navigate(`/vendor-management/detail-vendor/${row.original.id}`),
            },
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
        />
      ),
    },
  ];

  useEffect(() => {
    getGoods();
  }, []);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const response = await deleteGoods(id);
      console.log(response);
      if (response.status === "success") {
        console.log("success");
        navigate("/master-data/barang-purchase");
      } else {
        <Alert
          message="Failed to delete goods"
          type="danger"
          showIcon
          className="mb-4"
        />;
        console.log(response.status);
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
          navigate("/master-data/barang-purchase/tambah-barang-purchase")
        }
        addBtnTitle={"Tambah Barang"}
      />
      <CustomTable
        data={dataMasterGoods && dataMasterGoods.data}
        columns={columns}
      />
      <div className="flex justify-end mt-2">
        <Pagination
        //   total={vendorListData?.length}
        //   currentPage={dataVendor?.currentPage}
        //   pageSize={dataVendor?.last_page}
        //   onChange={handlePageChange}
        //   displayTotal
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

export default PurchaseGoodsList;
