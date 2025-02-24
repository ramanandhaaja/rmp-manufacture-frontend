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
import { useLocation } from "react-router-dom";

export const Tools = (props) => {
  const [openDialogBulkDelete, setOpenDialogBulkDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const storedDataString = localStorage.getItem("filter_mst_user");
  const storedData = JSON.parse(storedDataString);
  const checkUrl = location.pathname.includes("product-r&d");

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

          {props.pageConfig.enableCreate && checkUrl && (
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
    </>
  );
};
