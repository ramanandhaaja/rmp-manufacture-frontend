import CustomTable from "components/custom/CustomTable";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pagination, Alert } from "components/ui";
import ConfirmationCustom from "components/custom/ConfirmationCustom";
import TableHeader from "../TableHeader";
import { formatDate } from "utils/helpers";
import TableListDropdown from "components/template/TableListDropdown";
import useColumns from "utils/hooks/PurchaseRequest/useColumn";
import useUser from "utils/hooks/useUser";
import usePurchaseRequest from "utils/hooks/PurchaseRequest/usePurchaseRequest";
import { Notification, toast } from "components/ui";
import { useSelector } from "react-redux";
import ModalStatusInput from "components/custom/ModalStatusInput";

const PurchaseRequestList = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenStatus, setIsOpenStatus] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [id, setId] = useState(null);
  const {
    dataPurchase,
    getPurchaseReqList,
    deletePurchaseReq,
    updatePurchaseReqStatus,
  } = usePurchaseRequest();
  const { columnsDepartment, columnsPpic, columnsFactoryManager } = useColumns(
    setIsOpen,
    setIsOpenStatus,
    null,
    setId
  );
  const { user, userRole } = useUser();
  const departemenColumn = columnsDepartment();
  const ppicColumn = columnsPpic();
  const factoryManagerColumn = columnsFactoryManager();
  const { goodsType } = useSelector((state) => state.goodsType);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const fetchPurchaseRequests = async () => {
      setIsLoadingList(true);
      try {
        const requestType =
          goodsType === "material" ? "material" : "non-material";
        const response = await getPurchaseReqList(requestType);

        setTotal(response.data?.total);
        setPageSize(response.data?.per_page);
      } catch (error) {
        console.error("Error fetching purchase requests:", error);
      } finally {
        setIsLoadingList(false);
      }
    };

    if (goodsType) {
      fetchPurchaseRequests();
    }
  }, []);

  const handleColumn = () => {
    if (userRole.includes("department")) {
      return departemenColumn;
    }
    if (userRole.includes("ppic")) {
      return ppicColumn;
    }
    if (userRole.includes("factory-manager")) {
      return factoryManagerColumn;
    }
    return departemenColumn;
  };

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return dataPurchase.slice(startIndex, endIndex);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const response = await deletePurchaseReq(id);
      console.log(response);
      if (response.status === "success") {
        console.log("success");
        toast.push(<Notification type="success" title={response.message} />, {
          placement: "top-center",
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
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

  const handleStatusUpdate = async (values) => {
    try {
      setIsLoading(true);
      const response = await updatePurchaseReqStatus(id, {
        status: values.status.value,
      });
      if (response.status === "success") {
        toast.push(<Notification type="success" title={response.message} />, {
          placement: "top-center",
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.push(<Notification type="danger" title={response.message} />, {
          placement: "top-center",
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
      setIsOpenStatus(false);
    }
  };

  return (
    <div>
      <TableHeader
        onClickAdd={() => navigate("/purchase/request/tambah")}
        addBtnTitle={
          Array.isArray(userRole) && userRole.includes("procurement")
            ? "Proses Antrian Barang"
            : "Tambah Permintaan Pembelian"
        }
        showBtnAdd={
          Array.isArray(userRole) && userRole?.includes("factory-manager")
            ? false
            : true
        }
      />
      <CustomTable data={getCurrentPageData()} columns={handleColumn()} />
      <div className="flex justify-end mt-2">
        <Pagination
          className="pagination-bar"
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
      <ModalStatusInput
        isOpen={isOpenStatus}
        onClose={() => setIsOpenStatus(false)}
        // onConfirm={() => handleStatus(id)}
        title="Konfirmasi Status"
        text="Anda yakin akan mengubah status data ini?"
        confirmText="Ubah Status"
        isLoading={isLoading}
        onSave={handleStatusUpdate}
      />
    </div>
  );
};

export default PurchaseRequestList;
