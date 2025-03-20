import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import LayoutRightSpace from "components/layout/LayoutRightSpace";
import Accordion, { AccordionItem } from "components/ui/Accordion/index";
import FormAddReportTrialFormula from "components/rmp/R&D/TrialFormula/FormAddReport";
import { useParams, useLocation } from "react-router-dom";
import useProcessRnd from "utils/hooks/Rnd/useProcessRnd";

const ReportTrialFormula = () => {
  const [dataTrialFormulation, setDataTrialFormulation] = useState([]);
  const { getDetailTrialFormulations } = useProcessRnd();
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const isEdit = location.pathname.includes("edit");

  useEffect(() => {
    const fecthData = async () => {
      const response = await getDetailTrialFormulations(id);
      setDataTrialFormulation(response.data);
      console.log(response);
    };
    fecthData();
  }, []);

  return (
    <div className="p-6 ">
      <div className="flex items-center gap-2 mb-4 px-4 ">
        <h1 className="text-2xl font-semibold text-indigo-900">
          Laporan Trial Formula
        </h1>
      </div>

      <LayoutRightSpace>
        <div className="flex">
          {/* Left Section */}
          <div className="w-1/4 p-4 ">
            <h2 className="text-lg font-medium mb-4">Informasi</h2>
            <div className="space-y-4">
              <InfoRow label="Nama Trial" value={dataTrialFormulation?.name} />
              <InfoRow
                label="Tanggal Pelaksanaan"
                value={dataTrialFormulation?.trial_date}
              />
            </div>

            <Accordion className="shadow-none mt-4">
              <AccordionItem title="Prosedur" titleClass="text-lg font-medium">
                <div>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Phasellus elementum viverra magna, non aliquam augue accumsan
                  eget. Maecenas ac condimentum purus.
                </div>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Right Section */}
          <div className="w-3/4 p-4 border-l">
            <FormAddReportTrialFormula
              dataTrial={dataTrialFormulation}
              isEdit={isEdit}
            />
          </div>
        </div>
      </LayoutRightSpace>
    </div>
  );
};

const InfoRow = ({ label, value, multiline = false }) => {
  return (
    <div className="flex gap-14">
      <span className="text-sm text-gray-500 w-32">{label}</span>
      <span className={`text-sm text-indigo-900 ${multiline ? "flex-1" : ""}`}>
        {value}
      </span>
    </div>
  );
};
export default ReportTrialFormula;
