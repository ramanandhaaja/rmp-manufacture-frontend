import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import LayoutRightSpace from "components/layout/LayoutRightSpace";
import { Upload, Button, Radio, Progress } from "components/ui";
import { FiPlus } from "react-icons/fi";

const Page = () => {
  const dispatch = useDispatch();
  const [imageFiles, setImageFiles] = useState([]);

  return (
    <div className="p-6 ">
      <div className="flex items-center gap-2 mb-4 px-4 ">
        <h1 className="text-2xl font-semibold text-indigo-900">
          Product RnD Vipalbumin
        </h1>
        <span className="text-gray-500">1/3</span>
      </div>

      <LayoutRightSpace>
        <div className="flex">
          {/* Left Section */}
          <div className="w-1/2 p-4">
            <h2 className="text-lg font-medium mb-4">Informasi</h2>
            <div className="space-y-4">
              <InfoRow label="ID" value="6266754" />
              <InfoRow label="Tipe Pengembangan" value="Produk Baru" />
              <InfoRow label="Target Launching" value="20/05/2024" />
              <InfoRow label="Kategori Produk" value="Obat Tradisional" />
              <InfoRow label="Produsen" value="Royal" />
              <InfoRow label="Pendaftar" value="Royal" />
              <InfoRow
                label="Deskripsi Produk"
                value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus elementum viverra magna, non aliquam augue accumsan eget. Maecenas ac condimentum purus."
                multiline
              />
              <InfoRow label="Diawasi Oleh" value="Badrul Andrianto" />
              <div className="flex justify-end ">
                <Button variant="solid" className="mt-10 mr-4">
                  Periksa Sekarang
                </Button>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-1/2 p-4 border-l">
            <h2 className="text-lg font-medium mb-4">Keterangan Barang</h2>

            <div className="space-y-6">
              <div>
                <p className="mb-2 text-gray-700 ">Keadaan Barang</p>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <Radio
                      type="radio"
                      name="condition"
                      className="mr-2"
                      defaultChecked
                    />
                    Baik
                  </label>
                  <label className="flex items-center">
                    <Radio type="radio" name="condition" className="mr-2" />
                    Kurang Baik
                  </label>
                </div>
              </div>

              <div>
                <p className="mb-2 text-gray-700">Dokumentasi Kegiatan</p>
                <Upload
                  accept=".pdf"
                  multiple={false}
                  uploadLimit={1}
                  draggable={true}
                  className="w-[100px]"
                >
                  <Button variant="plain" size="sm">
                    <FiPlus size={24} color="blue" />
                  </Button>
                </Upload>
                <p className="text-sm">
                  Format: PNG, JPG, or JPEG maksimal 20 MB
                </p>
              </div>

              <div>
                <p className="mb-2 text-gray-700">Catatan Pengecekan</p>
                <textarea
                  className="w-full p-3 border rounded-lg"
                  placeholder="Type Here..."
                  rows="4"
                />
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
export default Page;
