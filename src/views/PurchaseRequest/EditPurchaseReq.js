import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import usePurchaseReq from "utils/hooks/PurchaseRequest/usePurchaseRequest";
import { useParams } from "react-router-dom";
import FormPurchaseReq from "components/rmp/PurchaseRequest/FormPurchaseReq";
import ConfirmationCustom from "components/custom/ConfirmationCustom";
import { Notification, toast, Button } from "components/ui";

const EditPurchaseReq = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef();
  const navigate = useNavigate();
  const { updatePurchaseReq, dataDetailPurchase, getDetailPurchaseReq } =
    usePurchaseReq();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getDetailPurchaseReq(id);
    }
  }, [id]);

  const handleFormData = async (form) => {
    console.log(form);
    try {
      setIsLoading(true);
      const response = await updatePurchaseReq(id, form);
      if (response.status === "success") {
        console.log("success");
        toast.push(
          <Notification
            type="success"
            title="Permintaan pembelian berhasil diubah"
          />,
          {
            placement: "top-center",
          }
        );
        setTimeout(() => {
          window.history.back();
        }, 1000);
      } else {
        toast.push(
          <Notification
            type="danger"
            title="Maaf terjadi kesalahan, Permintaan pembelian gagal diubah"
          />,
          {
            placement: "top-center",
          }
        );
        console.log(response.status);
      }
    } catch (err) {
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
    <div className="p-6 bg-white rounded-lg">
      <div className="flex justify-between p-2">
        <h1 className="text-2xl font-semibold text-indigo-900 mb-4">
          Edit Permintaan Pembelian
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
        <FormPurchaseReq
          ref={formRef}
          setFormData={handleFormData}
          initialData={dataDetailPurchase}
          isEdit={true}
        />
      </div>
      <ConfirmationCustom
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        showCancelBtn
        showSubmitBtn
        onConfirm={handleSubmit}
        confirmText="Konfirmasi"
        title="Anda yakin ingin mengubah pembelian ini?"
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

export default EditPurchaseReq;
