import LayoutRightSpace from "components/layout/LayoutRightSpace";
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
import { NoDataSvg } from "assets/svg";
import ProcessDevelopment from "components/rmp/R&D/ProcessDevelopment";
import { useLocation } from "react-router-dom";
import useCreateRndReq from "utils/hooks/Rnd/useCreateRndReq";
import { formatDate } from "utils/helpers";
import deepParseJson from "utils/deepParseJson";

const DetailPermintaanRnd = () => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);
  const [isLoadingCompetitor, setIsLoadingCompetitor] = useState(false);
  const [isLoadingSubstance, setIsLoadingSubstance] = useState(false);

  const {
    getDetailRndRequest,
    getRndProductDetails,
    dataDetailRndRequest,
    dataDetailProduct,
    getCompetitorRndRequest,
    getRndProductSubstances,
    filterCompetitorById,
    dataKompetitor,
    dataRndProductSubstances,
  } = useCreateRndReq();
  const [activeTab, setActiveTab] = useState("0");
  const location = useLocation();
  const checkUrl = location.pathname.includes("product-r&d");
  const productNames = deepParseJson(dataDetailProduct?.name);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setIsLoadingDetail(true);
        await getDetailRndRequest(id);
        setIsLoadingDetail(false);
      } catch (error) {
        console.log(error);
        setIsLoadingDetail(false);
      }
    };
    if (id) fetchDetail();
  }, [id]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoadingProduct(true);
        const resp = await getRndProductDetails({ rnd_request_id: id });
        console.log(resp);
        setIsLoadingProduct(false);
      } catch (error) {
        console.log(error);
        setIsLoadingProduct(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchSubstance = async () => {
      try {
        setIsLoadingSubstance(true);
        const resp = await getRndProductSubstances({ rnd_request_id: id });
        console.log(resp);
        setIsLoadingSubstance(false);
      } catch (error) {
        console.log(error);
        setIsLoadingProduct(false);
      }
    };
    if (id) fetchSubstance();
  }, [id]);

  useEffect(() => {
    const fetchCompetitor = async () => {
      try {
        setIsLoadingCompetitor(true);
        await getCompetitorRndRequest(Number(id));
        setIsLoadingCompetitor(false);
      } catch (error) {
        console.log(error);
        setIsLoadingCompetitor(false);
      }
    };
    if (id) fetchCompetitor();
  }, [id]);

  const documents = Array(3).fill(null);

  console.log(dataRndProductSubstances);

  const columns = [
    {
      Header: "Zat Aktif",
      accessor: "active_substance",
    },
    {
      Header: "Kekuatan",
      accessor: "strength",
    },
    {
      Header: "Brand",
      accessor: "brand",
    },
    {
      Header: "Bentuk Sediaan",
      accessor: "form",
    },
    {
      Header: "Kemasan",
      accessor: "packaging",
    },
    {
      Header: "Dosis",
      accessor: "dose",
    },
    {
      Header: "Target HNA",
      accessor: "hna_target",
    },
  ];

  const columnsCompetitor = [
    {
      Header: "Nama",
      accessor: "name",
    },
    {
      Header: "Zat Aktif",
      accessor: "active_ingredient",
      Cell: ({ value }) => <span className="capitalize">-</span>,
    },
    {
      Header: "Kekuatan",
      accessor: "strength",
    },

    {
      Header: "Bentuk Sediaan",
      accessor: "form",
    },
    {
      Header: "Kemasan",
      accessor: "packaging",
    },
    {
      Header: "Dosis",
      accessor: "dose",
    },
    {
      Header: "HNA",
      accessor: "hna_target",
    },
  ];

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  const renderTabList = () => {
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
          Detail {dataDetailRndRequest?.title}
        </h1>
        <div className="border-b border-gray-300 "></div>

        <Tabs value={activeTab} onChange={handleTabChange} variant="underline">
          {renderTabList()}
          <Tabs.TabContent value={"0"}>
            <div className="flex justify-between mt-6 px-4">
              <div className="py-3 ">
                <div className="space-y-6 mb-4">
                  {isLoadingDetail ? (
                    <TextBlockSkeleton />
                  ) : (
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex items-">
                        <p className="text-sm text-gray-500 w-48">Id</p>
                        <p className="text-sm text-gray-700">
                          {dataDetailRndRequest?.id}
                        </p>
                      </div>
                      <div className="flex items-center ">
                        <p className="text-sm text-gray-500 w-48">
                          Tipe Pengembangan
                        </p>
                        <p className="text-sm text-gray-700">
                          {dataDetailRndRequest?.development_type}
                        </p>
                      </div>
                      <div className="flex items-center ">
                        <p className="text-sm text-gray-500 w-48">
                          Target Launching
                        </p>
                        <p className="text-sm text-gray-700">
                          {formatDate(dataDetailRndRequest?.launching_date)}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <p className="text-sm text-gray-500 w-48">
                          Kategori Produk
                        </p>
                        <p className="text-sm text-gray-700">
                          {dataDetailRndRequest?.category}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <p className="text-sm text-gray-500 w-48">Produsen</p>
                        <p className="text-sm text-gray-700">
                          {dataDetailProduct?.manufacturer}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <p className="text-sm text-gray-500 w-48">Pendaftar</p>
                        <p className="text-sm text-gray-700">
                          {dataDetailProduct?.registrant}
                        </p>
                      </div>
                      <div className="flex">
                        <p className="text-sm text-gray-500 w-48">
                          Deskripsi Produk
                        </p>
                        <p className="text-sm text-gray-700 w-[400px]">
                          {dataDetailRndRequest?.description}
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
                  {isLoadingProduct ? (
                    <TextBlockSkeleton />
                  ) : (
                    <div className="grid grid-cols-1 gap-2">
                      {dataDetailProduct === null && <p>Belum ada data</p>}
                      {productNames?.map((name, index) => (
                        <div key={index} className="flex items-center">
                          <p className="text-sm text-gray-500 w-48">
                            Usulan Nama Produk {index + 1}
                          </p>
                          <p className="text-sm text-gray-700">{name}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="py-4 border-b border-gray-200">
              <CustomTable
                data={dataRndProductSubstances}
                columns={columns}
                isLoading={isLoadingSubstance}
              />
            </div>
            <div className="py-6 ">
              <h2 className="text-xl font-semibold text-indigo-900 ">
                Potensi Produk
              </h2>
            </div>
            {/* {dataOfferPoVendors?.offering_document ? ( */}
            <div className="flex gap-4">
              {dataDetailProduct === null && <p>Belum ada data</p>}
              {productNames?.map((name, index) => (
                <div key={index} className="block space-y-2 px-4">
                  <div className="bg-gray-200 p-2 w-[68px] h-[68px] flex items-center justify-center gap-1">
                    <CiImageOn size={18} />
                  </div>
                  <p> {name}</p>
                </div>
              ))}
            </div>
            <div className="py-8 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-indigo-900 mb-2">
                Kompetitor
              </h2>
              <CustomTable
                data={dataKompetitor}
                columns={columnsCompetitor}
                isLoading={isLoadingCompetitor}
              />
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
