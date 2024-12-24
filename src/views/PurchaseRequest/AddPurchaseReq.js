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
import { setGoodsType } from "store/goodsTypeSlice";

const AddPurchaseReq = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("material");
  const formRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { createPurchaseReq } = usePurchaseReq();
  const { goodsType } = useSelector((state) => state.goodsType);

  const handleFormData = async (form) => {
    try {
      setIsLoading(true);
      const response = await createPurchaseReq(form);
      if (response.status === "success") {
        console.log("success");
        navigate("/purchase/request");
        toast.push(<Notification type="success" title={response.message} />, {
          placement: "top-center",
        });
      } else {
        console.log(response.status);
        toast.push(<Notification type="danger" title={response.message} />, {
          placement: "top-center",
        });
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
    <div>
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
        confirmText="Konfirmasi"
        title="Anda yakin ingin membuat permintaan pembelian ini?"
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
export default AddPurchaseReq;
