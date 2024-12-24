import React, { useEffect } from "react";
import VendorList from "components/rmp/vendorManagement/VendroList";

const Page = () => {
  return (
    <>
      <div className="px-2 py-3">
        <div className="border-b border-gray-500 mb-4 ">
          <h1 className="text-2xl font-semibold text-indigo-900 mb-4">
            Vendor
          </h1>
        </div>

        <VendorList />
      </div>
    </>
  );
};

export default Page;
