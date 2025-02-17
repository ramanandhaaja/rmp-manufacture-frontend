import LayoutRightSpace from "components/layout/LayoutRightSpace";
import usePurchaseOrder from "utils/hooks/PurchaseOrder/usePurchaseOrder";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TextBlockSkeleton from "components/shared/loaders/TextBlockSkeleton";
import { Notification, toast, Button } from "components/ui";
import CustomTable from "components/custom/CustomTable";
import { formatNumber } from "utils/helpers";
import Accordion, { AccordionItem } from "components/ui/Accordion/index";
import { RiFileLine } from "react-icons/ri";
import { itemData } from "./dummyData";
import ModalUpload from "components/custom/ModalUpload";
import Tabs from "components/ui/Tabs";
import PaymentVendorList from "components/rmp/Payment/PaymentVendorList";
import TimelineCustom from "components/custom/TimelineCustom";
import { NoDataSvg } from "assets/svg";
import { paymentLog } from "./dummyData";

const DetailVendorOffer = () => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { getDetailVendorOffer, dataOfferPoVendors, dataDetailPurchaseOrder } =
    usePurchaseOrder(id);
  const vendorDetail = dataOfferPoVendors?.vendor_detail;
  const vendorItems = dataOfferPoVendors?.items;
  const deliveryCost = dataOfferPoVendors?.delivery_cost;
  const [activeTab, setActiveTab] = useState("0");
  //   const totalOfferedPrice = vendorItems.reduce(
  //     (sum, item) => sum + item.offered_price,
  //     0
  //   );
  //   const totalOfferedPrice = vendorItems.reduce(
  //     (sum, item) => sum + item.offered_price,
  //     0
  //   );
  //   const totalAdditionalCost = dataOfferPoVendors?.costs?.reduce(
  //     (sum, item) => sum + item.cost_value,
  //     0
  //   );
  //   const grandTotal = totalOfferedPrice + totalAdditionalCost + deliveryCost;

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       setIsLoading(true);
  //       try {
  //         const response = await getDetailVendorOffer(id);

  //         if (response.status === "failed") {
  //           toast.push(
  //             <Notification
  //               type="danger"
  //               title="Terjadi gangguan, gagal memuat data"
  //               description={response.message}
  //             />,
  //             {
  //               placement: "top-center",
  //             }
  //           );
  //         }
  //       } catch (error) {
  //         console.error("Error fetching PO details:", error);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     };

  //     fetchData();
  //   }, [id]);

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
      accessor: "ID_Pembelian",
    },
    {
      Header: "Kode",
      accessor: "Kode",
    },
    {
      Header: "Barang",
      accessor: "Barang",
    },
    {
      Header: "QTY",
      accessor: "QTY",
    },
    {
      Header: "UOM",
      accessor: "UOM",
    },
    {
      Header: "Harga Penawaran",
      accessor: "Harga_Penawaran",
      Cell: ({ row }) => {
        return formatNumber(row.original.Harga_Penawaran);
      },
    },
  ];

  const handleTabChange = (value) => {
    setActiveTab(value);
  };
  return (
    <LayoutRightSpace>
      <div className=" px-4">
        <h1 className="text-2xl font-semibold text-indigo-900 mb-4">
          Detail PO: PO0232 - Bahan Baku
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
                        <p className="text-sm text-gray-700">PO Bahan Baku</p>
                      </div>
                      <div className="flex items-center gap-10">
                        <p className="text-sm text-gray-500 w-32">Kategori</p>
                        <p className="text-sm text-gray-700">Bahan Mentah</p>
                      </div>
                      <div className="flex items-center gap-10">
                        <p className="text-sm text-gray-500 w-32">Tipe</p>
                        <p className="text-sm text-gray-700">Material</p>
                      </div>
                      <div className="flex items-center gap-10">
                        <p className="text-sm text-gray-500 w-32">
                          Tanggal Request PO
                        </p>
                        <p className="text-sm text-gray-700">15/01/2023</p>
                      </div>
                      <div className="flex items-center gap-10">
                        <p className="text-sm text-gray-500 w-32">Departemen</p>
                        <p className="text-sm text-gray-700">PPIC</p>
                      </div>
                      <div className="flex items-center gap-10">
                        <p className="text-sm text-gray-500 w-32">Catatan</p>
                        <p className="text-sm text-gray-700">-</p>
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
                          PT Sejahtera Jaya
                        </p>
                      </div>
                      <div className="flex items-center gap-10">
                        <p className="text-sm text-gray-500 w-32">No Telp</p>
                        <p className="text-sm text-gray-700">08213232141</p>
                      </div>
                      <div className="flex items-center gap-10">
                        <p className="text-sm text-gray-500 w-32">Alamat</p>
                        <p className="text-sm text-gray-700">Cikarang Barat</p>
                      </div>
                      <div className="flex items-center gap-10">
                        <p className="text-sm text-gray-500 w-32">
                          Metode Pembayaran
                        </p>
                        <p className="text-sm text-gray-700">Bayar Sebagian</p>
                      </div>

                      <div className="flex items-center gap-10">
                        <p className="text-sm text-gray-500 w-32">
                          Alamat Pengiriman
                        </p>
                        <p className="text-sm text-gray-700">Factory</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="border-b border-gray-400 my-2"></div>
            <div className="flex justify-between text-2xl py-8">
              <p className=" font-semibold text-indigo-900 ">
                Grand Total Pembayaran
              </p>
              <p className="font-semibold text-indigo-900 ">20.000.000</p>
            </div>
            <div className="mb-8 space-y-4">
              {/* //uang muka */}
              <Accordion className="border rounded-md ">
                <AccordionItem
                  className="space-y-4"
                  title={
                    <div className="flex justify-between items-center gap-2">
                      <p className="text-lg font-bold ">Uang Muka</p>
                      <p className=" font-semibold bg-gray-200 py-2 px-2 rounded">
                        Lunas
                      </p>
                    </div>
                  }
                  titleClass=" font-semibold text-indigo-900"
                >
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center gap-10">
                      <p className="text-sm text-gray-500 w-32">Vendor</p>
                      <p className="text-sm text-gray-700">PT Sejahtera Jaya</p>
                    </div>
                    <div className="flex items-center gap-10">
                      <p className="text-sm text-gray-500 w-32">
                        Alamat Pengiriman
                      </p>
                      <p className="text-sm text-gray-700">Factory</p>
                    </div>

                    <div className="flex items-center gap-10">
                      <p className="text-sm text-gray-500 w-32">
                        Tanggal Dibuat Po
                      </p>
                      <p className="text-sm text-gray-700">15/11/2023</p>
                    </div>

                    <div className="flex items-center gap-9">
                      <p className="text-sm text-gray-500 w-35">
                        Tanggal Pembayaran
                      </p>
                      <p className="text-sm text-gray-700">18/12/2023</p>
                    </div>
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
                  </div>
                  <div className="border-b border-gray-400 my-2"></div>
                  <div className="flex justify-between py-4">
                    <p className="text-lg">Jumlah Bayar</p>
                    <div className="block space-y-4 ">
                      <p className="font-semibold text-indigo-900 text-lg flex justify-end">
                        5.000.000
                      </p>
                      <Button onClick={() => setIsOpen(true)}>
                        Bukti Pembayaran
                      </Button>
                    </div>
                  </div>
                </AccordionItem>
              </Accordion>

              {/* termin 1 */}
              <Accordion className="border rounded-md ">
                <AccordionItem
                  title={
                    <div className="flex justify-between items-center gap-2">
                      <p className="text-lg font-bold ">Termin 1</p>
                      <p className=" font-semibold bg-gray-200 py-2 px-2 rounded">
                        Lunas
                      </p>
                    </div>
                  }
                >
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center gap-10">
                      <p className="text-sm text-gray-500 w-32">Vendor</p>
                      <p className="text-sm text-gray-700">PT Sejahtera Jaya</p>
                    </div>
                    <div className="flex items-center gap-10">
                      <p className="text-sm text-gray-500 w-32">
                        Alamat Pengiriman
                      </p>
                      <p className="text-sm text-gray-700">Factory</p>
                    </div>

                    <div className="flex items-center gap-10">
                      <p className="text-sm text-gray-500 w-32">
                        Tanggal Dibuat Po
                      </p>
                      <p className="text-sm text-gray-700">15/11/2023</p>
                    </div>

                    <div className="flex items-center gap-9">
                      <p className="text-sm text-gray-500 w-35">
                        Tanggal Pembayaran
                      </p>
                      <p className="text-sm text-gray-700">18/12/2023</p>
                    </div>
                    <div className="flex items-center gap-10">
                      <p className="text-sm text-gray-500 w-32">
                        Status Pengiriman
                      </p>
                      <p className="text-sm text-gray-700">Diterima Pabrik</p>
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
                  <div className="py-4 border-b border-gray-200">
                    <CustomTable data={itemData} columns={columns} />
                  </div>
                  <div className="flex justify-between py-8 px-4 font-bold">
                    <p className="text-lg">Total Qty Barang</p>
                    <p className="text-lg">240</p>
                  </div>

                  <div className="border-b border-gray-700 my-2"></div>
                  <div className="flex justify-between py-4 px-4 ">
                    <div className="block space-y-4 ">
                      <p className="text-lg">Subtotal</p>
                      <p className="text-lg">Biaya Pengiriman</p>
                      <p className="text-lg">Biaya Lainnya 1</p>
                      <p className="text-lg">Biaya Lainnya 2</p>
                      <p className="text-lg">Pajak</p>
                      <p className="text-lg">Harga Grand Total</p>
                    </div>
                    <div className="block space-y-4 ">
                      <p className="font-semibold text-indigo-900 text-lg flex justify-end">
                        12.000.000
                      </p>
                      <p className="font-semibold text-indigo-900 text-lg flex justify-end">
                        1.000.000
                      </p>
                      <p className="font-semibold text-indigo-900 text-lg flex justify-end">
                        500.000
                      </p>
                      <p className="font-semibold text-indigo-900 text-lg flex justify-end">
                        500.000
                      </p>
                      <p className="font-semibold text-indigo-900 text-lg flex justify-end">
                        120.000
                      </p>
                      <p className="font-semibold text-indigo-900 text-lg flex justify-end">
                        14.120.000
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end py-2">
                    <Button onClick={() => setIsOpen(true)}>
                      Bukti Pembayaran
                    </Button>
                  </div>
                </AccordionItem>
              </Accordion>

              {/* termin 2 */}

              <Accordion className="border rounded-md ">
                <AccordionItem
                  title={
                    <div className="flex justify-between items-center gap-2">
                      <p className="text-lg font-bold ">Termin 2</p>
                      {/* <p className=" font-semibold bg-gray-200 py-2 px-2 rounded">
                    Lunas
                  </p> */}
                    </div>
                  }
                >
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center gap-10">
                      <p className="text-sm text-gray-500 w-32">Vendor</p>
                      <p className="text-sm text-gray-700">PT Sejahtera Jaya</p>
                    </div>
                    <div className="flex items-center gap-10">
                      <p className="text-sm text-gray-500 w-32">
                        Alamat Pengiriman
                      </p>
                      <p className="text-sm text-gray-700">Factory</p>
                    </div>

                    <div className="flex items-center gap-10">
                      <p className="text-sm text-gray-500 w-32">
                        Tanggal Dibuat Po
                      </p>
                      <p className="text-sm text-gray-700">15/11/2023</p>
                    </div>

                    <div className="flex items-center gap-9">
                      <p className="text-sm text-gray-500 w-35">
                        Tanggal Pembayaran
                      </p>
                      <p className="text-sm text-gray-700">18/12/2023</p>
                    </div>
                    <div className="flex items-center gap-10">
                      <p className="text-sm text-gray-500 w-32">
                        Status Pengiriman
                      </p>
                      <p className="text-sm text-gray-700">Diterima Pabrik</p>
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
                        <h2 className=" text-base font-semibold mb-4">
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
                        <h2 className=" text-base font-semibold mb-4">
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
                  <div className="py-4 border-b border-gray-200">
                    <CustomTable data={itemData} columns={columns} />
                  </div>
                  <div className="flex justify-between py-8 px-4 font-bold">
                    <p className="text-lg">Total Qty Barang</p>
                    <p className="text-lg">240</p>
                  </div>

                  <div className="border-b border-gray-700 my-2"></div>
                  <div className="flex justify-between py-4 px-4 ">
                    <div className="block space-y-4 ">
                      <p className="text-lg">Subtotal</p>
                      <p className="text-lg">Biaya Pengiriman</p>

                      <p className="text-lg">Pajak</p>
                      <p className="text-lg">Harga Grand Total</p>
                    </div>
                    <div className="block space-y-4 ">
                      <p className="font-semibold text-indigo-900 text-lg flex justify-end">
                        12.000.000
                      </p>
                      <p className="font-semibold text-indigo-900 text-lg flex justify-end">
                        1.000.000
                      </p>

                      <p className="font-semibold text-indigo-900 text-lg flex justify-end">
                        120.000
                      </p>
                      <p className="font-semibold text-indigo-900 text-lg flex justify-end">
                        14.120.000
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end py-2">
                    <Button variant="solid">Bayar Po</Button>
                  </div>
                </AccordionItem>
              </Accordion>
            </div>
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
      <ModalUpload
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => setIsOpen(false)}
        title="Upload Bukti Pembayaran"
        subtitle="Silahkan unggah bukti pembayaran yang sah"
      />
    </LayoutRightSpace>
  );
};

export default DetailVendorOffer;
