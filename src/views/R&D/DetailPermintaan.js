import LayoutRightSpace from "components/layout/LayoutRightSpace";
import usePurchaseOrder from "utils/hooks/PurchaseOrder/usePurchaseOrder";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TextBlockSkeleton from "components/shared/loaders/TextBlockSkeleton";
import { Notification, toast, Button } from "components/ui";
import CustomTable from "components/custom/CustomTable";
import { formatNumber } from "utils/helpers";
import Accordion, { AccordionItem } from "components/ui/Accordion/index";
import { CiImageOn } from "react-icons/ci";
import { RiFileLine } from "react-icons/ri";
import ModalUpload from "components/custom/ModalUpload";
import Tabs from "components/ui/Tabs";
import PaymentVendorList from "components/rmp/Payment/PaymentVendorList";
import { NoDataSvg } from "assets/svg";
import ProcessDevelopment from "components/rmp/R&D/ProcessDevelopment";
import { useLocation } from "react-router-dom";

const DetailPermintaanRnd = () => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { getDetailVendorOffer, dataOfferPoVendors, dataDetailPurchaseOrder } =
    usePurchaseOrder(id);
  const vendorDetail = dataOfferPoVendors?.vendor_detail;
  const vendorItems = dataOfferPoVendors?.items;
  const deliveryCost = dataOfferPoVendors?.delivery_cost;
  const [activeTab, setActiveTab] = useState("0");
  const location = useLocation();
  const checkUrl = location.pathname.includes("product-r&d");
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

  const documents = Array(3).fill(null);

  const dummyData = [
    {
      nama: "PT Harapan Pharmacy",
      zatAktif: "Paracetamol",
      Kekuatan: "Kuat",
      Brand: "Panadol",
      bentukSediaan: "Tablet",
      Kemasan: "Strip",
      Dosis: "150 Mg",
      HNA: " 1.500",
    },
    {
      nama: "PT Indah Pharmacy",

      zatAktif: "Ibuprofen",
      Kekuatan: "Kuat",
      Brand: "Advil",
      bentukSediaan: "Tablet",
      Kemasan: "Botol",
      Dosis: "110 Mg",
      HNA: " 2.000",
    },
    {
      nama: "PT Bintang Pharmacy",

      zatAktif: "Amoxicillin",
      Kekuatan: "Kuat",
      Brand: "Amoxil",
      bentukSediaan: "Capsule",
      Kemasan: "Box",
      Dosis: "150 Mg",
      HNA: " 3.000",
    },
  ];

  const columns = [
    {
      Header: "Zat Aktif",
      accessor: "zatAktif",
    },
    {
      Header: "Kekuatan",
      accessor: "Kekuatan",
    },
    {
      Header: "Brand",
      accessor: "Brand",
    },
    {
      Header: "Bentuk Sediaan",
      accessor: "bentukSediaan",
    },
    {
      Header: "Kemasan",
      accessor: "Kemasan",
    },
    {
      Header: "Dosis",
      accessor: "Dosis",
    },
    {
      Header: "Target HNA",
      accessor: "HNA",
    },
  ];

  const columnsCompetitor = [
    {
      Header: "Nama",
      accessor: "nama",
    },
    {
      Header: "Zat Aktif",
      accessor: "zatAktif",
    },
    {
      Header: "Kekuatan",
      accessor: "Kekuatan",
    },
    {
      Header: "Brand",
      accessor: "Brand",
    },
    {
      Header: "Bentuk Sediaan",
      accessor: "bentukSediaan",
    },
    {
      Header: "Kemasan",
      accessor: "Kemasan",
    },
    {
      Header: "Dosis",
      accessor: "Dosis",
    },
    {
      Header: "HNA",
      accessor: "HNA",
    },
  ];

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  const renderTabList = () => {
    console.log(checkUrl);
    if (checkUrl) {
      return (
        <>
          <Tabs.TabList className="border-b border-gray-300 pt-2">
            <Tabs.TabNav value={"0"} className="flex-col">
              <span className="text-base">Detail Permintaan</span>
            </Tabs.TabNav>
            <Tabs.TabNav value={"1"} className="flex-col">
              <span className="text-base">Log Aktifitas</span>
            </Tabs.TabNav>
          </Tabs.TabList>
        </>
      );
    } else {
      return (
        <>
          <Tabs.TabList className="border-b border-gray-300 pt-2">
            <Tabs.TabNav value={"0"} className="flex-col">
              <span className="text-base">1. Detail Permintaan</span>
            </Tabs.TabNav>
            <Tabs.TabNav value={"1"} className="flex-col">
              <span className="text-base">2. Pengembangan</span>
            </Tabs.TabNav>
          </Tabs.TabList>
        </>
      );
    }
  };

  return (
    <LayoutRightSpace>
      <div className=" px-4">
        <h1 className="text-2xl font-semibold text-indigo-900 mb-4 ">
          Detail Permintaan Pengembangan Vipalbumin
        </h1>
        <div className="border-b border-gray-300 "></div>

        <Tabs value={activeTab} onChange={handleTabChange} variant="underline">
          {renderTabList()}
          <Tabs.TabContent value={"0"}>
            <div className="flex justify-between mt-6 px-4">
              <div className="py-3 ">
                <div className="space-y-6 mb-4">
                  {isLoading ? (
                    <TextBlockSkeleton />
                  ) : (
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex items-">
                        <p className="text-sm text-gray-500 w-48">Id</p>
                        <p className="text-sm text-gray-700">67847</p>
                      </div>
                      <div className="flex items-center ">
                        <p className="text-sm text-gray-500 w-48">
                          Tipe Pengembangan
                        </p>
                        <p className="text-sm text-gray-700">Produk Baru</p>
                      </div>
                      <div className="flex items-center ">
                        <p className="text-sm text-gray-500 w-48">
                          Target Launching
                        </p>
                        <p className="text-sm text-gray-700">20/10/2024</p>
                      </div>
                      <div className="flex items-center">
                        <p className="text-sm text-gray-500 w-48">
                          Kategori Produk
                        </p>
                        <p className="text-sm text-gray-700">
                          Obat Tradisional
                        </p>
                      </div>
                      <div className="flex items-center">
                        <p className="text-sm text-gray-500 w-48">Produsen</p>
                        <p className="text-sm text-gray-700">Royal</p>
                      </div>
                      <div className="flex items-center">
                        <p className="text-sm text-gray-500 w-48">Pendaftar</p>
                        <p className="text-sm text-gray-700">Royal</p>
                      </div>
                      <div className="flex">
                        <p className="text-sm text-gray-500 w-48">
                          Deskripsi Produk
                        </p>
                        <p className="text-sm text-gray-700 w-[400px]">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Phasellus elementum viverra magna, non aliquam
                          augue accumsan eget. Maecenas ac condimentum purus.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-between px-4">
              <div className="py-3 ">
                <h2 className="text-xl font-semibold text-indigo-900 mb-4">
                  Detail Produk
                </h2>
                <div className="space-y-6 mb-8">
                  {isLoading ? (
                    <TextBlockSkeleton />
                  ) : (
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex items-center ">
                        <p className="text-sm text-gray-500 w-48">
                          Usulan Nama Produk 1
                        </p>
                        <p className="text-sm text-gray-700">CurePlus</p>
                      </div>
                      <div className="flex items-center ">
                        <p className="text-sm text-gray-500 w-48">
                          Usulan Nama Produk 2
                        </p>
                        <p className="text-sm text-gray-700">VitaCure</p>
                      </div>
                      <div className="flex items-center">
                        <p className="text-sm text-gray-500 w-48">
                          Usulan Nama Produk 3
                        </p>
                        <p className="text-sm text-gray-700">HealWell</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="py-4 border-b border-gray-200">
              <CustomTable data={dummyData} columns={columns} />
            </div>
            <div className="py-6 ">
              <h2 className="text-xl font-semibold text-indigo-900 ">
                Potensi Produk
              </h2>
            </div>
            {/* {dataOfferPoVendors?.offering_document ? ( */}
            <div className="flex gap-4">
              <div className="block space-y-2">
                <div className="bg-gray-200 p-2 w-[68px] h-[68px] flex items-center justify-center gap-1">
                  <CiImageOn size={18} />
                </div>
                <p> CurePlus</p>
              </div>
              <div className="block space-y-2">
                <div className="bg-gray-200 p-2 w-[68px] h-[68px] flex items-center justify-center gap-1">
                  <CiImageOn size={18} />
                </div>
                <p> VitaCure</p>
              </div>
              <div className="block space-y-2">
                <div className="bg-gray-200 p-2 w-[68px] h-[68px] flex items-center justify-center gap-1">
                  <CiImageOn size={18} />
                </div>
                <p> HealWell</p>
              </div>
            </div>
            <div className="py-8 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-indigo-900 mb-2">
                Kompetitor
              </h2>
              <CustomTable data={dummyData} columns={columnsCompetitor} />
            </div>
            <div className="flex gap-2 py-4">
              {documents.map((_, index) => (
                <div key={index} className="py-4">
                  <h2 className="text-base font-semibold mb-4">
                    Dokumen Referensi
                  </h2>
                  <div className="border border-gray-400 rounded-lg p-2 w-[320px] flex items-center gap-1">
                    <RiFileLine size={18} />
                    document-name.pdf
                  </div>
                </div>
              ))}
            </div>
          </Tabs.TabContent>

          <Tabs.TabContent value="1">
            <div className="mt-10 ">
              {checkUrl ? <div>Log Aktifitas</div> : <ProcessDevelopment />}
            </div>
          </Tabs.TabContent>
        </Tabs>
      </div>
      {/* <ModalUpload
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => setIsOpen(false)}
        title="Upload Bukti Pembayaran"
      /> */}
    </LayoutRightSpace>
  );
};

export default DetailPermintaanRnd;
