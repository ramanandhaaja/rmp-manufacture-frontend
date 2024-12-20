import ConfirmationCustom from "components/custom/ConfirmationCustom";
import FormVendor from "components/rmp/vendorManagement/FormVendor";
import { Alert, Button } from "components/ui";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useVendor from "utils/hooks/vendorManagement/useVendor";

const AddVendor = () => {
  const formRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const { createVendor } = useVendor();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFormData = async (form) => {
    try {
      setIsLoading(true);
      const response = await createVendor(form);
      console.log(response);
      if (response.status === "success") {
        console.log("success");
        navigate("/vendor-management/");
      } else {
        <Alert
          message="Failed to add vendor"
          type="danger"
          showIcon
          className="mb-4"
        />;
        console.log(response.status);
      }
    } catch (err) {
      <Alert
        message="Failed to add vendor"
        type="danger"
        showIcon
        className="mb-4"
      />;
      console.log(err);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        setIsOpen(false);
      }, 1000);
    }
  };

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  return (
    <>
      <div>
        <div className="flex justify-between p-2">
          <h1 className="text-2xl font-semibold text-indigo-900 mb-4">
            Tambah Vendor
          </h1>
          <Button
            onClick={() => setIsOpen(true)}
            variant="solid"
            className="text-white"
          >
            Kirim
          </Button>
        </div>
        <div className="border-b border-gray-400 my-2"></div>
        <div className="p-4">
          <FormVendor ref={formRef} setFormData={handleFormData} />
        </div>
        <ConfirmationCustom
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          showCancelBtn
          showSubmitBtn
          onConfirm={handleSubmit}
          confirmText="Konfirmasi"
          title="Anda yakin ingin menambahkan vendor ini?"
          titleClass="mt-5 mb-3 text-main-100 text-xl font-bold"
          text="Klik Konfirmasi untuk melanjutkan"
          textClass="text-slate-500 text-base"
          icon={<></>}
          isLoading={isLoading}
          disableCancel={false}
          buttonForm=""
          buttonType="button"
          width={500}
          contentClassName="p-5 rounded-2xl"
        />
      </div>
    </>
  );
};
export default AddVendor;