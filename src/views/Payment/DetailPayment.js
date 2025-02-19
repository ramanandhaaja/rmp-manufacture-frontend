import LayoutRightSpace from "components/layout/LayoutRightSpace";
import usePurchaseOrder from "utils/hooks/PurchaseOrder/usePurchaseOrder";
import { useEffect, useState } from "react";
import TextBlockSkeleton from "components/shared/loaders/TextBlockSkeleton";
import { Notification, toast, Button } from "components/ui";
import CustomTable from "components/custom/CustomTable";
import { DataTable } from "components/shared";
import { formatNumber, formatDate, getCapitalizeType } from "utils/helpers";
import Accordion, { AccordionItem } from "components/ui/Accordion/index";
import { RiFileLine } from "react-icons/ri";
import { itemData } from "./dummyData";
import ModalUploadPayment from "components/rmp/Payment/ModalUploadPayment";
import Tabs from "components/ui/Tabs";
import PaymentVendorList from "components/rmp/Payment/PaymentVendorList";
import TimelineCustom from "components/custom/TimelineCustom";
import { NoDataSvg } from "assets/svg";
import { paymentLog } from "./dummyData";
import { useSelector } from "react-redux";
import DetailOfferPayment from "components/rmp/PurchaseProcurement/DetailOfferPayment";
import { useParams } from "react-router-dom";

const DetailVendorOffer = () => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUpload, setIsLoadingUpload] = useState(false);
  const {
    getDetailVendorOffer,
    getPoDetail,
    dataOfferPoVendors,
    dataDetailPurchaseOrder,
    submitPayment,
  } = usePurchaseOrder();
  const chosenVendor = dataDetailPurchaseOrder?.vendors?.filter(
    (vendor) => vendor.status === "approved" ?? []
  );
  const chosenVendorOfferId = chosenVendor?.[0]?.offer_id;
  const [activeTab, setActiveTab] = useState("0");
  const { idPo, paymentMethod } = useSelector((state) => state.purchaseOrder);
  const vendorDetail = dataOfferPoVendors?.vendor_detail;
  const vendorItems = dataOfferPoVendors?.items;
  const deliveryCost = dataOfferPoVendors?.delivery_cost;
  const tax = 120000;
  const totalOfferedPrice = vendorItems?.reduce(
    (sum, item) => sum + item.offered_price,
    0
  );
  const totalAdditionalCost = dataOfferPoVendors?.costs?.reduce(
    (sum, item) => sum + item.cost_value,
    0
  );
  const grandTotal =
    totalOfferedPrice + totalAdditionalCost + deliveryCost + tax;

  const goodsQty = vendorItems?.reduce((sum, item) => sum + item.quantity, 0);

  const payment = dataOfferPoVendors?.payments[0];
  const hasDownPayment =
    payment?.down_payment_amount &&
    parseFloat(payment?.down_payment_amount) > 0;

  useEffect(() => {
    if (idPo) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const response = await getPoDetail(idPo);

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
    }
  }, [idPo]);

  useEffect(() => {
    if (chosenVendorOfferId) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const response = await getDetailVendorOffer(chosenVendorOfferId);

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
    }
  }, [chosenVendorOfferId]);

  const getPayementMethod = (method) => {
    if (method === "pay_in_full") {
      return "Bayar Lunas";
    } else {
      return "Bayar Sebagian";
    }
  };

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
    {
      Header: "Harga Penawaran",
      accessor: "offered_price",
      Cell: ({ row }) => {
        return formatNumber(row.original.offered_price);
      },
    },
  ];

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  const handleConfirmUpload = async (file) => {
    setIsLoadingUpload(true);

    try {
      const formData = new FormData();
      formData.append("payment_struk", file.payment);
      if (file.delivery) {
        formData.append("delivery_order_document", file.delivery);
      }
      if (file.sales) {
        formData.append("sales_order_document", file.sales);
      }

      const resp = await submitPayment(id, formData);
      if (resp.status === "success") {
        toast.push(
          <Notification
            type="success"
            title="Berhasil unggah bukti pembayaran"
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
            title="Maaf terjadi kesalahan, unggah bukti pembayaran"
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
          title="Maaf terjadi kesalahan, unggah bukti pembayaran"
          width={700}
        />,
        {
          placement: "top-center",
        }
      );
      console.error("Error submitting PO release:", error);
    } finally {
      setTimeout(() => {
        setIsLoadingUpload(false);
      }, 1000);
      setIsOpen(false);
    }
  };

  return (
    <LayoutRightSpace>
      <div className=" px-4">
        <h1 className="text-2xl font-semibold text-indigo-900 mb-4">
          Detail PO: {dataDetailPurchaseOrder?.po_number} -{" "}
          {dataDetailPurchaseOrder?.po_name}{" "}
        </h1>
        <Tabs value={activeTab} onChange={handleTabChange} variant="underline">
          <>
            <Tabs.TabList>
              <Tabs.TabNav value={"0"} className="flex-col">
                <span className="text-base">Detail PO</span>
              </Tabs.TabNav>
              <Tabs.TabNav value={"1"} className="flex-col">
                <span className="text-base">Riwayat Pembayaran</span>
              </Tabs.TabNav>
              <Tabs.TabNav value={"2"} className="flex-col">
                <span className="text-base">Daftar Vendor</span>
              </Tabs.TabNav>
            </Tabs.TabList>
            <div className="border-b border-gray-400 "></div>
          </>
          <Tabs.TabContent value={"0"}>
            <div className="flex justify-between mt-6">
              <div className="py-3 ">
                <h2 className="text-xl font-semibold text-indigo-900 mb-4">
                  Detail PO
                </h2>
                <div className="space-y-6 mb-4">
                  {isLoading ? (
                    <TextBlockSkeleton />
                  ) : (
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex items-center gap-10">
                        <p className="text-sm text-gray-500 w-32">Nama PO</p>
                        <p className="text-sm text-gray-700">
                          {dataDetailPurchaseOrder?.po_name}
                        </p>
                      </div>
                      <div className="flex items-center gap-10">
                        <p className="text-sm text-gray-500 w-32">Kategori</p>
                        <p className="text-sm text-gray-700">
                          {dataDetailPurchaseOrder?.category_name}
                        </p>
                      </div>
                      <div className="flex items-center gap-10">
                        <p className="text-sm text-gray-500 w-32">Tipe</p>
                        <p className="text-sm text-gray-700">
                          {getCapitalizeType(dataDetailPurchaseOrder?.po_type)}
                        </p>
                      </div>
                      <div className="flex items-center gap-10">
                        <p className="text-sm text-gray-500 w-32">
                          Tanggal Request PO
                        </p>
                        <p className="text-sm text-gray-700">
                          {formatDate(dataDetailPurchaseOrder?.po_date)}
                        </p>
                      </div>

                      <div className="flex items-center gap-10">
                        <p className="text-sm text-gray-500 w-32">Catatan</p>
                        <p className="text-sm text-gray-700">
                          {dataDetailPurchaseOrder?.note || "-"}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="py-3 ">
                <h2 className="text-xl font-semibold text-indigo-900 mb-4">
                  Vendor Terpilih
                </h2>
                <div className="space-y-6 mb-8">
                  {isLoading ? (
                    <TextBlockSkeleton />
                  ) : (
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex items-center gap-10">
                        <p className="text-sm text-gray-500 w-32">Vendor</p>
                        <p className="text-sm text-gray-700">
                          {vendorDetail?.vendor_name}
                        </p>
                      </div>
                      <div className="flex items-center gap-10">
                        <p className="text-sm text-gray-500 w-32">No Telp</p>
                        <p className="text-sm text-gray-700">
                          {vendorDetail?.vendor_pic_phone}
                        </p>
                      </div>
                      <div className="flex items-center gap-10">
                        <p className="text-sm text-gray-500 w-32">Alamat</p>
                        <p className="text-sm text-gray-700">
                          {vendorDetail?.vendor_address}
                        </p>
                      </div>
                      <div className="flex items-center gap-10">
                        <p className="text-sm text-gray-500 w-32">
                          Metode Pembayaran
                        </p>
                        <p className="text-sm text-gray-700">{paymentMethod}</p>
                      </div>

                      <div className="flex items-center gap-10">
                        <p className="text-sm text-gray-500 w-32">
                          Alamat Pengiriman
                        </p>
                        <p className="text-sm text-gray-700">
                          {dataOfferPoVendors?.delivery_address}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {paymentMethod === "Bayar Lunas" && (
              <div>
                <div className="py-4 border-b border-gray-200">
                  <CustomTable data={itemData} columns={columns} />
                </div>
                <div className="pt-4 py-2">
                  <div className="flex justify-between font-semibold py-4 text-black">
                    <p className="text-base">Total Qty Barang</p>
                    <p className="text-lg">{goodsQty}</p>
                  </div>
                  <h2 className="text-xl font-semibold text-indigo-900 mb-4">
                    Detail Pembayaran
                  </h2>

                  <div className="border-b border-gray-400 pb-4">
                    {isLoading ? (
                      <TextBlockSkeleton />
                    ) : (
                      <DetailOfferPayment
                        dataOfferPoVendors={dataOfferPoVendors}
                        totalOfferedPrice={totalOfferedPrice}
                        deliveryCost={deliveryCost}
                        totalAdditionalCost={totalAdditionalCost}
                        grandTotal={grandTotal}
                      />
                    )}
                  </div>
                  <div className="py-4 ">
                    <h2 className="text-base font-semibold mb-4">
                      Penawaran Vendor
                    </h2>
                    {dataOfferPoVendors?.offering_document ? (
                      <div className="border border-gray-400 rounded-lg p-2 w-[320px] flex items-center gap-1">
                        <RiFileLine size={18} />
                        {dataOfferPoVendors?.offering_document}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-700">
                        Belum ada dokumen penawaran
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "Bayar Sebagian" && (
              <>
                <div className="border-b border-gray-400 my-2"></div>
                <div className="flex justify-between text-2xl py-8">
                  <p className=" font-semibold text-indigo-900 ">
                    Grand Total Pembayaran
                  </p>
                  <p className="font-semibold text-indigo-900 ">
                    {formatNumber(grandTotal)}
                  </p>
                </div>
                <div className="mb-8 space-y-4">
                  {/* //uang muka */}
                  {hasDownPayment && (
                    <Accordion className="border rounded-md">
                      <AccordionItem
                        className="space-y-4"
                        title={
                          <div className="flex justify-between items-center gap-2">
                            <p className="text-lg font-bold">Uang Muka</p>
                            {/* <p className="font-semibold bg-gray-200 py-2 px-2 rounded">
                              Lunas
                            </p> */}
                          </div>
                        }
                        titleClass="font-semibold text-indigo-900"
                      >
                        <div className="grid grid-cols-1 gap-2">
                          <div className="flex items-center gap-10">
                            <p className="text-sm text-gray-500 w-32">Vendor</p>
                            <p className="text-sm text-gray-700">
                              {vendorDetail?.vendor_name}
                            </p>
                          </div>
                          <div className="flex items-center gap-10">
                            <p className="text-sm text-gray-500 w-32">
                              Alamat Pengiriman
                            </p>
                            <p className="text-sm text-gray-700">
                              {dataOfferPoVendors?.delivery_address}
                            </p>
                          </div>
                          <div className="flex items-center gap-10">
                            <p className="text-sm text-gray-500 w-32">
                              Tanggal Dibuat Po
                            </p>
                            <p className="text-sm text-gray-700">
                              {formatDate(dataDetailPurchaseOrder?.po_date)}
                            </p>
                          </div>
                          <div className="flex items-center gap-9">
                            <p className="text-sm text-gray-500 w-35">
                              Tanggal Pembayaran
                            </p>
                            <p className="text-sm text-gray-700">-</p>
                          </div>
                          <div className="py-4">
                            <h2 className="text-base font-semibold mb-4">
                              Bukti Pembayaran
                            </h2>
                            {dataOfferPoVendors?.offering_document ? (
                              <div className="border border-gray-400 rounded-lg p-2 w-[320px] flex items-center gap-1">
                                <RiFileLine size={18} />
                                {dataOfferPoVendors?.offering_document}
                              </div>
                            ) : (
                              <p className="text-sm text-gray-700">
                                Belum ada bukti pembayaran
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="border-b border-gray-400 my-2"></div>
                        <div className="flex justify-between py-4">
                          <p className="text-lg">Jumlah Bayar</p>
                          <div className="block space-y-4">
                            <p className="font-semibold text-indigo-900 text-lg flex justify-end">
                              {formatNumber(payment.down_payment_amount)}
                            </p>
                            <Button onClick={() => setIsOpen(true)}>
                              Bukti Pembayaran
                            </Button>
                          </div>
                        </div>
                      </AccordionItem>
                    </Accordion>
                  )}

                  {/* termin 1 */}
                  {payment.payment_records.map((record, index) => (
                    <Accordion
                      key={record.payment_id}
                      className="border rounded-md"
                    >
                      <AccordionItem
                        title={
                          <div className="flex justify-between items-center gap-2">
                            <p className="text-lg font-bold ">Termin 1</p>
                            {/* <p className=" font-semibold bg-gray-200 py-2 px-2 rounded">
                              Lunas
                            </p> */}
                          </div>
                        }
                      >
                        <div className="grid grid-cols-1 gap-2">
                          <div className="flex items-center gap-10">
                            <p className="text-sm text-gray-500 w-32">Vendor</p>
                            <p className="text-sm text-gray-700">
                              {vendorDetail?.vendor_name}
                            </p>
                          </div>
                          <div className="flex items-center gap-10">
                            <p className="text-sm text-gray-500 w-32">
                              Alamat Pengiriman
                            </p>
                            <p className="text-sm text-gray-700">
                              {dataOfferPoVendors?.delivery_address}
                            </p>
                          </div>
                          <div className="flex items-center gap-10">
                            <p className="text-sm text-gray-500 w-32">
                              Tanggal Dibuat Po
                            </p>
                            <p className="text-sm text-gray-700">
                              {formatDate(dataDetailPurchaseOrder?.po_date)}
                            </p>
                          </div>
                          <div className="flex items-center gap-9">
                            <p className="text-sm text-gray-500 w-35">
                              Tanggal Pembayaran
                            </p>
                            <p className="text-sm text-gray-700">-</p>
                          </div>
                          <div className="flex items-center gap-10">
                            <p className="text-sm text-gray-500 w-32">
                              Status Pengiriman
                            </p>
                            <p className="text-sm text-gray-700">
                              Diterima Pabrik
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <div className="py-4">
                              <h2 className="text-base font-semibold mb-4">
                                Bukti Pembayaran
                              </h2>
                              {/* {dataOfferPoVendors?.offering_document ? ( */}
                              <div className="border border-gray-400 rounded-lg p-2 w-[320px] flex items-center gap-1">
                                {/* {dataOfferPoVendors?.offering_document} */}
                                <RiFileLine size={18} />
                                document-name.pdf
                              </div>
                              {/* ) : ( */}
                              {/* <p className="text-sm text-gray-700">
                                      Belum ada dokumen penawaran
                                      </p> */}
                              {/* )} */}
                            </div>
                            <div className="py-4">
                              <h2 className="text-base font-semibold mb-4">
                                Delivery Order
                              </h2>
                              {/* {dataOfferPoVendors?.offering_document ? ( */}
                              <div className="border border-gray-400 rounded-lg p-2 w-[320px] flex items-center gap-1">
                                {/* {dataOfferPoVendors?.offering_document} */}
                                <RiFileLine size={18} />
                                document-name.pdf
                              </div>
                              {/* ) : ( */}
                              {/* <p className="text-sm text-gray-700">
                                                Belum ada dokumen penawaran
                                                </p> */}
                              {/* )} */}
                            </div>
                            <div className="py-4">
                              <h2 className="text-base font-semibold mb-4">
                                Sales Order
                              </h2>
                              {/* {dataOfferPoVendors?.offering_document ? ( */}
                              <div className="border border-gray-400 rounded-lg p-2 w-[320px] flex items-center gap-1">
                                {/* {dataOfferPoVendors?.offering_document} */}
                                <RiFileLine size={18} />
                                document-name.pdf
                              </div>
                              {/* ) : ( */}
                              {/* <p className="text-sm text-gray-700">
                                  Belum ada dokumen penawaran
                                                  </p> */}
                              {/* )} */}
                            </div>
                          </div>
                        </div>
                        <div className="py-2">
                          <DataTable
                            data={vendorItems}
                            columns={columns}
                            showPagination={false}
                            showLimitPerPage={false}
                          />
                        </div>
                        <div className="flex justify-between py-8 px-4 text-black font-semibold">
                          <p className="text-lg">Total Qty Barang</p>
                          <p className="text-lg">{goodsQty}</p>
                        </div>

                        <div className="border-b border-gray-700 my-2"></div>
                        <div className="py-4 px-2">
                          <DetailOfferPayment
                            dataOfferPoVendors={dataOfferPoVendors}
                            totalOfferedPrice={totalOfferedPrice}
                            deliveryCost={deliveryCost}
                            totalAdditionalCost={totalAdditionalCost}
                            grandTotal={grandTotal}
                          />
                        </div>
                        <div className="flex justify-end py-2">
                          <Button onClick={() => setIsOpen(true)}>
                            Bukti Pembayaran
                          </Button>
                        </div>
                      </AccordionItem>
                    </Accordion>
                  ))}
                </div>
              </>
            )}
          </Tabs.TabContent>
          <Tabs.TabContent value="2">
            <div className="mt-10">
              <PaymentVendorList />
            </div>
          </Tabs.TabContent>
          <Tabs.TabContent value="1">
            <div className="mt-10">
              {/* <div className="flex  flex-col justify-center items-center ">
                <NoDataSvg />

                <div className="flex flex-col gap-1 items-center mt-[21px]">
                  <p className="text-blue-999 text-lg font-bold">
                    Belum Ada Data
                  </p>
                  <p className="text-blue-999">
                    Data pembayaran belum tersedia
                  </p>
                </div>
              </div> */}
              <TimelineCustom steps={paymentLog} />
            </div>
          </Tabs.TabContent>
        </Tabs>
      </div>
      <ModalUploadPayment
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleConfirmUpload}
        paymentMethod={paymentMethod}
        isLoading={isLoadingUpload}
      />
    </LayoutRightSpace>
  );
};

export default DetailVendorOffer;
