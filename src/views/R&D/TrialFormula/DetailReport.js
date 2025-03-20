import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import LayoutRightSpace from "components/layout/LayoutRightSpace";
import Accordion, { AccordionItem } from "components/ui/Accordion/index";
import { useParams } from "react-router-dom";
import useProcessRnd from "utils/hooks/Rnd/useProcessRnd";
import CustomTable from "components/custom/CustomTable";
import { RiFileLine } from "react-icons/ri";
import { shortenString } from "utils/helpers";

const columnReports = [
  {
    Header: "Kode Bahan",
    accessor: "raw_material",
    Cell: ({ row }) => {
      return row.original.raw_material.raw_material_code;
    },
  },
  {
    Header: "Nama Bahan",
    accessor: "raw_material",
    Cell: ({ row }) => {
      return row.original.raw_material.raw_material_name;
    },
  },

  { Header: "%", accessor: "percentage" },
  { Header: "Satuan Terkecil", accessor: "smallest_unit" },
  { Header: "Bobot", accessor: "weight" },
];

const columnSpek = [
  { Header: "Parameter Mutu", accessor: "quality_parameter" },
  { Header: "Persyaratan", accessor: "condition" },
  { Header: "Hasil", accessor: "result" },
];

const DetailReportTrialFormula = () => {
  const [dataTrialFormulation, setDataTrialFormulation] = useState([]);
  const [dataTrialFormulationReport, setDataTrialFormulationReport] = useState(
    []
  );
  const { getDetailTrialFormulations, getDetailTrialFormulationsReport } =
    useProcessRnd();
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fecthData = async () => {
      const response = await getDetailTrialFormulations(id);
      setDataTrialFormulation(response.data);
    };
    fecthData();
  }, []);

  useEffect(() => {
    const fecthData = async () => {
      const response = await getDetailTrialFormulationsReport(id);

      setDataTrialFormulationReport(response.data);
    };
    if (id) {
      fecthData();
    }
  }, [id]);

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
          <div className="w-3/4 p-4 border-l ">
            <div className="flex flex-col gap-4">
              <div>
                <Accordion className="border rounded">
                  <AccordionItem
                    title="A. Formula"
                    titleClass="text-lg font-medium"
                  >
                    <div>
                      <CustomTable
                        data={dataTrialFormulationReport?.reports}
                        columns={columnReports}
                      />
                    </div>
                  </AccordionItem>
                </Accordion>
              </div>

              <div>
                <Accordion className="border rounded">
                  <AccordionItem
                    title="B. Prosedur"
                    titleClass="text-lg font-medium"
                  >
                    <div>
                      {dataTrialFormulationReport?.procedures?.map((item) => (
                        <div key={item.id}>
                          <p className="text-base text-center text-gray-700">
                            {item.procedure}
                          </p>
                        </div>
                      ))}
                    </div>
                  </AccordionItem>
                </Accordion>
              </div>
              <div>
                <Accordion className="border rounded">
                  <AccordionItem
                    title="C. Spesifikasi"
                    titleClass="text-lg font-medium"
                  >
                    <div>
                      <CustomTable
                        data={dataTrialFormulationReport?.specifications}
                        columns={columnSpek}
                      />
                    </div>
                  </AccordionItem>
                </Accordion>
              </div>
              <div>
                <Accordion className="border rounded">
                  <AccordionItem
                    title="D. Kesimpulan"
                    titleClass="text-lg font-medium"
                  >
                    <div>
                      {dataTrialFormulationReport?.conclusions?.map((item) => (
                        <div key={item.id}>
                          <p className="text-base text-center text-gray-700">
                            {item.conclusion}
                          </p>
                        </div>
                      ))}
                    </div>
                  </AccordionItem>
                </Accordion>
              </div>

              <div>
                <h2 className="text-lg font-medium  ">Lampiran Pendukung</h2>
                <div className="flex gap-2 py-4">
                  {dataTrialFormulationReport?.documents?.length === 0 && (
                    <div className="blockpy-6 ">
                      <p>Belum ada data dokumen</p>
                    </div>
                  )}

                  {dataTrialFormulationReport?.documents?.map((item, index) => (
                    <div key={index} className="py-4">
                      <a
                        href={`${process.env.REACT_APP_BASE_URL}/${item?.file_name}`}
                        target="_blank"
                        rel="noreferrer"
                        className="border border-gray-400 rounded-lg p-2 w-[320px] flex items-center gap-1"
                      >
                        <RiFileLine size={18} />
                        {shortenString(item?.file_name, 30)}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
export default DetailReportTrialFormula;
