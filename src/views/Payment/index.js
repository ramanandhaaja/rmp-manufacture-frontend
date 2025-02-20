import CustomTable from "components/custom/CustomTable";
import { useEffect, useState } from "react";
import { getPaymentStatusClassName } from "utils/helpers";
import { useNavigate } from "react-router-dom";
import { Pagination, Notification, toast } from "components/ui";
import usePurchaseOrder from "utils/hooks/PurchaseOrder/usePurchaseOrder";
import capitalize from "components/ui/utils/capitalize";
import TableListDropdown from "components/template/TableListDropdown";
import DataTable from "components/shared/DataTable";
import { Tools } from "./tools";
import { PageConfig } from "./config";
import { formatNumber } from "utils/helpers";
import { purchaseOrders } from "./dummyData";
import {
  setIdPo,
  setPaymentMethod,
} from "store/PurchaseOrder/purchaseOrderSlice";
import { useDispatch } from "react-redux";

const ProcurementOrderList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
  const { getPaymentLists } = usePurchaseOrder();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dataPayment, setDataPayment] = useState([]);

  const columns = PageConfig.listFields
    .filter((field) => field.is_show)
    .map((field) => ({
      Header: field.label,
      accessor: field.key,
      sortable: field.sortable,
      width: field.width,
      Cell: ({ row }) => {
        const value = row.original[field.key];
        switch (field.key) {
          case "amount":
            return formatNumber(value);
          case "status":
            return (
              <span
                className={`px-2 py-1 rounded text-xs font-semibold ${getPaymentStatusClassName(
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

  // Add action column with dropdown
  if (PageConfig.enableActions) {
    columns.push({
      Header: "Action",
      accessor: "action",
      width: "100px",
      Cell: ({ row }) => {
        return (
          <TableListDropdown
            placement={
              purchaseOrders.length > 1 && row.index < 1
                ? "bottom-end"
                : "top-end"
            }
            dropdownItemList={[
              {
                label: "Detail Pembayaran",
                onClick: () => {
                  navigate(
                    `/purchase/pembayaran/detail-pembayaran/${row.original.payment_record_id}`
                  );
                  dispatch(setIdPo(row.original.po_id));
                  dispatch(setPaymentMethod(row.original.payment_method));
                },
              },
            ]}
          />
        );
      },
    });
  }
  const fetchData = async (params = localState.params) => {
    setIsLoading(true);
    try {
      const response = await getPaymentLists(params);
      const data = response.data;
      setDataPayment(data?.data);
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

  useEffect(() => {
    dispatch(setIdPo(null));
    dispatch(setPaymentMethod(""));
    fetchData();
  }, []);

  //   useEffect(() => {
  //     handlePoCreated();
  //   }, [isSubmitted]);

  //   const handlePoCreated = () => {
  //     if (isSubmitted) {
  //       toast.push(
  //         <Notification
  //           title="PO Baru Berhasil Dibuat"
  //           duration={2000}
  //           closable
  //           type="success"
  //           width={700}
  //           onClose={() => setIsSubmitted(false)}
  //         />,
  //         { placement: "top-center" }
  //       );
  //       fetchData();
  //     }
  //   };

  //   const handlePaginationChange = (page) => {
  //     fetchData({
  //       ...localState.params,
  //       page,
  //     });
  //   };

  //   const handlePageSizeChange = (size) => {
  //     fetchData({
  //       ...localState.params,
  //       per_page: size,
  //       page: 1,
  //     });
  //   };

  //   const handleDelete = async (id) => {
  //     try {
  //       await fetchData();
  //     } catch (error) {
  //       console.error("Error deleting PO:", error);
  //     }
  //   };

  //   const onSort = (sort, sortingColumn) => {
  //     fetchData({
  //       ...localState.params,
  //       order_by: sort.key,
  //       sort_by: sort.order,
  //       page: 1,
  //     });
  //   };

  return (
    <div className="p-6 bg-white rounded-lg">
      <div className="border-b border-gray-500 mb-4 ">
        <h1 className="text-2xl font-semibold text-indigo-900 mb-4">
          Pembayaran
        </h1>
      </div>
      <div className="py-4">
        <Tools
          localState={localState}
          // getData={fetchData}
          deleteIds={selectedIds}
          setIds={setSelectedIds}
          pageConfig={PageConfig}
          setOpenModal={setIsModalOpen}
        />
      </div>

      <DataTable
        columns={columns}
        data={dataPayment}
        loading={isLoading}
        pagingData={{
          total: localState.params.total || 0,
          pageIndex: localState.params.page,
          pageSize: localState.params.per_page,
        }}
        // onSort={onSort}
        // onPaginationChange={handlePaginationChange}
        // onSelectChange={handlePageSizeChange}
        // selectable={PageConfigOrderList.enableBulkDelete}
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
        showPagination={PageConfig.enablePagination}
        showLimitPerPage={PageConfig.enableLimitPerPage}
        borderlessRow={false}
        wrapClass="mb-4"
      />

      {/* <CreatePOModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isLoading={isLoading}
        setSubmitted={setIsSubmitted}
      /> */}
    </div>
  );
};

export default ProcurementOrderList;
