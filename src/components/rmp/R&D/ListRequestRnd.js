import CustomTable from "components/custom/CustomTable";
import { useEffect, useState } from "react";
import { formatDate, getStatusClassName, getStatusName } from "utils/helpers";
import { useNavigate } from "react-router-dom";
import { Pagination, Notification, toast } from "components/ui";
import capitalize from "components/ui/utils/capitalize";
import TableListDropdown from "components/template/TableListDropdown";
import DataTable from "components/shared/DataTable";
import { Tools } from "./Tools.js";
import { PageConfig } from "./config.js";
import { dataListDevelopmet } from "./dummyData.js";
import { useLocation } from "react-router-dom";
import useCreateRndReq from "utils/hooks/Rnd/useCreateRndReq.js";
import { useSelector, useDispatch } from "react-redux";
import { clearDataRndRequest } from "store/Rnd/rndSlice";
import ConfirmationCustom from "components/custom/ConfirmationCustom";

const ListRequestRnd = () => {
  const dispatch = useDispatch();
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
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState(null);
  const location = useLocation();
  const checkLocation = location.pathname.includes("product-r&d");
  const { getRndRequest, dataRndRequest, deleteRndRequest } = useCreateRndReq();
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
          case "created_at":
            return formatDate(value);
          case "launching_date":
            return formatDate(value);
          case "approved_date":
            if (value == null) return "-";
            return formatDate(value);
          case "document":
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
                    checkLocation
                      ? `/purchase/product-r&d/detail-permintaan/${row.original.id}`
                      : `/research-development/detail-permintaan/${row.original.id}`
                  ),
              },
              {
                label: "Delete",
                onClick: () => {
                  setId(row.original.id);
                  setIsOpen(true);
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
      const response = await getRndRequest(params);
      const data = response.data;
      setLocalState((prev) => ({
        ...prev,
        params: {
          ...params,
          total: data?.total,
          per_page: data?.per_page,
        },
      }));
      if (response.status === "failed") {
        toast.push(
          <Notification
            type="danger"
            title="Maaf terjadi gangguan jaringan, gagal memuat data"
          />,
          {
            placement: "top-center",
            width: 700,
          }
        );
      }
    } catch (error) {
      console.error("Error fetching purchase orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    dispatch(clearDataRndRequest());
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, []);

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
      setIsLoadingDelete(true);
      const resp = await deleteRndRequest(id);
      if (resp.status === "success") {
        toast.push(
          <Notification
            type="success"
            title="Data Rnd Request berhasil dihapus"
          />,
          {
            placement: "top-center",
            width: 700,
          }
        );
        await fetchData();
      } else {
        toast.push(
          <Notification
            type="danger"
            title="Maaf terjadi gangguan jaringan, gagal menghapus data"
          />,
          {
            placement: "top-center",
            width: 700,
          }
        );
      }
    } catch (error) {
      console.error("Error deleting Rnd Request:", error);
    } finally {
      setIsLoadingDelete(false);
      setIsOpen(false);
    }
  };

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
          pageConfig={PageConfig}
          setOpenModal={setIsModalOpen}
        />
      </div>

      <DataTable
        columns={columns}
        data={dataRndRequest}
        loading={isLoading}
        pagingData={{
          total: localState.params.total || 0,
          pageIndex: localState.params.page,
          pageSize: localState.params.per_page,
        }}
        // onSort={onSort}
        onPaginationChange={handlePaginationChange}
        onSelectChange={handlePageSizeChange}
        showHeader={true}
        showPagination={PageConfig.enablePagination}
        showLimitPerPage={PageConfig.enableLimitPerPage}
        borderlessRow={false}
        wrapClass="mb-4"
      />

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

export default ListRequestRnd;
