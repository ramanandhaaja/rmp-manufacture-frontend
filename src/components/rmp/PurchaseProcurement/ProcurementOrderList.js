import CustomTable from "components/custom/CustomTable";
import { useEffect, useState } from "react";
import {
  formatDate,
  getCapitalizeType,
  findDepartement,
  getPoStatusClassName,
} from "utils/helpers";
import { useNavigate } from "react-router-dom";
import { Pagination, Notification, toast } from "components/ui";
import CreatePOModal from "components/custom/ModalCreatePo";
import TableHeader from "../TableHeader";
import usePurchaseOrder from "utils/hooks/PurchaseOrder/usePurchaseOrder";
import capitalize from "components/ui/utils/capitalize";
import TableListDropdown from "components/template/TableListDropdown";
import DataTable from "components/shared/DataTable";
import { Tools } from "./Tools";
import { PageConfigOrderList } from "./config";

const ProcurementOrderList = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  const { getPoList, dataPurchaseOrder } = usePurchaseOrder();
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Convert PageConfigOrderList listFields to DataTable columns
  const columns = PageConfigOrderList.listFields
    .filter((field) => field.is_show)
    .map((field) => ({
      Header: field.label,
      accessor: field.key,
      sortable: field.sortable,
      width: field.width,
      Cell: ({ row }) => {
        const value = row.original[field.key];
        switch (field.key) {
          case "department_id":
            return findDepartement(value);
          case "category":
            return row.original.category?.name || "-";
          case "po_type":
            return getCapitalizeType(value);
          case "created_at":
            return formatDate(value);
          case "po_status":
            return (
              <span
                className={`px-2 py-1 rounded text-xs font-semibold ${getPoStatusClassName(
                  value
                )}`}
              >
                {value}
              </span>
            );
          default:
            return value;
        }
      },
    }));

  const renderDropdown = (row, statusPo) => {
    if (statusPo === "Belum Diproses") {
      return [
        {
          label: "Proses PO",
          onClick: () =>
            navigate(`/purchase/pengadaan/proses-po/${row.original.id}`),
        },
        {
          label: "Hapus PO",
          onClick: () => handleDelete(row.original.id),
        },
        {
          label: "Detail PO",
          onClick: () =>
            navigate(`/purchase/pengadaan/detail-po/${row.original.id}`),
        },
      ];
    } else {
      return [
        {
          label: "Hapus PO",
          onClick: () => handleDelete(row.original.id),
        },
        {
          label: "Detail PO",
          onClick: () =>
            navigate(`/purchase/pengadaan/detail-po/${row.original.id}`),
        },
      ];
    }
  };

  // Add action column with dropdown
  if (PageConfigOrderList.enableActions) {
    columns.push({
      Header: "Action",
      accessor: "action",
      width: "100px",
      Cell: ({ row }) => {
        const statusPo = row.original.po_status;

        return (
          <TableListDropdown
            placement={
              dataPurchaseOrder.length > 1 && row.index < 1
                ? "bottom-end"
                : "top-end"
            }
            dropdownItemList={renderDropdown(row, statusPo)}
          />
        );
      },
    });
  }
  const fetchData = async (params = localState.params) => {
    setIsLoading(true);
    try {
      const response = await getPoList(params);
      const data = response.data;
      setLocalState((prev) => ({
        ...prev,
        params: {
          ...params,
          total: data?.total,
          per_page: data?.per_page,
        },
      }));
    } catch (error) {
      console.error("Error fetching purchase orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePoCreated = () => {
    if (isSubmitted) {
      toast.push(
        <Notification
          title="PO Baru Berhasil Dibuat"
          duration={2000}
          closable
          type="success"
          width={700}
          onClose={() => setIsSubmitted(false)}
        />,
        { placement: "top-center" }
      );
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    handlePoCreated();
  }, [isSubmitted]);

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

  const handleDelete = async (id) => {
    try {
      await fetchData();
    } catch (error) {
      console.error("Error deleting PO:", error);
    }
  };
  const onSort = (sort, sortingColumn) => {
    fetchData({
      ...localState.params,
      order_by: sort.key,
      sort_by: sort.order,
      page: 1,
    });
  };

  return (
    <div className="space-y-4">
      <Tools
        localState={localState}
        getData={fetchData}
        deleteIds={selectedIds}
        setIds={setSelectedIds}
        pageConfig={PageConfigOrderList}
        setOpenModal={setIsModalOpen}
      />

      <DataTable
        columns={columns}
        data={dataPurchaseOrder}
        loading={isLoading}
        pagingData={{
          total: localState.params.total || 0,
          pageIndex: localState.params.page,
          pageSize: localState.params.per_page,
        }}
        onSort={onSort}
        onPaginationChange={handlePaginationChange}
        onSelectChange={handlePageSizeChange}
        selectable={PageConfigOrderList.enableBulkDelete}
        onCheckBoxChange={(checked, row) => {
          if (checked) {
            setSelectedIds((prev) => [...prev, row.id]);
          } else {
            setSelectedIds((prev) => prev.filter((id) => id !== row.id));
          }
        }}
        onIndeterminateCheckBoxChange={(checked, rows) => {
          if (checked) {
            const ids = rows.map((row) => row.original.id);
            setSelectedIds(ids);
          } else {
            setSelectedIds([]);
          }
        }}
        showHeader={true}
        showPagination={PageConfigOrderList.enablePagination}
        showLimitPerPage={PageConfigOrderList.enableLimitPerPage}
        borderlessRow={false}
        wrapClass="mb-4"
      />

      <CreatePOModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isLoading={isLoading}
        setSubmitted={setIsSubmitted}
      />
    </div>
  );
};

export default ProcurementOrderList;
