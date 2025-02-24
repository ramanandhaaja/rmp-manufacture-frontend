import Accordion, { AccordionItem } from "components/ui/Accordion/index";
import { Button } from "components/ui";
import { useState } from "react";
import { productDevelopmentData } from "./dummyData";
import { HiDotsHorizontal } from "react-icons/hi";
import TableListDropdown from "components/template/TableListDropdown";
import { useNavigate } from "react-router-dom";
import { getRNDStatusClassName } from "utils/helpers";
import CardProgressStatus from "components/custom/CardProgressStatus";
import ModalNoteInput from "components/custom/ModalNoteInput";

const ProcessDevelopment = () => {
  const navigate = useNavigate();
  const moderation = {
    step_current: 2,
    step_total: 4,
  };
  const [activeModal, setActiveModal] = useState(null);

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

  return (
    <div className="space-y-4">
      {productDevelopmentData.map((data, index) => (
        <Accordion key={index} className="border rounded-md">
          <AccordionItem
            title={
              <div>
                <h2 className="text-base font-bold">
                  {data.id}. {data.title}
                </h2>
              </div>
            }
          >
            <div className="block">
              <ul>
                {data.items.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between text-base py-6 px-4"
                  >
                    <p className="font-semibold">
                      {item.id} {item.title}
                    </p>
                    <div className="flex items-center gap-4">
                      <div
                        className={`${
                          item.status !== "Proses" &&
                          getRNDStatusClassName(item.status)
                        } w-[140px] px-1 py-1.5 rounded text-sm font-bold text-center`}
                      >
                        {item.status == "Proses" ? (
                          <CardProgressStatus moderation={moderation} />
                        ) : (
                          item.status
                        )}
                      </div>
                      <Button size="sm" onClick={() => renderAction(item)}>
                        {item.status === "Butuh Konfirmasi" && "Konfirmasi"}
                        {(item.status === "Selesai" ||
                          item.status === "Proses") &&
                          "Lihat Detail"}
                      </Button>
                      <div>
                        {item.status === "Butuh Konfirmasi" && (
                          <TableListDropdown
                            dropdownItemList={[
                              {
                                label: "Proses",
                                onClick: () => {
                                  navigate(item.url);
                                },
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
                              },
                              {
                                label: "Lihat Catatan",
                                onClick: () => {
                                  setActiveModal("catatan");
                                },
                              },
                            ]}
                          />
                        )}
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
