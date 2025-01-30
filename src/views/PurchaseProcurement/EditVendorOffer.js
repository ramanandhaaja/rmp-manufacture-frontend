import FormVendorOffer from "components/rmp/PurchaseProcurement/FormVendorOffer";

const EditVendorOffer = () => {
  return (
    <>
      <div className="p-6 bg-white rounded-lg">
        <div className=" p-2">
          <h1 className="text-2xl font-semibold text-indigo-900 mb-4">
            Penawaran Vendor
          </h1>
        </div>
        <div className="border-b border-gray-400 my-2"></div>
        <div className="p-4">
          <FormVendorOffer isEdit={true} />
        </div>
      </div>
    </>
  );
};
export default EditVendorOffer;
