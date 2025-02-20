import { useEffect, useState, useMemo } from "react";
import MaterialFilterSidebar from "components/custom/MaterialFilterSideBar";
import CustomTable from "components/custom/CustomTable";
import { formatDate } from "utils/helpers";
import usePurchaseOrder from "utils/hooks/PurchaseOrder/usePurchaseOrder";
import TableListDropdown from "components/template/TableListDropdown";
import Notification from "components/ui/Notification";
import CreatePOModal from "components/custom/ModalCreatePo";
import { toast } from "components/ui";
import ConfirmationCustom from "components/custom/ConfirmationCustom";
import { Loading } from "components/shared";

const ItemQueuesList = ({ type }) => {
  const {
    getPoQueueList,
    dataPurchaseQueue,
    getListExistingPo,
    dataListPoNumber,
    addToExistingPo,
  } = usePurchaseOrder();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [dataPoCreated, setDataPoCreated] = useState({});
  const [dataPoAdded, setDataPoAdded] = useState({});
  const [isAdded, setIsAdded] = useState(false);
  const [itemName, setItemName] = useState("");
  const [idGoods, setIdGoods] = useState(null);
  const [idItemRequest, setIdItemRequest] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [showNotificationItem, setShowNotificationAddItem] = useState(false);
  const [itemCategory, setItemCategory] = useState({
    id: null,
    po_type: " ",
  });

  const reversedDataListPoNumber = dataListPoNumber?.slice().reverse();

  const columns = [
    {
      Header: "Tanggal Request",
      accessor: "approval_date",
      Cell: ({ row }) => {
        return formatDate(row.original.approval_date);
      },
    },
    {
      Header: "ID Request",
      accessor: "purchase_request_id",
      Cell: ({ row }) => row.original.purchase_request_id,
    },
    {
      Header: "Kode",
      accessor: "goods_id",
      Cell: ({ row }) => row.original.goods_id,
    },

    {
      Header: "Barang",
      accessor: "goods_name",
      Cell: ({ row }) => row.original.goods_name,
    },
    {
      Header: "Departemen",
      accessor: "department_name",
      Cell: ({ row }) => row.original.department_name,
    },
    {
      Header: "QTY",
      accessor: "quantity",
      Cell: ({ row }) => row.original.quantity,
    },
    {
      Header: "Measurement",
      accessor: "measurement",
      Cell: ({ row }) => row.original.measurement,
    },

    {
      Cell: ({ row }) => (
        <TableListDropdown
          dropdownItemList={[
            {
              label: "Buat PO Baru",
              onClick: () => {
                setIsOpen(true);
                setItemCategory({
                  id: row.original.goods_category_id,
                  po_type: type,
                });
              },
            },
            {
              label: "Tambah Ke PO",
              subMenu:
                reversedDataListPoNumber?.map((po) => ({
                  label: `PO ${po.purchase_order_number} - ${po.po_name}`,
                  onClick: () => {
                    setDataForNotifAdded(
                      row.original.goods_name,
                      row.original.goods_id
                    );
                    setDataPoAdded(po);
                    setIdItemRequest(row.original.purchase_request_item_id);
                    setIsOpenConfirmation(true);
                  },
                })) || [],
            },
          ]}
          placement={"top-end"}
        />
      ),
    },
  ];

  useEffect(() => {
    if (dataPurchaseQueue && dataPurchaseQueue.length > 0) {
      const initialCategory = dataPurchaseQueue[0].goods_category_id;
      setActiveCategory(initialCategory);
    }
  }, [dataPurchaseQueue]);

  useEffect(() => {
    const fetchPoQueues = async () => {
      setIsLoading(true);
      try {
        await getPoQueueList({ goods_type: type });
      } catch (error) {
        console.error("Error fetching purchase requests:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPoQueues();
  }, []);

  useEffect(() => {
    const fetchExistingPo = async () => {
      setIsLoading(true);
      try {
        await getListExistingPo();
      } catch (error) {
        console.error("Error fetching purchase requests:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExistingPo();
  }, []);

  const setDataForNotifAdded = (name, idGoods) => {
    setItemName(name);
    setIdGoods(idGoods);
  };

  const handleAddToPo = async () => {
    if (!dataPoAdded || !idItemRequest) return;
    try {
      setIsLoadingCreate(true);
      const payload = {
        purchase_order_id: dataPoAdded.id,
        request_item_id: idItemRequest,
      };

      const resp = await addToExistingPo(payload);
      if (resp.status === "success") {
        setIsAdded(true);
        setShowNotificationAddItem(true);
        setIsOpenConfirmation(false);
      } else {
        toast.push(
          <Notification
            type="danger"
            title="Maaf terjadi kesalahan, gagal menambahkan PO"
            width={700}
          />,
          {
            placement: "top-center",
          }
        );

        setTimeout(() => {
          setIsOpenConfirmation(false);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      toast.push(
        <Notification
          type="danger"
          title="Maaf terjadi kesalahan, gagal menambahkan PO"
          width={700}
        />,
        {
          placement: "top-center",
        }
      );
      setTimeout(() => {
        setIsOpenConfirmation(false);
      }, 1000);
    } finally {
      setIsLoadingCreate(false);
    }
  };

  const filteredData = useMemo(() => {
    if (!activeCategory) return dataPurchaseQueue;
    return dataPurchaseQueue?.filter(
      (item) => item.goods_category_id === activeCategory
    );
  }, [dataPurchaseQueue, activeCategory]);

  const handleModalClose = () => {
    setIsOpen(false);
    setItemCategory({
      id: null,
      type: "",
    });
  };

  return (
    <div className="px-2 py-6">
      <div className="flex justify-center pb-3">
        {showNotification && (
          <Notification
            duration={5000}
            onClose={() => {
              setShowNotification(false);
            }}
            type="info"
            closable={true}
            width={900}
            className="text-gray-700 text-base"
          >
            {dataPoCreated.purchase_order_number}-{dataPoCreated.po_name}{" "}
            berhasil dibuat, Anda sekarang dapat menambahkan barang ke PO
            tersebut
          </Notification>
        )}
        {showNotificationItem && (
          <Notification
            duration={8000}
            onClose={() => {
              setShowNotificationAddItem(false);
              setIsAdded(false);
            }}
            type="info"
            closable={true}
            width={900}
            className="text-gray-700 text-base"
          >
            {idGoods}-{itemName} berhasil ditambahkan ke{" "}
            {dataPoAdded.purchase_order_number}-{dataPoAdded.po_name}
          </Notification>
        )}
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-full">
          <Loading loading={isLoading} />
        </div>
      ) : (
        <div className="flex gap-6 border border-gray-200 rounded-xl">
          <>
            <MaterialFilterSidebar
              data={dataPurchaseQueue}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
            <div className="flex-1 p-4">
              <CustomTable data={filteredData} columns={columns} />
            </div>
          </>
        </div>
      )}
      <CreatePOModal
        goodsCategory={itemCategory}
        isOpen={isOpen}
        onClose={handleModalClose}
        setSubmitted={setShowNotification}
        setSubmittedData={setDataPoCreated}
      />
      <ConfirmationCustom
        isOpen={isOpenConfirmation}
        onClose={() => setIsOpenConfirmation(false)}
        onConfirm={handleAddToPo}
        title="Tambahkan barang ke PO "
        text={`Anda yakin akan menambahkan data ini ke ${dataPoAdded.purchase_order_number}-${dataPoAdded.po_name} ?`}
        confirmText="Tambah"
        isLoading={isLoadingCreate}
      />
    </div>
  );
};

export default ItemQueuesList;
