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

  const findMatchingProcessDetails = (dataArray, targetId) => {
    return dataArray?.some(
      (item) =>
        item.rnd_process_detail_id === targetId &&
        item.confirmation === "Alihkan"
    );
  };

  const isAlihkan = findMatchingProcessDetails(
    dataProcessRndConfirmation,
    idProcess
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

    const extractLastWord = (str) => {
      const words = str.trim().split(/\s+/);
      return (words[words.length - 1] || "").toLowerCase();
    };

    const isDisabled = dataProcessRndConfirmation?.some(
      (itemProcess) =>
        itemProcess.rnd_process_detail_id === item.id &&
        itemProcess.confirmation === "Alihkan"
    );

    const handleClick = () => {
      const basePath = "/research-development/pra-formulasi";
      const processPath =
        item.id === 5
          ? `${basePath}/technical-feasibility/${id}/process/${item.id}`
          : `${basePath}/${extractLastWord(item.name)}/${id}/process/${
              item.id
            }`;

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
                      <div
                        className={`${getRNDStatusClassName(
                          "Butuh Konfirmasi"
                        )} w-[140px] px-1 py-1.5 rounded text-sm font-bold text-center`}
                      >
                        Butuh Konfirmasi
                      </div>
                      <ConditionalButton
                        key={item.id}
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
                                  },
                                  {
                                    label: "Alihkan",
                                    onClick: () => {
                                      setIsOpenModalAlihkan(true);
                                      setConfirmation("Alihkan");
                                    },
                                    disabled: isAlihkan,
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
                                    disabled: true,
                                  },
                                  {
                                    label: "Lihat Catatan",
                                    onClick: () => {
                                      setIsOpenModalCatatan(true);
                                    },
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
