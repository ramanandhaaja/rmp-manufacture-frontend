import Accordion, { AccordionItem } from "components/ui/Accordion/index";
import { Button } from "components/ui";
import { useState, useEffect } from "react";
import { productDevelopmentData } from "./dummyData";
import { HiDotsHorizontal } from "react-icons/hi";
import TableListDropdown from "components/template/TableListDropdown";
import { useNavigate } from "react-router-dom";
import { getRNDStatusClassName } from "utils/helpers";
import CardProgressStatus from "components/custom/CardProgressStatus";
import ModalNoteInput from "components/custom/ModalNoteInput";
import useProcessRnd from "utils/hooks/Rnd/useProcessRnd";
import { TextBlockSkeleton } from "components/shared";

const ProcessDevelopment = () => {
  const navigate = useNavigate();
  const moderation = {
    step_current: 2,
    step_total: 4,
  };
  const [activeModal, setActiveModal] = useState(null);
  const { getProcessRnd, dataProcessRnd } = useProcessRnd();
  const [isLoading, setIsLoading] = useState(false);

  const renderAction = (item) => {
    if (item.status !== "Butuh Konfirmasi") {
      navigate(`/research-development/detail-pengembangan/${item.id}`);
    } else {
      setActiveModal("konfirmasi");
    }
  };

  const renderTitle = () => {
    if (activeModal === "pengalihan") {
      return "Alihkan Proses Konfirmasi";
    } else if (activeModal === "penolakan") {
      return "Tolak Permintaan Pengalihan";
    } else if (activeModal === "catatan") {
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
                    <p className="font-semibold">
                      {indexTitle + 1}.{indexDetail + 1} {item.name}
                    </p>
                    <div className="flex items-center gap-4">
                      <div
                        className={`${getRNDStatusClassName(
                          "Butuh Konfirmasi"
                        )} w-[140px] px-1 py-1.5 rounded text-sm font-bold text-center`}
                      >
                        Butuh Konfirmasi
                      </div>
                      <Button size="sm">Konfirmasi</Button>
                      <div>
                        <TableListDropdown
                          dropdownItemList={[
                            {
                              label: "Proses",
                              onClick: () => {
                                navigate(item.url);
                              },
                              border: true,
                            },
                            {
                              label: "Alihkan",
                              onClick: () => {
                                setActiveModal("pengalihan");
                              },
                            },
                            {
                              label: "Tolak Pengalihan",
                              onClick: () => {
                                setActiveModal("penolakan");
                              },
                              border: true,
                            },
                            {
                              label: "Lihat Catatan",
                              onClick: () => {
                                setActiveModal("catatan");
                              },
                            },
                          ]}
                        />
                      </div>
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
        isOpen={activeModal !== null}
        onClose={() => setActiveModal(null)}
        // isNoteOpsional={activeModal !== "penolakan"}
        // onSave={handleSave}
        // isLoading={isLoadingVerify}
      />
    </div>
  );
};

export default ProcessDevelopment;
