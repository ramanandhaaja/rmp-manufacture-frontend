import React, { useEffect } from "react";
import { Upload, Button } from "components/ui";

const Page = () => {
  return (
    <>
      <div className="p-6 bg-white rounded-lg">
        <div className="border-b border-gray-500 mb-4 ">
          <h1 className="text-2xl font-semibold text-indigo-900 mb-4">
            Pra Formulasi - Critical Process Parameter (CPP)
          </h1>
        </div>
        <div className="block space-y-4 pt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Elemen CPP
          </h2>
          <div>
            <p className="mb-2 font-semibold">Dokumentasi CPP</p>
            <Upload buttonText="Unggah" multiple />
            <p className="text-gray-400">
              Format: PNG, JPG, or JPEG maksimal 20 MB
            </p>
          </div>
        </div>
        <div className="flex justify-end py-6 gap-2">
          <Button>Kembali</Button>
          <Button variant="solid">Selanjutnya</Button>
        </div>
      </div>
    </>
  );
};

export default Page;
