import FormAddRisetBahanDanVendor from "components/rmp/R&D/RisetBahanDanVendor/FormAddRisetBahanDanVendor";
import { useSelector } from "react-redux";

function AddBahanDanVendor() {
  const { isEdit } = useSelector((state) => state.rnd);

  return (
    <>
      <div className="p-6 bg-white rounded-lg">
        <div className=" p-2">
          <h1 className="text-2xl font-semibold text-indigo-900 mb-4">
            Tambah Riset Bahan & Vendor
          </h1>
        </div>
        <div className="border-b border-gray-400 my-2"></div>
        <div className="p-4">
          <FormAddRisetBahanDanVendor isEdit={isEdit} />
        </div>
      </div>
    </>
  );
}

export default AddBahanDanVendor;
