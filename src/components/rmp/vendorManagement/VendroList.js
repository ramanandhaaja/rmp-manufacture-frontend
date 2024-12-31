import CustomTable from "components/custom/CustomTable";
import useVendor from "utils/hooks/vendorManagement/useVendor";
import { useEffect } from "react";
import TableListDropdown from "components/template/TableListDropdown";
import TableHeader from "components/rmp/TableHeader";
import { useNavigate } from "react-router-dom";
import { Pagination, toast, Notification } from "components/ui";
import { useState } from "react";
import ConfirmationCustom from "components/custom/ConfirmationCustom";
import capitalize from "components/ui/utils/capitalize";
import { getStatusClassName } from "utils/helpers";

const VendorList = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [vendorId, setVendorId] = useState(null);
  const { getVendors, removeVendor, dataVendor } = useVendor();
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await getVendors({ page: currentPage });
        const data = response.data;
        setTotal(data.total);
        setPageSize(data.per_page);
      } catch (error) {
        console.error("Error fetching purchase requests:", error);
      } finally {
      }
    };

    fetchVendors();
  }, [currentPage]);

  const columns = [
    {
      Header: "ID",
      accessor: "id",
      Cell: ({ row }) => row.original.id,
    },
    {
      Header: "Nama Vendor",
      accessor: "name",
      Cell: ({ row }) => row.original.name,
    },
    {
      Header: "Kategori Barang Vendor",
      accessor: "goods_category",
      Cell: ({ row }) => {
        return Array.isArray(row.original.goods_category)
          ? row.original.goods_category.join(", ")
          : row.original.goods_category;
      },
    },
    {
      Header: "Tipe Barang Vendor",
      accessor: "vendor_type",
      Cell: ({ row }) => {
        return capitalize(row.original.vendor_type);
      },
    },
    {
      Header: "Kontak PIC",
      accessor: "pic_phone",
      Cell: ({ row }) => {
        return row.original.pic_phone;
      },
    },
    {
      Header: "Email PIC",
      accessor: "email",
      Cell: ({ row }) => {
        return row.original.pic_email;
      },
    },
    {
      Header: "Status Approval",
      accessor: "status",
      Cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${getStatusClassName(
            row.original.verification_status
          )}`}
        >
          {row.original.verification_status}
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
                setVendorId(row.original.id);
              },
            },
          ]}
        />
      ),
    },
  ];
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const response = await removeVendor(vendorId);
      console.log(response);
      if (response.status === "success") {
        console.log("success");
        setTimeout(() => {
          toast.push(
            <Notification type="success" title="Berhasil menghapus vendor" />,
            {
              placement: "top-center",
            }
          );
          window.location.reload();
        }, 1000);
      } else {
        toast.push(
          <Notification type="danger" title="Berhasil menghapus vendor" />,
          {
            placement: "top-center",
          }
        );
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
        onClickAdd={() => navigate("/vendor-management/tambah-vendor")}
        addBtnTitle={"Tambah Vendor"}
      />
      <CustomTable data={dataVendor?.data} columns={columns} />
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
        onConfirm={() => handleDelete(vendorId)}
        title="Delete Confirmation"
        text="Anda yakin akan menghapus data ini?"
        confirmText="Hapus"
        isLoading={isLoading}
      />
    </div>
  );
};
export default VendorList;
