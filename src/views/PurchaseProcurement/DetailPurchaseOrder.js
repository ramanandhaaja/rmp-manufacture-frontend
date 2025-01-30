import LayoutRightSpace from "components/layout/LayoutRightSpace";
import usePurchaseOrder from "utils/hooks/PurchaseOrder/usePurchaseOrder";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { formatDate, getCapitalizeType } from "utils/helpers";
import CustomTable from "components/custom/CustomTable";
import { Button } from "components/ui";
import { useNavigate } from "react-router-dom";
import useUser from "utils/hooks/useUser";
import { Notification, toast } from "components/ui";
import ConfirmationCustom from "components/custom/ConfirmationCustom";
import { Loading } from "components/shared";
import { setVendorOfferId } from "store/PurchaseOrder/purchaseOrderSlice";
import { useDispatch } from "react-redux";
import TableListDropdown from "components/template/TableListDropdown";
import Tabs from "components/ui/Tabs";
import TextBlockSkeleton from "components/shared/loaders/TextBlockSkeleton";
import { FiCheckCircle } from "react-icons/fi";

const DetailPurchaseOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    dataDetailPurchaseOrder,
    getPoDetail,
    dataOfferPoVendors,
    getDetailVendorOffer,
  } = usePurchaseOrder();
  const [isLoadingList, setIsLoadingList] = useState(false);
  const { id } = useParams();
  const { userRole, user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [status, setStatus] = useState("");
  console.log(dataDetailPurchaseOrder);
  const columns = [
    {
      Header: "ID Pembelian",
      accessor: "purchase_request_id",
    },
    {
      Header: "Kode",
      accessor: "goods_id",
    },
    {
      Header: "Barang",
      accessor: "goods_name",
    },
    {
      Header: "QTY",
      accessor: "quantity",
    },
    {
      Header: "UOM",
      accessor: "measurement",
    },
  ];

  const columnsVendor = [
    {
      Header: "ID Vendor",
      accessor: "vendor_id",
    },
    {
      Header: "Vendor",
      accessor: "name",
    },
    {
      Header: "PIC",
      accessor: "pic_name",
    },
    {
      Header: "Kontak PIC",
      accessor: "pic_phone",
    },
    {
      Header: "Email PIC",
      accessor: "pic_email",
    },
    {
      Header: "Prioritas",
      accessor: "priority",
    },
    {
      Header: "Penawaran",
      accessor: "is_submit_offer",
      Cell: ({ row }) => {
        return row.original.is_submit_offer ? (
          <div className="flex justify-center gap-2 items-center py-1 bg-emerald-600 text-xs text-white rounded">
            <p>Penawaran</p>
            <span>
              <FiCheckCircle />
            </span>
          </div>
        ) : (
          <span>-</span>
        );
      },
    },
    {
      accessor: "action",
      Cell: ({ row }) => {
        return (
          <TableListDropdown
            dropdownItemList={[
              {
                label: "Edit",
                onClick: () => {
                  dispatch(setVendorOfferId(row.original.offer_id));
                  navigate(
                    `/purchase/pengadaan/edit-penawaran-vendor/${row.original.vendor_id}`
                  );
                },
              },
              {
                label: "Detail Vendor",
                onClick: () =>
                  navigate(
                    `/vendor-management/detail-vendor/${row.original.vendor_id}`
                  ),
              },
              {
                label: "Detail Penawaran",
                onClick: () =>
                  navigate(
                    `/purchase/pengadaan/detail-penawaran-vendor/${row.original.offer_id}`
                  ),
              },
            ]}
          />
        );
      },
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getPoDetail(id);
        if (response.status === "failed") {
          toast.push(
            <Notification
              type="danger"
              title="Terjadi gangguan, gagal memuat data"
              description={response.message}
            />,
            {
              placement: "top-center",
            }
          );
        }
      } catch (error) {
        console.error("Error fetching PO details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleStepChange = (value) => {
    setActiveTab(value);
  };

  const ButtonDireksi = () => {
    return (
      <>
        <Button
        // onClick={() => navigate(`/purchase/request/detail/informasi-pembelian/${id}`)}
        >
          Adjustment
        </Button>
        <Button
          //   onClick={() => formikRef.current.handleSubmit()}
          variant="solid"
          className="text-white"
        >
          Setujui
        </Button>
      </>
    );
  };

  const DetailPoDireksi = () => {
    return (
      <Tabs value={activeTab} onChange={handleStepChange} variant="underline">
        <>
          <Tabs.TabList>
            <Tabs.TabNav value={0} className="flex-col">
              <span className="text-base">Detail PO</span>
            </Tabs.TabNav>
            <Tabs.TabNav value={1} className="flex-col">
              <span className="text-base">Detail Vendor</span>
            </Tabs.TabNav>
            <Tabs.TabNav value={2} className="flex-col">
              <span className="text-base">Catatan</span>
            </Tabs.TabNav>
          </Tabs.TabList>
          <div className="border-b border-gray-400 "></div>
        </>

        <Tabs.TabContent value={0}>
          <div className="mt-10">
            <CustomTable
              data={dataDetailPurchaseOrder?.items}
              columns={columns}
              isLoading={isLoading}
            />
          </div>
        </Tabs.TabContent>
        <Tabs.TabContent value={1}>
          <div className="mt-10">
            <CustomTable
              data={dataDetailPurchaseOrder.vendors}
              columns={columnsVendor}
              isLoading={isLoading}
            />
          </div>
        </Tabs.TabContent>
        <Tabs.TabContent value={2}>
          <div className=" p-6 w-full max-w-4xl">
            <div className="grid grid-cols-3 gap-6">
              <div className="flex items-center">
                <p className="text-sm font-bold mb-2">12/5/2024, 10:00 WIB</p>
              </div>
              <div>
                <div className=" p-4">
                  <p className="text-sm font-bold text-gray-500">
                    Catatan Adjustment
                  </p>
                  <p className="text-xs text-gray-700 mt-2">
                    Diah Budiantio (Direks)
                  </p>
                </div>
              </div>
              <div>
                <div className=" p-4 mb-4">
                  <p className="text-gray-700">
                    baik bu, untuk harganya sudah di negosiasikan kembali,
                    silahkan di cek
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Tabs.TabContent>
      </Tabs>
    );
  };

  const DetailPoGeneral = () => {
    return (
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
                {isLoading ? (
                  <TextBlockSkeleton />
                ) : (
                  <div className="grid grid-cols-1 gap-2">
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
                )}
              </div>
            </div>
          </div>
          <div className="py-4 mb-4">
            <h1 className="text-xl font-semibold text-indigo-900 pb-4">
              Barang
            </h1>
            <CustomTable
              data={dataDetailPurchaseOrder?.items}
              columns={columns}
              isLoading={isLoading}
            />
          </div>
          <div className="py-4">
            <h1 className="text-xl font-semibold text-indigo-900 pb-4">
              Vendor
            </h1>
            <CustomTable
              data={dataDetailPurchaseOrder.vendors}
              columns={columnsVendor}
              isLoading={isLoading}
            />
          </div>
        </Tabs.TabContent>
        <Tabs.TabContent value={1}>
          <div>Detail vendor</div>
        </Tabs.TabContent>
      </Tabs>
    );
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
          {userRole.includes("bod") ? (
            <ButtonDireksi />
          ) : (
            <>
              <Button
              // onClick={() =>
              //   navigate(`/purchase/request/detail/informasi-pembelian/${id}`)
              // }
              >
                Download PO
              </Button>
              <Button
                //   onClick={() => formikRef.current.handleSubmit()}
                variant="solid"
                className="text-white"
              >
                Rilis PO
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="border-b border-gray-400 my-2"></div>
      {userRole.includes("bod") && <DetailPoDireksi />}
      {!userRole.includes("bod") && <DetailPoGeneral />}
    </LayoutRightSpace>
  );
};

export default DetailPurchaseOrder;
