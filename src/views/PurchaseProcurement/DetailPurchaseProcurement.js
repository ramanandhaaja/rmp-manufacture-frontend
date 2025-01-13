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
import TableListDropdown from "components/template/TableListDropdown";
import SearchBar from "components/custom/SearchBar";
import { FiPlus, FiTrash } from "react-icons/fi";
import ModalAddGoods from "components/custom/ModalAddGoods";
import Steps from "components/ui/Steps";
import Tabs from "components/ui/Tabs";
import ChooseVendorList from "components/rmp/PurchaseProcurement/ChooseVendorList";

const DetailPurchaseOrder = () => {
  const navigate = useNavigate();
  const {
    dataDetailPurchaseOrder,
    getPoDetail,
    getPoQueueList,
    dataPurchaseQueue,
    addToExistingPo,
    addVendorToPo,
    confirmPo,
  } = usePurchaseOrder();
  const [isLoadingList, setIsLoadingList] = useState(false);
  const { id } = useParams();
  const { userRole, user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAdd, setIsLoadingAdd] = useState(false);
  const formikRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [itemRequestId, setItemRequestId] = useState(null);
  const [dataItemAdded, setDataItemAdded] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
  const [payloadVendor, setPayloadVendor] = useState(null);

  const handlePayloadVendorChange = (data) => {
    setPayloadVendor(data);
  };

  const columns = [
    {
      Header: "ID Pembelian",
      accessor: "purchase_request_id",
    },
    {
      Header: "Kode",
      accessor: "goods_id",
      Cell: ({ row }) => row.original.goods_id || "-",
    },
    {
      Header: "Barang",
      accessor: "goods_name",
      Cell: ({ row }) => row.original.goods_name || "-",
    },
    {
      Header: "Departemen",
      accessor: "department_name",
      Cell: ({ row }) => "-",
    },
    {
      Header: "QTY",
      accessor: "quantity",
      Cell: ({ row }) => row.original.quantity || "-",
    },
    {
      Header: "UOM",
      accessor: "measurement",
      Cell: ({ row }) => row.original.measurement || "-",
    },
    {
      accessor: "action",
      Cell: () => {
        return (
          <button className="cursor-pointer">
            <FiTrash size={24} color="red" />
          </button>
        );
      },
    },
  ];

  const columnsAddModal = [
    {
      Header: "Tanggal Request",
      accessor: "approval_date",
      Cell: ({ row }) => {
        return formatDate(row.original.approval_date);
      },
    },
    {
      Header: "ID Pembelian",
      accessor: "purchase_request_id",
    },
    {
      Header: "Kode",
      accessor: "goods_id",
      Cell: ({ row }) => row.original.goods_id || "-",
    },
    {
      Header: "Barang",
      accessor: "goods_name",
      Cell: ({ row }) => row.original.goods_name || "-",
    },
    {
      Header: "Departemen",
      accessor: "department_name",
      Cell: ({ row }) => "-",
    },
    {
      Header: "QTY",
      accessor: "quantity",
      Cell: ({ row }) => row.original.quantity || "-",
    },
    {
      Header: "UOM",
      accessor: "measurement",
      Cell: ({ row }) => row.original.measurement || "-",
    },
    {
      accessor: "action",
      Cell: ({ row }) => {
        return (
          <TableListDropdown
            dropdownItemList={[
              {
                label: "Tambah Ke PO",
                onClick: () => {
                  const idRequest = row.original.purchase_request_item_id;
                  const data = {
                    po_name: dataDetailPurchaseOrder?.po_name,
                    po_number: dataDetailPurchaseOrder?.po_number,
                    goods_name: row.original.goods_name,
                    goods_id: row.original.goods_id,
                  };
                  if (idRequest && data) {
                    setDataItemAdded(data);
                    setItemRequestId(idRequest);

                    setTimeout(() => {
                      handleAddToPo();
                    }, 0);
                  } else {
                    console.log("Invalid ID:", idRequest);
                  }
                },
              },
            ]}
          />
        );
      },
    },
  ];

  //   const handleAddItem = (item) => {
  //     const transformedItem = {
  //       id: item.goods.value,
  //       goods_name: item.goods.label,
  //       goods_category_name: item.goods_category.label,
  //       quantity: item.quantity,
  //       measurement: item.measurement,
  //       measurement_id: item.measurement.value,
  //     };

  //     setTableData([...tableData, transformedItem]);
  //     // setIsOpen(false);
  //   };

  const handleAddToPo = async () => {
    try {
      setIsLoadingAdd(true);
      const payload = {
        purchase_order_id: id,
        request_item_id: itemRequestId,
      };
      const resp = await addToExistingPo(payload);

      if (resp.status === "success") {
        setShowNotification(true);

        await getPoDetail(id);
        setTimeout(() => {
          handleClose();
        }, 3000);
      } else {
        toast.push(
          <Notification
            type="danger"
            title="Maaf terjadi kesalahan, gagal menambahkan Barang"
            width={700}
          />,
          {
            placement: "top-center",
          }
        );
      }
    } catch (error) {
      console.log(error);
      toast.push(
        <Notification
          type="danger"
          title="Maaf terjadi kesalahan, gagal menambahkan Barang"
          width={700}
        />,
        {
          placement: "top-center",
        }
      );
    } finally {
      setIsLoadingAdd(false);
    }
  };
  console.log(payloadVendor);
  const handleConfirm = async () => {
    if (!payloadVendor) return;
    try {
      setIsLoadingAdd(true);

      const resp = await confirmPo(payloadVendor);
      if (resp.status === "success") {
        toast.push(
          <Notification
            type="success"
            title={`PO ${dataDetailPurchaseOrder?.po_number}-${dataDetailPurchaseOrder?.po_name} berhasil diilis`}
            width={700}
          />,
          {
            placement: "top-center",
          }
        );
        setTimeout(() => {
          setIsOpenConfirmation(false);
          navigate("/purchase/pengadaan");
        }, 1000);
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
      console.log(error);
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
    } finally {
      setIsLoadingAdd(false);
    }
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
    setActiveTab(1);
  };

  const handleBackStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
    setActiveTab(0);
  };

  useEffect(() => {
    const fetchPoDetail = async (id) => {
      setIsLoadingList(true);
      try {
        const resp = await getPoDetail(id);
      } catch (error) {
        console.error("Error fetching purchase requests:", error);
      } finally {
        setIsLoadingList(false);
      }
    };

    fetchPoDetail(id);
  }, [id]);

  useEffect(() => {
    const fetchPoQueues = async () => {
      if (dataDetailPurchaseOrder) {
        const { po_type, goods_category_id } = dataDetailPurchaseOrder;

        if (po_type && goods_category_id) {
          try {
            await getPoQueueList({
              goods_type: po_type,
              category_id: goods_category_id,
            });
          } catch (error) {
            console.error("Error fetching purchase requests:", error);
          }
        } else {
          console.warn("Missing parameters:", { po_type, goods_category_id });
        }
      }
    };

    fetchPoQueues();
  }, [dataDetailPurchaseOrder]);

  useEffect(() => {
    if (dataDetailPurchaseOrder) {
      setTableData(dataDetailPurchaseOrder.items);
    }
  }, [dataDetailPurchaseOrder]);

  const handleClose = () => {
    setIsOpen(false);
    setShowNotification(false);
  };

  const handleStepChange = (value) => {
    setCurrentStep(value);
    setActiveTab(value);
  };

  const StepComponent = () => {
    return (
      <div className="p-4">
        <Steps current={currentStep} onChange={handleStepChange} vertical>
          <Steps.Item
            title="Daftar Barang"
            description="Langkah 1"
            status="in-progress"
          />
          <Steps.Item
            title="Daftar Vendor"
            description="Langkah 2"
            status="in-progress"
          />
        </Steps>
      </div>
    );
  };

  return (
    <LayoutRightSpace content={<StepComponent />}>
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
      </div>
      <Tabs value={activeTab} onChange={handleStepChange} variant="underline">
        <Tabs.TabList>
          <Tabs.TabNav value={0} className="flex-col">
            <span className="text-base">Daftar Barang</span>
            <span className="text-sm text-gray-500">Langkah 1</span>
          </Tabs.TabNav>
          <Tabs.TabNav value={1} className="flex-col">
            <span className="text-base">Daftar Vendor</span>
            <span className="text-sm text-gray-500">Langkah 2</span>
          </Tabs.TabNav>
        </Tabs.TabList>
        <div className="border-b border-gray-400 "></div>

        <Tabs.TabContent value={0}>
          <div className="flex justify-between mt-4">
            <div className="py-3 pt-6">
              <div className="space-y-6 mb-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center gap-10">
                    <p className="text-sm text-gray-500 w-32">Nama PO</p>
                    <p className="text-sm text-gray-700">
                      {dataDetailPurchaseOrder.po_name || "-"}
                    </p>
                  </div>
                  <div className="flex items-center gap-10">
                    <p className="text-sm text-gray-500 w-32">Tipe </p>
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
                    <p className="text-sm text-gray-500 w-32">Departemen</p>
                    <p className="text-sm text-gray-700">
                      {dataDetailPurchaseOrder.departement || "-"}
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
            <div className="py-4">
              <div className="flex justify-between my-4">
                <SearchBar placeholder="cari barang" />
                <Button type="button" onClick={() => setIsOpen(true)}>
                  <span className="gap-2 flex items-center">
                    <FiPlus />
                    Tambah Barang
                  </span>
                </Button>
              </div>
              <CustomTable
                data={dataDetailPurchaseOrder.items}
                columns={columns}
              />
            </div>
          </div>
        </Tabs.TabContent>
        <Tabs.TabContent value={1}>
          <ChooseVendorList onPayloadVendorChange={handlePayloadVendorChange} />
        </Tabs.TabContent>
      </Tabs>
      <div className="border-b border-gray-400 w-full mb-4 "></div>
      <div className="flex justify-end gap-2 py-4">
        <Button onClick={handleBackStep} disabled={activeTab == 0}>
          Sebelumnya
        </Button>
        {activeTab == 0 ? (
          <Button
            variant="solid"
            onClick={handleNextStep}
            disabled={activeTab == 1}
          >
            Selanjutnya
          </Button>
        ) : (
          <Button variant="solid" onClick={() => setIsOpenConfirmation(true)}>
            Konfirmasi
          </Button>
        )}
      </div>
      <ConfirmationCustom
        isOpen={isOpenConfirmation}
        onClose={() => setIsOpenConfirmation(false)}
        onConfirm={handleConfirm}
        title="Buat Purchase Order ? "
        text="Pastikan data yang anda masukan sudah benar, PO ini akan dikirimkan ke direksi untuk ditinjau, silahkan pantau progress melalui halaman List Purchase Order"
        confirmText="Konfirmasi"
        isLoading={isLoadingAdd}
      />

      <ModalAddGoods
        isOpen={isOpen}
        onClose={handleClose}
        data={dataPurchaseQueue}
        column={columnsAddModal}
        category={dataDetailPurchaseOrder.category_name}
        type={dataDetailPurchaseOrder.po_type}
        loading={isLoadingAdd}
        showNotification={showNotification}
        dataItemAdded={dataItemAdded}
      />
    </LayoutRightSpace>
  );
};

export default DetailPurchaseOrder;
