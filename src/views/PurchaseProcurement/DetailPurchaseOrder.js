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
import ModalNoteInput from "components/custom/ModalNoteInput";
import ModalUpload from "components/custom/ModalUpload";
import PoAdjusmentNotes from "components/rmp/PurchaseProcurement/PoAdjusmentNotes";

const DetailPurchaseOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    dataDetailPurchaseOrder,
    getPoDetail,
    submitPoVerification,
    releasePo,
    getNotesBod,
    dataPoNotesBod,
  } = usePurchaseOrder();
  const [isLoadingVerify, setIsLoadingVerify] = useState(false);
  const { id } = useParams();
  const { userRole, user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [status, setStatus] = useState("");
  const [activeModal, setActiveModal] = useState(null);
  const [isOpenPoRelease, setIsOpenPoRelease] = useState(false);
  const [isLoadingUpload, setIsLoadingUpload] = useState(false);
  const [isLoadingNotes, setIsLoadingNotes] = useState(false);
  console.log(dataPoNotesBod);

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

  useEffect(() => {
    const fetchDataNotes = async () => {
      setIsLoading(true);
      try {
        const response = await getNotesBod(id);
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

    fetchDataNotes();
  }, []);

  const handleStepChange = (value) => {
    setActiveTab(value);
  };

  useEffect(() => {
    if (activeModal === "adjust") {
      setStatus("Direvisi");
    } else {
      setStatus("Disetujui");
    }
  }, [activeModal]);

  const handleSave = async (values) => {
    const payload = {
      purchase_order_id: id,
      po_status: status,
      note: values.note,
    };

    const response = await submitPoVerification(payload);
    setIsLoadingVerify(true);
    try {
      if (response.status === "success") {
        toast.push(
          <Notification
            type="success"
            title="Verifikasi PO telah berhasil"
            width={700}
          />,
          {
            placement: "top-center",
          }
        );
      } else {
        toast.push(
          <Notification
            type="danger"
            title="Maaf terjadi kesalahan, gagal verifikasi PO"
            width={700}
          />,
          {
            placement: "top-center",
          }
        );
      }
    } catch (error) {
      toast.push(
        <Notification
          type="danger"
          title="Maaf terjadi kesalahan, gagal verifikasi PO"
          width={700}
        />,
        {
          placement: "top-center",
        }
      );
      console.error("Error submitting PO verification:", error);
    } finally {
      setIsLoadingVerify(false);
      setActiveModal(null);
    }
  };

  const handleConfirmUpload = async (file) => {
    setIsLoadingUpload(true);
    try {
      const formData = new FormData();
      formData.append("document", file);

      const resp = await releasePo(id, formData);
      if (resp.status === "success") {
        toast.push(
          <Notification
            type="success"
            title="Berhasil merilis PO"
            width={700}
          />,
          {
            placement: "top-center",
          }
        );
      } else {
        toast.push(
          <Notification
            type="danger"
            title="Maaf terjadi kesalahan, gagal merilis PO"
            width={700}
          />,
          {
            placement: "top-center",
          }
        );
      }
    } catch (error) {
      toast.push(
        <Notification
          type="danger"
          title="Maaf terjadi kesalahan, gagal rilis PO"
          width={700}
        />,
        {
          placement: "top-center",
        }
      );
      console.error("Error submitting PO release:", error);
    } finally {
      setIsLoadingUpload(false);
      setIsOpenPoRelease(false);
    }
  };

  const ButtonDireksi = () => {
    return (
      <>
        <Button onClick={() => setActiveModal("adjust")}>Adjustment</Button>
        <Button
          onClick={() => setActiveModal("approve")}
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
            <PoAdjusmentNotes
              data={dataPoNotesBod}
              isLoading={isLoadingNotes}
            />
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
                        {dataDetailPurchaseOrder.po_date
                          ? formatDate(dataDetailPurchaseOrder.po_date)
                          : "-"}
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
                onClick={() => setIsOpenPoRelease(true)}
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
      <ModalNoteInput
        title={activeModal === "adjust" ? "Adjustment" : "Setujui PO"}
        subtitle="Silahkan tuliskan catatan Anda tentang penyesuaian Purchase Order"
        isOpen={activeModal !== null}
        onClose={() => setActiveModal(null)}
        status={activeModal === "adjust" ? "revised" : "approved"}
        isNoteOpsional={activeModal !== "adjust"}
        onSave={handleSave}
        isLoading={isLoadingVerify}
      />
      <ModalUpload
        onConfirm={handleConfirmUpload}
        isOpen={isOpenPoRelease}
        onClose={() => setIsOpenPoRelease(false)}
        title="Rilis PO"
        subtitle={`Anda akan merilis PO [${dataDetailPurchaseOrder?.po_number}] ,
         silahkan upload dokumen PO yang sudah di tanda tangani`}
        isLoading={isLoadingUpload}
      />
    </LayoutRightSpace>
  );
};

export default DetailPurchaseOrder;
