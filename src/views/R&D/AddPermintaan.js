import LayoutRightSpace from "components/layout/LayoutRightSpace";
import usePurchaseOrder from "utils/hooks/PurchaseOrder/usePurchaseOrder";
import { useParams } from "react-router-dom";
import { FiPlus, FiTrash } from "react-icons/fi";
import { useEffect, useState, useRef } from "react";
import TextBlockSkeleton from "components/shared/loaders/TextBlockSkeleton";
import { Notification, toast, Button } from "components/ui";

import Tabs from "components/ui/Tabs";
import { MdNavigateNext } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import FormAddKompetitor from "components/rmp/R&D/FormAddKompetitor";
import FormDetailPermintaan from "components/rmp/R&D/FormDetailPermintaan";
import FormAddDetailProduk from "components/rmp/R&D/FormAddDetailProduk";
import FormDokumenReferensi from "components/rmp/R&D/FormDokumenReferensi";
import useCreateRndReq from "utils/hooks/Rnd/useCreateRndReq";
import { useSelector } from "react-redux";
import ConfirmationCustom from "components/custom/ConfirmationCustom";

const DetailPermintaanRnd = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const {
    createRndRequest,
    dataDetailRndRequest,
    createRndDetailProduct,
    createRndDocReference,
  } = useCreateRndReq();
  const [activeTab, setActiveTab] = useState("0");
  const { rndRequestId } = useSelector((state) => state.rnd);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [stepStatus, setStepStatus] = useState({
    detailPermintaan: "pending",
    kompetitor: "pending",
    detailProduk: "pending",
    dokumenReferensi: "pending",
  });
  // Create refs for each form
  const formRefs = {
    0: useRef(null),
    1: useRef(null),
    2: useRef(null),
    3: useRef(null),
  };

  const getStepName = (step) => {
    const stepNames = {
      detailPermintaan: "Detail Permintaan",
      kompetitor: "Data Kompetitor",
      detailProduk: "Detail Produk",
      dokumenReferensi: "Dokumen Referensi",
    };
    return stepNames[step] || step;
  };

  const handleStepSubmit = async (values, step) => {
    try {
      setIsLoading(true);

      switch (step) {
        case "detailPermintaan":
          try {
            const response = await createRndRequest(values);

            // Handle success specific to detailPermintaan
            if (response.status === "success") {
              toast.push(
                <Notification
                  type="success"
                  title="Detail permintaan berhasil disimpan"
                  width={700}
                />,
                { placement: "top-center" }
              );

              setStepStatus((prev) => ({
                ...prev,
                [step]: "completed",
              }));

              // Step-specific navigation
              setTimeout(() => {
                setActiveTab(String(Number(activeTab) + 1));
              }, 2000);
            } else if (response.status === "failed") {
              toast.push(
                <Notification
                  type="danger"
                  title="Detail permintaan gagal disimpan. Pastikan data terisi dengan benar"
                  width={700}
                />,
                { placement: "top-center" }
              );
            } else if (response.status === "network error") {
              toast.push(
                <Notification
                  type="danger"
                  title="Maaf terdapat masalah jaringan pada detail permintaan"
                  width={700}
                />,
                { placement: "top-center" }
              );
            }
          } catch (error) {
            console.error("Error in detailPermintaan:", error);
            throw error; // Re-throw to be caught by the outer try-catch
          }
          break;

        case "detailProduk":
          try {
            const payload = {
              rnd_request_id: rndRequestId,
              manufacturer:
                values.manufacturer == "Lainnya"
                  ? values.manufacturerLainnya
                  : values.manufacturer,
              registrant:
                values.registrant == "Lainnya"
                  ? values.registrantLainnya
                  : values.registrant,
              name: values.name,
            };
            const response = await createRndDetailProduct(payload);
            if (response.status === "success") {
              toast.push(
                <Notification
                  type="success"
                  title="Detail produk berhasil disimpan"
                  width={700}
                />,
                { placement: "top-center" }
              );

              setStepStatus((prev) => ({
                ...prev,
                [step]: "completed",
              }));

              // Step-specific navigation
              setTimeout(() => {
                setActiveTab(String(Number(activeTab) + 1));
              }, 2000);
            } else {
              toast.push(
                <Notification
                  type="danger"
                  title="Detail produk gagal disimpan. Pastikan data terisi dengan benar"
                  width={700}
                />,
                { placement: "top-center" }
              );
            }
          } catch (error) {
            console.error("Error in detailProduk:", error);
            throw error; // Re-throw to be caught by the outer try-catch
          }
          break;

        case "dokumenReferensi":
          try {
            const formData = new FormData();

            if (Array.isArray(values.documents)) {
              values.documents.forEach((doc, index) => {
                // For each document, append both the file and its name
                formData.append(`rnd_request_id`, rndRequestId);
                formData.append(`file`, doc.file);
                formData.append(`name`, doc.documentName);
              });
            }

            const response = await createRndDocReference(formData);
            if (response.status === "success") {
              toast.push(
                <Notification
                  type="success"
                  title="Permintaan R&D berhasil Diajukan"
                  width={700}
                />,
                { placement: "top-center" }
              );
              setTimeout(() => {
                navigate("/purchase/product-r&d");
              }, 2000);
            } else {
              toast.push(
                <Notification
                  type="danger"
                  title="Maaf terjadi kesalahan, gagal menyimpan dokumen referensi"
                  width={700}
                />,
                { placement: "top-center" }
              );
            }
          } catch (error) {
            console.error("Error in dokumenReferensi:", error);
            throw error;
          }
          break;
      }
    } catch (error) {
      console.error(`Error in handleStepSubmit:`, error);
      toast.push(
        <Notification
          type="danger"
          title={`Terjadi kesalahan sistem: ${error.message}`}
          width={700}
        />,
        { placement: "top-center" }
      );
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  const handleNextClick = () => {
    if (activeTab == 1) {
      setActiveTab(String(Number(activeTab) + 1));
    }
    if (activeTab == 3) {
      setIsOpenModal(true);
      return;
    }
    const currentFormRef = formRefs[activeTab]?.current;
    if (currentFormRef?.submitForm) {
      currentFormRef.submitForm();
    }
  };

  const handleConfirmSubmission = () => {
    const docReferenceFormRef = formRefs["3"]?.current;

    // If the form ref exists, submit it
    if (docReferenceFormRef?.submitForm) {
      docReferenceFormRef.submitForm();
      setIsOpenModal(false);
    } else {
      // Handle the case where form ref doesn't exist
      console.error("Document reference form ref not found");
      toast.push(
        <Notification
          type="danger"
          title="Tidak dapat mengajukan permintaan. Silakan coba lagi."
          width={700}
        />,
        { placement: "top-center" }
      );
    }
  };

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  return (
    <LayoutRightSpace>
      <div className=" px-4">
        <h1 className="text-2xl font-semibold text-indigo-900 mb-4 ">
          Buat Permintaan Produk RnD
        </h1>
        <div className="border-b border-gray-300 "></div>

        <Tabs value={activeTab} onChange={handleTabChange} variant="underline">
          <>
            <Tabs.TabList className="border-b border-gray-300 pt-2">
              <Tabs.TabNav value={"0"} className="flex-col">
                <div className="flex items-center">
                  <div className=" flex flex-col">
                    <span className="text-base ">Step 1</span>
                    <span className="text-sm text-gray-500 ">
                      Detail Permintaan
                    </span>
                  </div>
                  <div className="ml-2">
                    <MdNavigateNext size={24} />
                  </div>
                </div>
              </Tabs.TabNav>
              <Tabs.TabNav value={"1"} className="flex-col">
                <div className="flex items-center">
                  <div className=" flex flex-col">
                    <span className="text-base ">Step 2</span>
                    <span className="text-sm text-gray-500 ">Kompetitor</span>
                  </div>
                  <div className="ml-2">
                    <MdNavigateNext size={24} />
                  </div>
                </div>
              </Tabs.TabNav>
              <Tabs.TabNav value={"2"} className="flex-col">
                <div className="flex items-center">
                  <div className=" flex flex-col">
                    <span className="text-base ">Step 3</span>
                    <span className="text-sm text-gray-500 ">
                      Detail Produk
                    </span>
                  </div>
                  <div className="ml-2">
                    <MdNavigateNext size={24} />
                  </div>
                </div>
              </Tabs.TabNav>
              <Tabs.TabNav value={"3"} className="flex-col">
                <div className="flex items-center">
                  <div className=" flex flex-col">
                    <span className="text-base ">Step 4</span>
                    <span className="text-sm text-gray-500 ">
                      Dokumen Referensi
                    </span>
                  </div>
                </div>
              </Tabs.TabNav>
            </Tabs.TabList>
          </>
          {/* LANGKAH 1 //////////////////*/}
          <div className="space-y-6">
            <Tabs.TabContent value={"0"}>
              <FormDetailPermintaan
                ref={formRefs["0"]}
                onSubmit={(values) =>
                  handleStepSubmit(values, "detailPermintaan")
                }
                isLoading={isLoading}
              />
            </Tabs.TabContent>
            {/* LANGKAH 2 ///////////////////////////////*/}
            <Tabs.TabContent value={"1"}>
              <div className="mt-10">
                <FormAddKompetitor />
              </div>
            </Tabs.TabContent>
            {/* LANGKAH 3 //////////////////////////////*/}
            <Tabs.TabContent value={"2"}>
              <FormAddDetailProduk
                ref={formRefs["2"]}
                onSubmit={(values) => handleStepSubmit(values, "detailProduk")}
                isLoading={isLoading}
              />
            </Tabs.TabContent>
            {/* LANGKAH 4 //////////////////*/}
            <Tabs.TabContent value={"3"}>
              <FormDokumenReferensi
                ref={formRefs["3"]}
                onSubmit={(values) =>
                  handleStepSubmit(values, "dokumenReferensi")
                }
                isLoading={isLoading}
              />
            </Tabs.TabContent>
          </div>
        </Tabs>
        <div className="flex justify-end gap-2 py-4">
          <Button
            disabled={activeTab == 0}
            onClick={() => setActiveTab(String(Number(activeTab) - 1))}
          >
            Sebelumnya
          </Button>
          <Button
            loading={isLoading}
            variant="solid"
            onClick={handleNextClick}
            // onClick={handleSubmit}
          >
            {activeTab == 3 ? "Ajukan" : "Selanjutnya"}
          </Button>
        </div>
      </div>
      <ConfirmationCustom
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        showCancelBtn
        showSubmitBtn
        onConfirm={handleConfirmSubmission}
        confirmText="Konfirmasi"
        title={`Anda yakin ingin membuat Permintaan RnD ${dataDetailRndRequest?.title}?`}
        titleClass="mt-5 mb-3 text-main-100 text-xl font-bold"
        text="Klik Konfirmasi untuk melanjutkan"
        textClass="text-slate-500 text-base"
        isLoading={isLoading}
        disableCancel={false}
        buttonType="button"
        width={500}
        contentClassName="p-5 rounded-2xl"
      />
    </LayoutRightSpace>
  );
};

export default DetailPermintaanRnd;
