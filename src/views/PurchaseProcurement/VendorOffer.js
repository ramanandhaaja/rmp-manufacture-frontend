import ConfirmationCustom from "components/custom/ConfirmationCustom";
import { Notification, toast, Button } from "components/ui";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useVendor from "utils/hooks/vendorManagement/useVendor";
import FormVendorOffer from "components/rmp/PurchaseProcurement/FormVendorOffer";

const VendorOffer = () => {
  const formRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const { createVendor } = useVendor();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div>
        <div className=" p-2">
          <h1 className="text-2xl font-semibold text-indigo-900 mb-4">
            Penawaran Vendor
          </h1>
        </div>
        <div className="border-b border-gray-400 my-2"></div>
        <div className="p-4">
          <FormVendorOffer />
        </div>
      </div>
    </>
  );
};
export default VendorOffer;
