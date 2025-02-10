import React from "react";
import { VscWarning } from "react-icons/vsc";

function Page() {
  return (
    <div className="p-6 bg-white rounded-lg">
      <div className="flex flex-1 flex-col min-h-[calc(100vh-211px)] justify-center items-center text-main-100">
        <VscWarning className="h-36 w-36 text-main-100" />
        <p className="text-5xl font-bold">Akses Ditolak.</p>
        <p className="text-2xl font-bold">
          Maaf akun anda tidak dapat mengakses halaman ini
        </p>
      </div>
    </div>
  );
}

export default Page;
