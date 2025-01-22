import LayoutRightSpace from "components/layout/LayoutRightSpace";
import usePurchaseOrder from "utils/hooks/PurchaseOrder/usePurchaseOrder";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { formatDate, getCapitalizeType } from "utils/helpers";
import CustomTable from "components/custom/CustomTable";
import { findDepartement } from "utils/helpers";
import { Button } from "components/ui";
import { useNavigate } from "react-router-dom";
import useUser from "utils/hooks/useUser";
import {
  Notification,
  toast,
  FormContainer,
  FormItem,
  Input,
} from "components/ui";
import ConfirmationCustom from "components/custom/ConfirmationCustom";
import { Loading } from "components/shared";
import { useSelector } from "react-redux";
import TableListDropdown from "components/template/TableListDropdown";
import Tabs from "components/ui/Tabs";

const DetailPurchaseOrder = () => {
  const navigate = useNavigate();
  const { dataDetailPurchaseOrder, getPoDetail } = usePurchaseOrder();
  const [isLoadingList, setIsLoadingList] = useState(false);
  const { id } = useParams();
  const { userRole, user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [status, setStatus] = useState("");

  const columns = [
    {
      Header: "ID Pembelian",
      accessor: "purchase_request_id",
    },
    {
      Header: "Kode",
      accessor: "good_id",
    },
    {
      Header: "Barang",
      accessor: "goods_category_name",
    },
    {
      Header: "QTY",
      accessor: "quantity",
    },
    {
      Header: "UOM",
      accessor: "measurement",
    },
    {
      Header: "Harga Penawaran",
      accessor: "offered_price",
    },
    // {
    //   accessor: "action",
    //   Cell: ({ row }) => {
    //     if (dataDetailPurchaseOrder.status !== "approved") {
    //       return (
    //         <TableListDropdown
    //           dropdownItemList={[
    //             {
    //               label: "Edit",
    //               onClick: () => navigate(`/purchase/request/edit/${id}`),
    //             },
    //           ]}
    //         />
    //       );
    //     }
    //     return null;
    //   },
    // },
  ];

  useEffect(() => {
    setIsLoadingList(true);
    getPoDetail(id);
    setIsLoadingList(false);
  }, [id]);

  const handleStepChange = (value) => {
    setActiveTab(value);
  };

  return (
    <LayoutRightSpace>
      <div className="flex justify-between">
        <div className="flex gap-2  ">
          <h1 className="text-2xl font-semibold text-indigo-900 mb-4">
            Detail PO: {dataDetailPurchaseOrder?.po_number} -{" "}
            {dataDetailPurchaseOrder?.po_name}
          </h1>

          {dataDetailPurchaseOrder?.status === "approved" && (
            <div className="bg-blue-200 text-blue-800 h-8 px-3 py-1 rounded-lg text-sm">
              Disetujui
            </div>
          )}
          {dataDetailPurchaseOrder?.status === "rejected" && (
            <div className="bg-red-200 text-gray-700 h-8 px-3 py-1 rounded-lg text-sm">
              Ditolak
            </div>
          )}
          {dataDetailPurchaseOrder?.status === "waiting" && (
            <div className="bg-gray-200 text-gray-700 h-8 px-3 py-1 rounded-lg text-sm">
              Menunggu Persetujuan
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() =>
              navigate(`/purchase/request/detail/informasi-pembelian/${id}`)
            }
          >
            Download PO
          </Button>
          {/* {isFollowUp && ( */}
          <Button
            //   onClick={() => formikRef.current.handleSubmit()}
            variant="solid"
            className="text-white"
          >
            Rilis PO
          </Button>
          {/* )} */}
        </div>
      </div>

      <div className="border-b border-gray-400 my-2"></div>
      <Tabs value={activeTab} onChange={handleStepChange} variant="underline">
        {status === "approved" && (
          <>
            <Tabs.TabList>
              <Tabs.TabNav value={0} className="flex-col">
                <span className="text-base">Detail PO</span>
              </Tabs.TabNav>
              <Tabs.TabNav value={1} className="flex-col">
                <span className="text-base">Detail Vendor</span>
              </Tabs.TabNav>
            </Tabs.TabList>
            <div className="border-b border-gray-400 "></div>
          </>
        )}

        <Tabs.TabContent value={0}>
          <div className="flex justify-between">
            <div className="py-3 pt-6">
              <h1 className="text-xl font-semibold text-indigo-900 mb-4">
                Detail PO
              </h1>
              <div className="space-y-6 mb-8">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center gap-10">
                    <p className="text-sm text-gray-500 w-32">Nama PO</p>
                    <p className="text-sm text-gray-700">
                      {dataDetailPurchaseOrder.po_name || "-"}
                    </p>
                  </div>
                  <div className="flex items-center gap-10">
                    <p className="text-sm text-gray-500 w-32">Tipe</p>
                    <p className="text-sm text-gray-700">
                      {getCapitalizeType(dataDetailPurchaseOrder.po_type) ||
                        "-"}
                    </p>
                  </div>
                  <div className="flex items-center gap-10">
                    <p className="text-sm text-gray-500 w-32">Kategori</p>
                    <p className="text-sm text-gray-700">
                      {dataDetailPurchaseOrder.category_name || "-"}
                    </p>
                  </div>
                  <div className="flex items-center gap-[37px]">
                    <p className="text-sm text-gray-500 w-42">
                      Tanggal Request PO
                    </p>
                    <p className="text-sm text-gray-700">
                      {dataDetailPurchaseOrder.request_date
                        ? formatDate(dataDetailPurchaseOrder.request_date)
                        : "-"}
                    </p>
                  </div>
                  <div className="flex items-center gap-10">
                    <p className="text-sm text-gray-500 w-32">Departemen</p>
                    <p className="text-sm text-gray-700">
                      {dataDetailPurchaseOrder.department || "-"}
                    </p>
                  </div>
                  <div className="flex items-center gap-10">
                    <p className="text-sm text-gray-500 w-32">Catatan</p>
                    <p className="text-sm text-gray-700">
                      {dataDetailPurchaseOrder.note || "-"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <CustomTable
              data={dataDetailPurchaseOrder.items}
              columns={columns}
            />
          </div>
        </Tabs.TabContent>
        <Tabs.TabContent value={1}>
          <div>Detail vendor</div>
        </Tabs.TabContent>
      </Tabs>
    </LayoutRightSpace>
  );
};

export default DetailPurchaseOrder;
