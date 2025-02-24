import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ListRequestRnd from "components/rmp/R&D/ListRequestRnd";

const Page = () => {
  const dispatch = useDispatch();

  return (
    <div className="p-6 bg-white rounded-lg">
      <div className="border-b border-gray-500 mb-4">
        <h1 className="text-2xl font-semibold text-indigo-900 mb-4">
          Permintaan Rnd Produk
        </h1>
      </div>
      <div>
        <ListRequestRnd />
      </div>
    </div>
  );
};
export default Page;
