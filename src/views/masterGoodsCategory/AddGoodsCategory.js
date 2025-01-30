import FormGoodsCategory from "components/rmp/masterDataGoodsCategory/FormMasterGoodsCategory";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmationCustom from "components/custom/ConfirmationCustom";
import { Notification, toast, Button } from "components/ui";
import useGoodsCategory from "utils/hooks/useGoodsCategory";

const AddGoodsCategory = () => {
  const formRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const { createGoodsCategory } = useGoodsCategory();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFormData = async (form) => {
    console.log(form);

    try {
      setIsLoading(true);
      const response = await createGoodsCategory(form);
      console.log(response);
      if (response.status === "success") {
        console.log("success");
        toast.push(
          <Notification
            type="success"
            title={"Kategori barang berhasil ditambahkan"}
          />,
          {
            placement: "top-center",
          }
        );
        setTimeout(() => {
          navigate("/master-data/kategori-barang");
        }, 1000);
      } else {
        toast.push(
          <Notification
            type="danger"
            title={"Terjadi kesalahan. Kategori Barang gagal ditambahkan"}
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
    <>
      <div className="p-6 bg-white rounded-lg">
        <div className="flex justify-between p-2">
          <div>
            <h1 className="text-2xl font-semibold text-indigo-900 mb-4">
              Add Goods Category
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
        <div className="border-b border-gray-400 my-2"></div>
        <div className="p-4">
          <FormGoodsCategory ref={formRef} setFormData={handleFormData} />
        </div>
        <ConfirmationCustom
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          showCancelBtn
          showSubmitBtn
          onConfirm={handleSubmit}
          confirmText="Konfirmasi"
          title="Anda yakin ingin menambahkan kategori barang ini?"
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
    </>
  );
};

export default AddGoodsCategory;
