import { Button, Notification, toast } from "components/ui";
import { Link } from "react-router-dom";
// import { CSVLink } from "react-csv";
import { TableSearch } from "../Search";
import { useState } from "react";
import { ConfirmDialog } from "components/shared";
// import { apiDestroy } from "./api";
import {
  SymbolIcon,
  MixerHorizontalIcon,
  DownloadIcon,
  Component2Icon,
  PlusIcon,
  TrashIcon,
} from "@radix-ui/react-icons";

export const Tools = (props) => {
  const [openDialogBulkDelete, setOpenDialogBulkDelete] = useState(false);
  const [loading, setLoading] = useState(false);

  // const csvHeader = useMemo(() => {
  //   let h = [];
  //   for (let index = 0; index < props.checkboxList.length; index++) {
  //     const el = props.checkboxList[index];
  //     h.push({
  //       label: el,
  //       key: el,
  //     });
  //   }
  //   return h;
  // }, [props.checkboxList]);

  // const handleExport = async () => {
  //   try {
  //     setLoading(true)
  //     const result = await apiExport({
  //       export_to: "xlsx",
  //       q: props?.localState?.params?.q,
  //       options: props?.localState?.params?.options,
  //     })
  //     if (result && result.status === 200) {
  //       const headers = result.headers
  //       const blob = new Blob([result.data], { type: headers["content-type"] })
  //       const link = document.createElement("a")
  //       const url = window.URL.createObjectURL(blob)
  //       link.href = url
  //       const currentTime = new Date()
  //       const formattedTime = currentTime
  //         .toISOString()
  //         .replace(/[-T:.]/g, "")
  //         .slice(0, -5)
  //       const fileName = `export_${pageConfig.pageTitle}_${formattedTime}.xlsx`
  //       link.setAttribute("download", fileName)
  //       document.body.appendChild(link)
  //       link.click()
  //       link.remove()
  //     }
  //     setLoading(false)
  //   } catch (error) {
  //     toast.push(
  //       <Notification title={"Error"} type="danger">
  //         {error?.response?.data?.message ||
  //           error?.message ||
  //           "Something went wrong"}
  //       </Notification>,
  //       {
  //         placement: "top-center",
  //       }
  //     )
  //     setLoading(false)
  //   }
  // }

  const storedDataString = localStorage.getItem("filter_mst_user");
  const storedData = JSON.parse(storedDataString);

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          {props.pageConfig.enableBulkDelete && props.deleteIds.length > 0 && (
            <Button
              variant="solid"
              color="red-600"
              size="sm"
              className="block md:inline-block lg:mr-2  lg:mb-0 mb-4"
              icon={<TrashIcon />}
              onClick={() => {
                setOpenDialogBulkDelete(true);
              }}
            >
              Bulk Delete
            </Button>
          )}
          <div className="flex items-center gap-2">
            {props.pageConfig.enableSearchTools && (
              <TableSearch
                localState={props.localState}
                getData={props.getData}
                query={props.query}
              />
            )}
            {props.pageConfig.enableFilterTools && (
              <Button
                size="md"
                className={`rounded-lg block text-blue-999 text-sm font-bold md:inline-block ltr:lg:ml-0 rtl:md:mr-2 lg:mb-0 mb-4 !px-5 ${
                  storedData?.data &&
                  "!bg-main-600 hover:!bg-blue-700 !text-white !border-none"
                }`}
                icon={<MixerHorizontalIcon />}
                onClick={props.openFilter}
              >
                Filter
              </Button>
            )}
          </div>
        </div>

        <div className="flex">
          {props.pageConfig.enableExportTools && (
            <div className="block lg:inline-block lg:mx-2 lg:mb-0 mb-4">
              <Button
                block
                size="md"
                className="rounded-lg !px-5 text-blue-999 text-sm font-bold"
                // onClick={handleExport}
                loading={loading}
              >
                Export
              </Button>
            </div>
          )}

          {props.pageConfig.enableCreate && (
            <Link
              to={props.pageConfig.pageCreate}
              className="block lg:inline-block lg:mb-0 mb-4 ml-2"
            >
              <Button
                onClick={() => props.setOpenModal(true)}
                block
                variant="solid"
                size="md"
                className={"!px-5 rounded-lg"}
                icon={<PlusIcon />}
              >
                Buat Permintaan Baru
              </Button>
            </Link>
          )}
        </div>
      </div>

      <ConfirmDialog
        isOpen={openDialogBulkDelete}
        onClose={() => {
          setOpenDialogBulkDelete(false);
        }}
        onRequestClose={() => {
          setOpenDialogBulkDelete(false);
        }}
        type="danger"
        title="Bulk Delete data"
        onCancel={() => {
          setOpenDialogBulkDelete(false);
        }}
        // onConfirm={async () => {
        //   try {
        //     let params = {
        //       ids: [],
        //     };

        //     for (let index = 0; index < props.deleteIds.length; index++) {
        //       const el = props.deleteIds[index];
        //       params.ids.push(el);
        //     }

        //     await apiDestroy(0, params);
        //     props.getData({ ...props.localState.params, page: 1 });
        //     setOpenDialogBulkDelete(false);

        //     toast.push(
        //       <Notification
        //         title={"Successfuly Deleted"}
        //         type="success"
        //         duration={2500}
        //       >
        //         Data successfuly deleted
        //       </Notification>,
        //       {
        //         placement: "top-center",
        //       }
        //     );

        //     props.setIds([]);
        //   } catch (error) {
        //     toast.push(
        //       <Notification title={"Error"} type="danger">
        //         {error?.response?.data?.message ||
        //           error?.message ||
        //           "Something went wrong"}
        //       </Notification>,
        //       {
        //         placement: "top-center",
        //       }
        //     );
        //   }
        // }}
        confirmButtonColor="red-600"
      >
        <p>
          Are you sure you want to delete this data? All record related to this
          data will be deleted as well. This action cannot be undone.
        </p>
      </ConfirmDialog>
    </>
  );
};
