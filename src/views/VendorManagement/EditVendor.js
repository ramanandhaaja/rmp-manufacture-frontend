import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useVendor from "utils/hooks/vendorManagement/useVendor";
import { useParams } from "react-router-dom";
import FormVendor from "components/rmp/vendorManagement/FormVendor";
import ConfirmationCustom from "components/custom/ConfirmationCustom";
import { Notification, toast, Button } from "components/ui";

const EditVendor = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const formRef = useRef();
  const navigate = useNavigate();
  const { id } = useParams();
  const { dataDetailVendor, getVendorDetail, updateVendor } = useVendor();

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
      if (response.status === "success") {
        toast.push(
          <Notification
            type="success"
            title="Vendor berhasil diubah"
            width={700}
          />,
          {
            placement: "top-center",
          }
        );
        setTimeout(() => {
          navigate("/vendor-management/");
        }, 1000);
      } else {
        toast.push(
          <Notification
            type="danger"
            title="Maaf terjadi kesalahan, Vendor gagal diubah"
            width={700}
          />,
          {
            placement: "top-center",
          }
        );
        console.log(response.status);
      }
    } catch (err) {
      toast.push(
        <Notification
          type="danger"
          title="Maaf terjadi kesalahan,Vendor gagal diubah"
          width={700}
        />,
        {
          placement: "top-center",
        }
      );
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
        title="Anda yakin ingin mengubah vendor ini?"
        titleClass="mt-5 mb-3 text-main-100 text-xl font-bold"
        text="Klik Konfirmasi untuk melanjutkan"
        textClass="text-slate-500 text-base"
        isLoading={isLoading}
        disableCancel={false}
        buttonType="button"
        width={500}
        contentClassName="p-5 rounded-2xl"
      />
    </div>
  );
};

export default EditVendor;
