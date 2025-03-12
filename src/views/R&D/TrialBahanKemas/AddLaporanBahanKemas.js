import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import LayoutRightSpace from "components/layout/LayoutRightSpace";
import { Upload, Button, Radio, Progress } from "components/ui";
import { FiPlus } from "react-icons/fi";
import Accordion, { AccordionItem } from "components/ui/Accordion/index";
import { RiFileLine } from "react-icons/ri";
import FormAddLaporan from "components/rmp/R&D/TrialBahanKemas/FormAddLaporan";

const DetailBahanKemas = () => {
  const dispatch = useDispatch();
  const [imageFiles, setImageFiles] = useState([]);

  return (
    <div className="p-6 ">
      <div className="flex items-center gap-2 mb-4 px-4 ">
        <h1 className="text-2xl font-semibold text-indigo-900">
          Laporan Trial Bahan Kemas
        </h1>
      </div>

      <LayoutRightSpace>
        <div className="flex">
          {/* Left Section */}
          <div className="w-1/4 p-4 ">
            <h2 className="text-lg font-medium mb-4">Informasi</h2>
            <div className="space-y-4">
              <InfoRow label="Nama Trial" value="Trial 1" />
              <InfoRow label="Tanggal Pelaksanaan" value="10/10/2024" />
              <InfoRow label="Vendor" value="PT. Gunung Sindur" multiline />
              <InfoRow label="Manufaktur" value="PT. Bromo" />
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
            <Accordion className="shadow-none mt-4">
              <AccordionItem
                title="Bahan Kemas 1"
                titleClass="text-lg font-medium"
                bodyClass="space-y-4"
              >
                <div className="py-2">
                  <div className="grid grid-cols-2 gap-4">
                    <p>Bahan Pengemas</p>
                    <p className="text-indigo-900">Bahan Kemas 1</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <p>Supplier</p>
                    <p className="text-indigo-900">Supplier 20</p>
                  </div>
                </div>
                <div>
                  <FormAddLaporan />
                </div>
              </AccordionItem>
            </Accordion>
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
export default DetailBahanKemas;
