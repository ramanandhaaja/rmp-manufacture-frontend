import CustomTable from "components/custom/CustomTable";
import { useEffect, useState } from "react";
import { formatDate, getStatusClassName, getStatusName } from "utils/helpers";
import { useNavigate } from "react-router-dom";
import { Pagination, Notification, toast } from "components/ui";
import CreatePOModal from "components/custom/ModalCreatePo";
import usePurchaseOrder from "utils/hooks/PurchaseOrder/usePurchaseOrder";
import capitalize from "components/ui/utils/capitalize";
import TableListDropdown from "components/template/TableListDropdown";
import DataTable from "components/shared/DataTable";
import { Tools } from "./Tools.js";
import { PageConfig } from "./config.js";
import { dataListDevelopmet } from "./dummyData.js";

const ListRequestRnd = () => {
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
          case "tanggalPermintaan":
            return formatDate(value);
          case "targetLaunching":
            return formatDate(value);
          case "tanggalPersetujuan":
            return formatDate(value);
          case "dokumen":
            return "-";
          case "status":
            return (
              <span
                className={`px-2 py-1 rounded font-bold text-xs ${getStatusClassName(
                  value
                )}`}
              >
                {getStatusName(value)}
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
              dataListDevelopmet.length > 1 && row.index < 1
                ? "bottom-end"
                : "top-end"
            }
            dropdownItemList={[
              {
                label: "Detail Permintaan",
                onClick: () =>
                  navigate(
                    `/purchase/product-r&d/detail-permintaan/${row.original.id}`
                  ),
              },
            ]}
          />
        );
      },
    });
  }
  //   const fetchData = async (params = localState.params) => {
  //     setIsLoading(true);
  //     try {
  //       const response = await getPoList(params);
  //       const data = response.data;
  //       setLocalState((prev) => ({
  //         ...prev,
  //         params: {
  //           ...params,
  //           total: data?.total,
  //           per_page: data?.per_page,
  //         },
  //       }));
  //     } catch (error) {
  //       console.error("Error fetching purchase orders:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

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

  //   useEffect(() => {
  //     fetchData();
  //   }, []);
  //   useEffect(() => {
  //     handlePoCreated();
  //   }, [isSubmitted]);

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
        data={dataListDevelopmet}
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

export default ListRequestRnd;
