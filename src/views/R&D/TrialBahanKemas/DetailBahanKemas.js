import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import LayoutRightSpace from "components/layout/LayoutRightSpace";
import { Upload, Button, Radio, Progress } from "components/ui";
import { FiPlus } from "react-icons/fi";
import Accordion, { AccordionItem } from "components/ui/Accordion/index";
import { RiFileLine } from "react-icons/ri";

const DetailBahanKemas = () => {
  const dispatch = useDispatch();
  const [imageFiles, setImageFiles] = useState([]);

  return (
    <div className="p-6 ">
      <div className="flex items-center gap-2 mb-4 px-4 ">
        <h1 className="text-2xl font-semibold text-indigo-900">
          Penetapan Bahan Kemas
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
              >
                <div className="block space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <p>Bahan Pengemas</p>
                    <p className="text-indigo-900">Bahan Kemas 1</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <p>Supplier</p>
                    <p className="text-indigo-900">Supplier 20</p>
                  </div>
                </div>
                <div className="block space-y-2">
                  <h3 className="text-lg font-medium pt-4">Trial</h3>
                  <div className="grid grid-cols-4 gap-[-100px]">
                    <div>Tanggal Mulai</div>
                    <div className="text-indigo-900">10/10/2024</div>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div>Komposisi</div>
                    <div className="text-indigo-900">Gelatine</div>
                    <div>Ukuran</div>
                    <div className="text-indigo-900">5 mm</div>
                  </div>
                </div>
                <div className="block space-y-2">
                  <h3 className="text-lg font-medium pt-4">
                    Bulk atau Produk yang digunakan
                  </h3>
                  <div className="grid grid-cols-4 gap-4">
                    <div>Bentuk</div>
                    <div className="text-indigo-900">Bulat</div>
                    <div>Ukuran</div>
                    <div className="text-indigo-900">5 mm</div>
                  </div>
                </div>
                <div className="block space-y-2">
                  <h3 className="text-lg font-medium pt-4">Mesin</h3>
                  <div className="grid grid-cols-4 gap-4">
                    <div>Nama Mesin</div>
                    <div className="text-indigo-900">Mesin 1</div>
                    <div>Change Part</div>
                    <div className="text-indigo-900">Part A, B, F</div>
                  </div>
                  <div className="grid grid-cols-4">
                    <div>Setting Mesin</div>
                    <div className="text-indigo-900 col-span-2">
                      MIn a laoreet purus. Integer turpis quam, laoreet id orci
                      nec, ultrices lacinia nunc. Aliquam erat vo
                    </div>
                  </div>
                </div>
                <div className="block space-y-2">
                  <h3 className="text-lg font-medium pt-4">
                    Dokumen Pendukung
                  </h3>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    className="border border-gray-400 rounded-lg p-2 w-[320px] flex items-center gap-1"
                  >
                    <RiFileLine size={18} />
                    nama-dokumen.pdf{" "}
                  </a>
                </div>
                <div className="block space-y-2">
                  <h3 className="text-lg font-medium pt-4">Proses Primer</h3>
                  <div className="grid grid-cols-4 gap-4">
                    <div>Proses </div>
                    <div className="text-indigo-900">Forming</div>
                    <div>Kelancaran Proses</div>
                    <div className="text-indigo-900">Lancar</div>
                  </div>

                  <div className="grid grid-cols-4">
                    <div>Keterangan</div>
                    <div className="text-indigo-900 col-span-2">
                      Aliquam pulvinar vestibulum blandit. Donec sed nisl
                      libero. Fusce dignissim luctus sem eu dapibus. P
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div>Proses </div>
                    <div className="text-indigo-900">Cutting</div>
                    <div>Kelancaran Proses</div>
                    <div className="text-indigo-900">Lancar</div>
                  </div>
                  <div className="grid grid-cols-4">
                    <div>Keterangan</div>
                    <div className="text-indigo-900 col-span-2">
                      Aliquam pulvinar vestibulum blandit. Donec sed nisl
                      libero. Fusce dignissim luctus sem eu dapibus. P
                    </div>
                  </div>
                </div>
                <div className="block space-y-2">
                  <h3 className="text-lg font-medium pt-4">Proses Sekunder</h3>
                  <div className="grid grid-cols-4 gap-4">
                    <div>Proses </div>
                    <div className="text-indigo-900">Forming</div>
                    <div>Kelancaran Proses</div>
                    <div className="text-indigo-900">Lancar</div>
                  </div>

                  <div className="grid grid-cols-4">
                    <div>Keterangan</div>
                    <div className="text-indigo-900 col-span-2">
                      Aliquam pulvinar vestibulum blandit. Donec sed nisl
                      libero. Fusce dignissim luctus sem eu dapibus. P
                    </div>
                  </div>
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
