import PurchaseRequestList from "components/rmp/PurchaseRequest/PurchaseRequestList";
import usePurchaseReq from "utils/hooks/PurchaseRequest/usePurchaseRequest";
import useGoodsCategory from "utils/hooks/useGoodsCategory";
import useMasterGoods from "utils/hooks/useMasterGoods";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import FormPurchaseReq from "components/rmp/PurchaseRequest/FormPurchaseReq";
import ConfirmationCustom from "components/custom/ConfirmationCustom";
import { Notification, toast, Button } from "components/ui";
import { useSelector } from "react-redux";

const AddPurchaseReq = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("material");
  const formRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { createPurchaseReq } = usePurchaseReq();

  const handleFormData = async (form) => {
    console.log(form);
    try {
      setIsLoading(true);
      const response = await createPurchaseReq(form);
      if (response.status === "success") {
        toast.push(
          <Notification
            type="success"
            title="Permintaan pembelian berhasil dibuat"
          />,
          {
            placement: "top-center",
          }
        );
        setTimeout(() => {
          navigate("/purchase/request");
        }, 1000);
      } else {
        console.log(response.status);
        toast.push(
          <Notification
            type="danger"
            title="Maaf terjadi kesalahan, Permintaan pembelian gagal dibuat"
          />,
          {
            placement: "top-center",
          }
        );
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
        <div>
          <h1 className="text-2xl font-semibold text-indigo-900 mb-4">
            Tambah Permintaan Pembelian
          </h1>
        </div>
        <Button
          onClick={() => setIsOpen(true)}
          variant="solid"
          className="text-white"
        >
          Kirim
        </Button>
      </div>
      <div className="border-b border-gray-400 "></div>

      <FormPurchaseReq ref={formRef} setFormData={handleFormData} />
      <ConfirmationCustom
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        showCancelBtn
        showSubmitBtn
        onConfirm={handleSubmit}
        confirmText={isLoading ? "Loading..." : "Konfirmasi"}
        title="Anda yakin ingin membuat permintaan pembelian ini?"
        titleClass="mt-5 mb-3 text-main-100 text-xl font-bold"
        text="Klik Konfirmasi untuk melanjutkan"
        textClass="text-slate-500 text-base"
        isLoading={isLoading}
        disableCancel={false}
        buttonType="submit"
        width={500}
        contentClassName="p-5 rounded-2xl"
      />
    </div>
  );
};
export default AddPurchaseReq;
