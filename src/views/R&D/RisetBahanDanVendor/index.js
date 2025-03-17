import { useEffect, useState } from "react";
import { getRNDStatusClassName } from "utils/helpers";
import { useNavigate } from "react-router-dom";
import { Pagination, Notification, toast, Button } from "components/ui";
import capitalize from "components/ui/utils/capitalize";
import TableListDropdown from "components/template/TableListDropdown";
import DataTable from "components/shared/DataTable";
import { Tools } from "./Tools";
import { PageConfig } from "./config";
import { formatNumber } from "utils/helpers";
import { PlusIcon } from "@radix-ui/react-icons";
import { useDispatch } from "react-redux";
import {
  setIdRndRequest,
  setIsEdit,
  clearDataRndRequest,
} from "store/Rnd/rndSlice";
import { useParams } from "react-router-dom";
import useProcessRnd from "utils/hooks/Rnd/useProcessRnd";

const RisetBahanDanVendorList = () => {
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
  const { id } = useParams();
  const { getRndRawMaterials } = useProcessRnd();
  const [dataTable, setDataTable] = useState([]);

  const columns = PageConfig.listFields
    .filter((field) => field.is_show)
    .map((field) => ({
      Header: field.label,
      accessor: field.key,
      sortable: field.sortable,
      width: field.width,
      Cell: ({ row }) => {
        // Handle nested data access
        const getValue = (obj, path) => {
          if (path.includes("rnd_raw_material_details")) {
            const details = obj.rnd_raw_material_details;
            if (Array.isArray(details) && details.length > 0) {
              return details.map((detail) => {
                if (path.includes("raw_material.raw_material_code")) {
                  return detail.raw_material?.raw_material_code;
                } else if (path.includes("raw_material.category")) {
                  return detail.raw_material?.category;
                } else if (path.includes("material_status")) {
                  return detail.material_status;
                } else if (path.includes("raw_material.stock")) {
                  return detail.raw_material?.stock;
                }
                return "";
              });
            }
            return [];
          }
          return obj[path];
        };

        const value = getValue(row.original, field.key);

        switch (field.key) {
          case "rnd_raw_material_details.material_status":
            return (
              <div className="flex flex-wrap gap-1">
                {Array.isArray(value) &&
                  value.map((status, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 rounded text-xs font-semibold ${getRNDStatusClassName(
                        status
                      )}`}
                    >
                      {status}
                    </span>
                  ))}
              </div>
            );

          case "rnd_raw_material_details.raw_material.raw_material_code":
            return (
              <div className="flex flex-col gap-1">
                {Array.isArray(value) &&
                  value.map((code, index) => (
                    <span key={index} className="text-sm">
                      {code || "-"}
                    </span>
                  ))}
              </div>
            );

          case "raw_material_name":
            return value || "-";

          default:
            return value;
        }
      },
    }));

  const renderDropdown = (row) => {
    if (row.original.status === "Selesai") {
      return (
        <TableListDropdown
          placement={
            dataTable.length > 1 && row.index < 1 ? "bottom-end" : "top-end"
          }
          dropdownItemList={[
            {
              label: "Lihat Detail",
              // onClick: () => {
              //   navigate(
              //     `/rnd/trial-bahan-kemas/view/${row.original.id}`
              //   );
              // },
            },
            {
              label: "Edit Laporan",
              // onClick: () => {
              //   navigate(
              //     `/rnd/trial-bahan-kemas/view/${row.original.id}`
              //   );
              // },
            },
            {
              label: "Tetapkan Trial",
              // onClick: () => {
              //   navigate(
              //     `/rnd/trial-bahan-kemas/view/${row.original.id}`
              //   );
              // },
            },
          ]}
        />
      );
    }
    return (
      <TableListDropdown
        placement={
          dataTable.length > 1 && row.index < 1
            ? "bottom-end"
            : "middle-end-bottom"
        }
        dropdownItemList={[
          {
            label: "Buat Laporan",
            onClick: () => {
              navigate(
                `/research-development/trial-formulasi/trial-bahan-kemas/add-laporan/${row.original.id}`
              );
            },
          },
          //   {
          //     label: "Edit",
          //     onClick: () => {
          //       dispatch(setIsEdit(true));
          //       navigate(
          //         `/research-development/trial-formulasi/trial-bahan-kemas/edit/${row.original.id}`
          //       );
          //     },
          //   },
        ]}
      />
    );
  };

  //   if (PageConfig.enableActions) {
  //     columns.push({
  //       Header: "Action",
  //       accessor: "action",
  //       width: "100px",
  //       Cell: ({ row }) => {
  //         return renderDropdown(row);
  //       },
  //     });
  //   }

  const fetchData = async (params = localState.params) => {
    setIsLoading(true);
    try {
      const response = await getRndRawMaterials({
        rnd_request_id: id,
      });
      const data = response.data;
      setDataTable(data.data);
      setLocalState((prev) => ({
        ...prev,
        params: {
          ...params,
          total: data?.total,
          per_page: data?.per_page,
        },
      }));
    } catch (error) {
      console.error("Error fetching trial packaging materials:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    dispatch(clearDataRndRequest());
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
      await fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
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

  if (dataTable.length === 0)
    return (
      <div className="p-6 bg-white rounded-lg h-[50vh]">
        <div className="border-b border-gray-500 mb-4 ">
          <h1 className="text-2xl font-semibold text-indigo-900 mb-4">
            {PageConfig.pageTitle}
          </h1>
        </div>
        <div className="flex justify-center items-center h-full">
          <div className="flex flex-col justify-center items-center">
            <svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 4C8.4087 4 6.88258 4.63214 5.75736 5.75736C4.63214 6.88258 4 8.4087 4 10V16C4 17.1046 4.89543 18 6 18C7.10457 18 8 17.1046 8 16V10C8 9.46957 8.21071 8.96086 8.58579 8.58579C8.96086 8.21071 9.46957 8 10 8H16C17.1046 8 18 7.10457 18 6C18 4.89543 17.1046 4 16 4H10Z"
                fill="#4B4B4B"
              />
              <path
                d="M32 4C30.8954 4 30 4.89543 30 6C30 7.10457 30.8954 8 32 8H38C38.5304 8 39.0391 8.21071 39.4142 8.58579C39.7893 8.96086 40 9.46957 40 10V16C40 17.1046 40.8954 18 42 18C43.1046 18 44 17.1046 44 16V10C44 8.4087 43.3679 6.88258 42.2426 5.75736C41.1174 4.63214 39.5913 4 38 4H32Z"
                fill="#4B4B4B"
              />
              <path
                d="M8 32C8 30.8954 7.10457 30 6 30C4.89543 30 4 30.8954 4 32V38C4 39.5913 4.63214 41.1174 5.75736 42.2426C6.88258 43.3679 8.4087 44 10 44H16C17.1046 44 18 43.1046 18 42C18 40.8954 17.1046 40 16 40H10C9.46957 40 8.96086 39.7893 8.58579 39.4142C8.21071 39.0391 8 38.5304 8 38V32Z"
                fill="#4B4B4B"
              />
              <path
                d="M44 32C44 30.8954 43.1046 30 42 30C40.8954 30 40 30.8954 40 32V38C40 38.5304 39.7893 39.0391 39.4142 39.4142C39.0391 39.7893 38.5304 40 38 40H32C30.8954 40 30 40.8954 30 42C30 43.1046 30.8954 44 32 44H38C39.5913 44 41.1174 43.3679 42.2426 42.2426C43.3679 41.1174 44 39.5913 44 38V32Z"
                fill="#4B4B4B"
              />
            </svg>
            <p className="text-2xl font-semibold  mb-4">
              Tambahkan Bahan Kemas
            </p>
            <Button
              icon={<PlusIcon />}
              onClick={() =>
                navigate(
                  "/research-development/trial-formulasi/riset-bahan-dan-vendor/add"
                )
              }
            >
              Bahan Kemas
            </Button>
          </div>
        </div>
      </div>
    );

  return (
    <div className="p-6 bg-white rounded-lg">
      <div className="border-b border-gray-500 mb-4 ">
        <h1 className="text-2xl font-semibold text-indigo-900 mb-4">
          {PageConfig.pageTitle}
        </h1>
      </div>
      <div className="py-4">
        <Tools
          localState={localState}
          pageConfig={PageConfig}
          setOpenModal={setIsModalOpen}
          setAction={() => dispatch(setIdRndRequest(Number(id)))}
        />
      </div>

      <DataTable
        columns={columns}
        data={dataTable}
        loading={isLoading}
        pagingData={{
          total: localState.params.total || 0,
          pageIndex: localState.params.page,
          pageSize: localState.params.per_page,
        }}
        onSort={onSort}
        onPaginationChange={handlePaginationChange}
        onSelectChange={handlePageSizeChange}
        showHeader={true}
        showPagination={PageConfig.enablePagination}
        showLimitPerPage={PageConfig.enableLimitPerPage}
        borderlessRow={false}
        wrapClass="mb-4"
      />
    </div>
  );
};

export default RisetBahanDanVendorList;
