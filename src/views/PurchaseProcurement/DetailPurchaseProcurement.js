import LayoutRightSpace from "components/layout/LayoutRightSpace";
import usePurchaseOrder from "utils/hooks/PurchaseOrder/usePurchaseOrder";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

import { findDepartement, formatDate } from "utils/helpers";
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
import ModalAddGoods from "components/custom/ModalAddGoods";
import Steps from "components/ui/Steps";
import Tabs from "components/ui/Tabs";
import ChooseVendorList from "components/rmp/PurchaseProcurement/ChooseVendorList";
import { useDispatch } from "react-redux";
import { setIdPo } from "store/PurchaseOrder/purchaseOrderSlice";
import AddPoGoodsList from "components/rmp/PurchaseProcurement/AddPoGoodsList";
import { set } from "lodash";

const DetailPurchaseOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
  const [itemRequestId, setItemRequestId] = useState(null);
  const [dataItemAdded, setDataItemAdded] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
  const [isOpenConfirmationAdd, setIsOpenConfirmationAdd] = useState(false);
  const [payloadVendor, setPayloadVendor] = useState(null);
  const [dataTableItems, setTableDataItems] = useState([]);

  const handlePayloadVendorChange = (data) => {
    setPayloadVendor(data);
  };

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
        console.log(row.original);
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
                    purchase_request_id: row.original.purchase_request_id,
                    goods_category_name: row.original.goods_category,
                    quantity: row.original.quantity,
                    measurement: row.original.measurement,
                  };
                  if (idRequest && data) {
                    setDataItemAdded(data);
                    handleAddItem(data);
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

  useEffect(() => {
    if (id) {
      getPoDetail(id);
      getPoQueueList(id);
    }
  }, [id]);

  const handleAddToPo = async (itemRequestId) => {
    try {
      setIsLoadingAdd(true);
      const payload = {
        purchase_order_id: id,
        request_item_id: itemRequestId,
      };
      console.log(payload);
      return;
      const resp = await addToExistingPo(payload);

      if (resp.status === "success") {
        setTimeout(() => {
          handleNextStep();
          handleClose();
        }, 2000);
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
      handleClose();
    }
  };

  useEffect(() => {
    if (dataDetailPurchaseOrder.items) {
      setTableDataItems(dataDetailPurchaseOrder.items);
    }
  }, []);

  const handleAddItem = async (item) => {
    setTableDataItems([...dataTableItems, item]);
    setShowNotification(true);

    setTimeout(() => {
      handleClose();
    }, 2000);
  };
  console.log(dataTableItems);
  const handleDeleteItem = (id) => {
    setTableDataItems((prevData) => prevData.filter((item) => item.id !== id));
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
        dispatch(setIdPo(id));
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
        <p className="text-sm text-gray-600 font-medium py-2">
          Tahapan proses PO
        </p>
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
          <Tabs.TabNav value={0} className="flex-col" disabled>
            <span className="text-base">Daftar Barang</span>
            <span className="text-sm text-gray-500">Langkah 1</span>
          </Tabs.TabNav>
          <Tabs.TabNav value={1} className="flex-col" disabled>
            <span className="text-base">Daftar Vendor</span>
            <span className="text-sm text-gray-500">Langkah 2</span>
          </Tabs.TabNav>
        </Tabs.TabList>
        <div className="border-b border-gray-400 "></div>

        <Tabs.TabContent value={0}>
          <AddPoGoodsList
            dataDetailPurchaseOrder={dataDetailPurchaseOrder}
            setIsOpen={setIsOpen}
            dataTableItems={dataTableItems}
            handleDeleteItem={handleDeleteItem}
          />
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
            onClick={handleAddToPo}
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
        // onConfirm={handleConfirm}
        title="Buat Purchase Order ? "
        text="Pastikan data yang anda masukan sudah benar, PO ini akan dikirimkan ke direksi untuk ditinjau, silahkan pantau progress melalui halaman List Purchase Order"
        confirmText="Konfirmasi"
        isLoading={isLoadingAdd}
      />
      <ConfirmationCustom
        isOpen={isOpenConfirmationAdd}
        onClose={() => setIsOpenConfirmationAdd(false)}
        onConfirm={() => handleAddToPo(itemRequestId)}
        title="Tambah Barang ke Purchase Order  "
        text="Anda yakin ingin menambahkan barang ke PO ini ?"
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
