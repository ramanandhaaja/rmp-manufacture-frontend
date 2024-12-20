import { Button, Alert } from "components/ui";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useVendor from "utils/hooks/vendorManagement/useVendor";
import { useParams } from "react-router-dom";
import FormVendor from "components/rmp/vendorManagement/FormVendor";
import ConfirmationCustom from "components/custom/ConfirmationCustom";

const EditVendor = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const formRef = useRef();
  const navigate = useNavigate();
  const { updateVendor } = useVendor();
  const { id } = useParams();
  const { dataDetailVendor, getVendorDetail } = useVendor();

  useEffect(() => {
    if (id) {
      setIsLoadingList(true);
      getVendorDetail(id).finally(() => setIsLoadingList(false));
    }
  }, [id]);

  const handleFormData = async (form) => {
    try {
      setIsLoading(true);
      const response = await updateVendor(id, form);
      console.log(response);
      if (response.status === "success") {
        console.log("success");
        navigate("/vendor-management/");
      } else {
        <Alert
          message="Failed to edit vendor"
          type="danger"
          showIcon
          className="mb-4"
        />;
        console.log(response.status);
      }
    } catch (err) {
      console.log(err);
      <Alert
        message="Failed to edit vendor"
        type="danger"
        showIcon
        className="mb-4"
      />;
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
    <div>
      <div className="flex justify-between p-2">
        <h1 className="text-2xl font-semibold text-indigo-900 mb-4">
          Edit Vendor
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
        <FormVendor
          ref={formRef}
          initialData={dataDetailVendor}
          isEdit={true}
          setFormData={handleFormData}
        />
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
        isLoading={isLoading}
        disableCancel={false}
        buttonForm=""
        buttonType="button"
        width={500}
        contentClassName="p-5 rounded-2xl"
      />
    </div>
  );
};

export default EditVendor;
