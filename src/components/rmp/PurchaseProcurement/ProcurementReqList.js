// ProcurementReqList.js
import { useEffect, useState } from "react";
import {
  formatDate,
  findDepartement,
  getStatusClassName,
  getStatusName,
} from "utils/helpers";
import { useNavigate } from "react-router-dom";
import { Alert } from "components/ui";
import DataTable from "components/shared/DataTable";
import { Tools } from "./Tools";
import { FiEye } from "react-icons/fi";
import usePurchaseReq from "utils/hooks/PurchaseRequest/usePurchaseRequest";
import capitalize from "components/ui/utils/capitalize";
import { PageConfigReqList } from "./config";

const ProcurementReqList = () => {
  const navigate = useNavigate();
  const [localState, setLocalState] = useState({
    params: {
      page: 1,
      per_page: 10,
      q: "",
      options: {},
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [approvedData, setApprovedData] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const { getPurchaseReqList } = usePurchaseReq();

  // Convert PageConfigReqList listFields to DataTable columns
  const columns = PageConfigReqList.listFields
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
          case "request_date":
          case "approval_date":
            return formatDate(value);
          case "status":
            return (
              <span
                className={`px-2 py-1 rounded text-xs ${getStatusClassName(
                  value
                )}`}
              >
                {getStatusName(value)}
              </span>
            );
          case "hod":
          case "buyer":
            return value || "-";
          default:
            return value;
        }
      },
    }));

  // Add action column if enabled
  if (PageConfigReqList.enableActions) {
    columns.push({
      Header: "Action",
      accessor: "action",
      Cell: ({ row }) => (
        <button
          className="text-blue-600 hover:text-blue-800"
          onClick={() =>
            navigate(`/purchase/request/detail/${row.original.id}`)
          }
        >
          <FiEye size={18} />
        </button>
      ),
      width: "100px",
    });
  }

  const fetchData = async (params = localState.params) => {
    setIsLoading(true);
    try {
      const response = await getPurchaseReqList(params);
      const data = response.data;
      const approvedItems = data?.data.filter(
        (item) => item.status === "approved"
      );
      setApprovedData(approvedItems);
      setLocalState((prev) => ({
        ...prev,
        params: {
          ...params,
          total: approvedItems?.length,
          per_page: data?.per_page,
        },
      }));
    } catch (error) {
      console.error("Error fetching purchase requests:", error);
    } finally {
      setIsLoading(false);
    }
  };

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

  return (
    <div className="space-y-4">
      <Tools
        localState={localState}
        getData={fetchData}
        deleteIds={selectedIds}
        setIds={setSelectedIds}
        pageConfig={PageConfigReqList}
      />

      <DataTable
        columns={columns}
        data={approvedData}
        loading={isLoading}
        pagingData={{
          total: localState.params.total || 0,
          pageIndex: localState.params.page,
          pageSize: localState.params.per_page,
        }}
        onPaginationChange={handlePaginationChange}
        onSelectChange={handlePageSizeChange}
        selectable={PageConfigReqList.enableBulkDelete}
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
        showPagination={PageConfigReqList.enablePagination}
        showLimitPerPage={PageConfigReqList.enableLimitPerPage}
        borderlessRow={false}
        wrapClass="mb-4"
      />
    </div>
  );
};

export default ProcurementReqList;
