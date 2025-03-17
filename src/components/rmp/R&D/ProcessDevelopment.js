import Accordion, { AccordionItem } from "components/ui/Accordion/index";
import { Button, toast, Notification } from "components/ui";
import { useState, useEffect } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import TableListDropdown from "components/template/TableListDropdown";
import { useNavigate } from "react-router-dom";
import { getRNDStatusClassName } from "utils/helpers";
import CardProgressStatus from "components/custom/CardProgressStatus";
import ModalNoteInput from "components/custom/ModalNoteInput";
import useProcessRnd from "utils/hooks/Rnd/useProcessRnd";
import { TextBlockSkeleton } from "components/shared";
import { useParams } from "react-router-dom";

const ProcessDevelopment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const moderation = {
    step_current: 2,
    step_total: 4,
  };
  const {
    getProcessRnd,
    dataProcessRnd,
    getProcessRndConfirmation,
    dataProcessRndConfirmation,
    postRndProcessConfirmation,
  } = useProcessRnd();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingConfirm, setIsLoadingConfirm] = useState(false);
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const [idProcess, setIdProcess] = useState(null);
  const [confirmation, setConfirmation] = useState("");
  const [isOpenModalAlihkan, setIsOpenModalAlihkan] = useState(false);
  const [isOpenModalTolak, setIsOpenModalTolak] = useState(false);
  const [isOpenModalCatatan, setIsOpenModalCatatan] = useState(false);
  const [isOpenModalConfirm, setIsOpenModalConfirm] = useState(false);

  const renderTitle = () => {
    if (isOpenModalAlihkan) {
      return "Alihkan Proses Konfirmasi";
    } else if (isOpenModalTolak) {
      return "Tolak Permintaan Pengalihan";
    } else if (isOpenModalCatatan) {
      return "Catatan Permintaan Pengalihan";
    } else {
      return "Konfirmasi Proses";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await getProcessRnd();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const fetchDataConfirmation = async () => {
    setIsLoadingConfirm(true);
    try {
      await getProcessRndConfirmation({ rnd_request_id: id });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingConfirm(false);
    }
  };

  useEffect(() => {
    fetchDataConfirmation();
  }, []);

  const findMatchingProcessDetails = (
    dataArray,
    targetId,
    confirmationType
  ) => {
    return dataArray?.some(
      (item) =>
        item.rnd_process_detail_id === targetId &&
        item.confirmation === confirmationType
    );
  };

  const isAlihkan = findMatchingProcessDetails(
    dataProcessRndConfirmation,
    idProcess,
    "Alihkan"
  );

  const isKonfirmasiProses = findMatchingProcessDetails(
    dataProcessRndConfirmation,
    idProcess,
    "Konfirmasi Proses"
  );

  const isTolak = findMatchingProcessDetails(
    dataProcessRndConfirmation,
    idProcess,
    "Tolak Permintaan Pengalihan"
  );

  const handleModalClose = () => {
    setIsOpenModalAlihkan(false);
    setIsOpenModalTolak(false);
    setIsOpenModalCatatan(false);
    setIsOpenModalConfirm(false);
    setConfirmation("");
  };

  const handleSave = async (values) => {
    const payload = {
      rnd_request_id: Number(id),
      rnd_process_detail_id: idProcess,
      confirmation: confirmation,
      note: values.note,
    };

    const response = await postRndProcessConfirmation(payload);
    setIsLoadingSave(true);
    try {
      if (response.status === "success") {
        toast.push(
          <Notification
            type="success"
            title={`${
              confirmation === "Alihkan" ? "Pengalihan" : confirmation
            } telah berhasil dikirim`}
            width={700}
          />,
          {
            placement: "top-center",
          }
        );
        await fetchDataConfirmation();
      } else {
        toast.push(
          <Notification
            type="danger"
            title={`Maaf terjadi kesalahan, gagal ${
              confirmation === "Alihkan" ? "alihkan konfirmasi" : confirmation
            } `}
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
          title={`Maaf terjadi kesalahan, gagal ${
            confirmation === "Alihkan" ? "alihkan konfirmasi" : confirmation
          } `}
          width={700}
        />,
        {
          placement: "top-center",
        }
      );
      console.error("Error submitting rnd confirmation:", error);
    } finally {
      setIsLoadingSave(false);
      handleModalClose(null);
    }
  };

  const ConditionalButton = ({ item, id, dataProcessRndConfirmation }) => {
    const navigate = useNavigate();

    function extractLastWord(str) {
      if (!str) {
        return "Empty or invalid input";
      }

      if (!str.includes("-")) {
        return str;
      }

      return str.split("-").pop();
    }

    const getProcessPath = (item, id) => {
      // Base paths for each category
      const basePaths = {
        "pengembangan-produk": "/research-development/pra-formulasi",
        "trial-formulasi": "/research-development/trial-formulasi",
        "proses-persiapan-master-data": "/research-development/master-data",
        "pilot-scale-batch": "/research-development/pilot-scale",
        "proses-registrasi-dokumen": "/research-development/registration",
      };

      // Special cases handling
      const specialCases = {
        // Pengembangan Produk special case
        5: `${basePaths["pengembangan-produk"]}/technical-feasibility/${id}/process/${item.id}`,

        // Trial Formulasi special cases
        6: `${basePaths["trial-formulasi"]}/riset-bahan-dan-vendor/${id}/process/${item.id}`,
        7: `${basePaths["trial-formulasi"]}/trial-kemas/${id}/process/${item.id}`,
        9: `${basePaths["trial-formulasi"]}/trial-formula/${id}/process/${item.id}`,
        10: `${basePaths["trial-formulasi"]}/formula-produk/${id}/process/${item.id}`,
        11: `${basePaths["trial-formulasi"]}/trial-metode-analisis/${id}/process/${item.id}`,
        12: `${basePaths["trial-formulasi"]}/metode-pemeriksaan/${id}/process/${item.id}`,

        // Proses Persiapan Master Data special case
        13: `${basePaths["proses-persiapan-master-data"]}/penentuan-nama/${id}/process/${item.id}`,
        14: `${basePaths["proses-persiapan-master-data"]}/ceklist-design-kemas/${id}/process/${item.id}`,
        15: `${basePaths["proses-persiapan-master-data"]}/prosedur-produksi/${id}/process/${item.id}`,
        16: `${basePaths["proses-persiapan-master-data"]}/cogm/${id}/process/${item.id}`,

        // Pilot Scale Batch special cases
        17: `${basePaths["pilot-scale-batch"]}/pilot-scale-batch-produk/${id}/process/${item.id}`,
        18: `${basePaths["pilot-scale-batch"]}/validasi-proses/${id}/process/${item.id}`,
        // Registration special cases
        19: `${basePaths["proses-registrasi-dokumen"]}/bpom/${id}/process/${item.id}`,
        20: `${basePaths["proses-registrasi-dokumen"]}/bpjh/${id}/process/${item.id}`,
        21: `${basePaths["proses-registrasi-dokumen"]}/permintaan-desain-kemas/${id}/process/${item.id}`,
        22: `${basePaths["proses-registrasi-dokumen"]}/pengembangan-desain-kemas/${id}/process/${item.id}`,
      };

      // Check if this is a special case
      if (specialCases[item.id]) {
        return specialCases[item.id];
      }

      // Generate slug from item name
      const processSlug = item.name
        .toLowerCase()
        .replace(/[^\w\s-]/g, "") // Remove special characters
        .replace(/\s+/g, "-"); // Replace spaces with hyphens

      // Get the appropriate base path
      const categorySlug = "pengembangan-produk";

      const basePath = basePaths[categorySlug] || "/research-development";

      // Return the standard format path
      return `${basePath}/${extractLastWord(processSlug)}/${id}/process/${
        item.id
      }`;
    };

    const isDisabled = dataProcessRndConfirmation?.some(
      (itemProcess) =>
        itemProcess.rnd_process_detail_id === item.id &&
        itemProcess.confirmation === "Alihkan"
    );

    const handleClick = () => {
      const processPath = getProcessPath(item, id);
      navigate(processPath);
    };

    const shouldRenderButton = dataProcessRndConfirmation?.some(
      (itemProcess) => itemProcess.rnd_process_detail_id === item.id
    );

    if (!shouldRenderButton) {
      return (
        <Button size="sm" onClick={handleClick}>
          Konfirmasi
        </Button>
      );
    }

    return (
      <Button size="sm" disabled={isDisabled} onClick={handleClick}>
        Konfirmasi
      </Button>
    );
  };

  return (
    <div className="space-y-4">
      {dataProcessRnd?.map((data, indexTitle) => (
        <Accordion key={indexTitle} className="border rounded-md">
          <AccordionItem
            title={
              <div>
                <h2 className="text-base font-bold">
                  {indexTitle + 1}. {data.category}
                </h2>
              </div>
            }
          >
            <div className="block">
              <ul>
                {data.details?.map((item, indexDetail) => (
                  <li
                    key={indexDetail}
                    className="flex justify-between text-base py-6 px-4"
                  >
                    <div className="flex items-center gap-4">
                      <p className="font-semibold">
                        {indexTitle + 1}.{indexDetail + 1} {item.name}
                      </p>
                      {dataProcessRndConfirmation?.some(
                        (itemProcess) =>
                          itemProcess.rnd_process_detail_id === item.id &&
                          itemProcess.confirmation === "Alihkan"
                      ) && (
                        <div
                          className={`${getRNDStatusClassName(
                            "Alihkan Konfirmasi"
                          )} w-[140px] px-1 py-1.5 rounded text-sm font-bold text-center`}
                        >
                          Dialihkan
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-4">
                        {dataProcessRndConfirmation.some(
                          (itemProcess) =>
                            itemProcess.rnd_process_detail_id === item.id &&
                            itemProcess.confirmation === "Konfirmasi Proses"
                        ) ? (
                          <div
                            className={`${getRNDStatusClassName(
                              "Konfirmasi Proses"
                            )} w-[140px] px-1 py-1.5 rounded text-sm font-bold text-center`}
                          >
                            Diproses
                          </div>
                        ) : (
                          <div
                            className={`${getRNDStatusClassName(
                              "Butuh Konfirmasi"
                            )} w-[140px] px-1 py-1.5 rounded text-sm font-bold text-center`}
                          >
                            Butuh Konfirmasi
                          </div>
                        )}
                      </div>
                      <ConditionalButton
                        key={item.id}
                        // item={{ ...item, category: "pengembangan-produk" }}
                        item={item}
                        id={id}
                        dataProcessRndConfirmation={dataProcessRndConfirmation}
                      />
                      <button
                        onClick={() => {
                          setIdProcess(item.id);
                        }}
                      >
                        <TableListDropdown
                          dropdownItemList={
                            isLoadingConfirm
                              ? [
                                  {
                                    label: "Loading...",
                                  },
                                ]
                              : [
                                  {
                                    label: "Proses",
                                    onClick: () => {
                                      setIsOpenModalConfirm(true);
                                      setConfirmation("Konfirmasi Proses");
                                    },
                                    border: true,
                                    disabled: isKonfirmasiProses || isAlihkan,
                                  },
                                  {
                                    label: "Alihkan",
                                    onClick: () => {
                                      setIsOpenModalAlihkan(true);
                                      setConfirmation("Alihkan");
                                    },
                                    disabled: isKonfirmasiProses || isAlihkan,
                                  },
                                  {
                                    label: "Tolak Pengalihan",
                                    onClick: () => {
                                      setIsOpenModalTolak(true);
                                      setConfirmation(
                                        "Tolak Permintaan Pengalihan"
                                      );
                                    },
                                    border: true,
                                    disabled: isKonfirmasiProses || isAlihkan,
                                  },
                                  {
                                    label: "Lihat Catatan",
                                    onClick: () => {
                                      setIsOpenModalCatatan(true);
                                    },
                                    disabled: isKonfirmasiProses,
                                  },
                                ]
                          }
                        />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </AccordionItem>
        </Accordion>
      ))}

      <ModalNoteInput
        title={renderTitle()}
        isOpen={
          isOpenModalAlihkan ||
          isOpenModalTolak ||
          isOpenModalCatatan ||
          isOpenModalConfirm
        }
        onClose={handleModalClose}
        onSave={handleSave}
        isLoading={isLoadingSave}
      />
    </div>
  );
};

export default ProcessDevelopment;
