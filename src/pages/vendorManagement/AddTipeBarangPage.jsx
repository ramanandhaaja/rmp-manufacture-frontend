import Button from "../../components/Button";
import LayoutRightSpace from "../../components/layout/LayoutRightSpace";
import FormAddTipeBarang from "../../components/VendorManagement/FormAddTipeBarang";
import ConfirmationModal from "../../components/modal/ConfirmationModal";
import { useState, useRef } from "react";
import { CircleAlert } from "lucide-react";
import { postTipeBarang } from "../../services/TipeBarangService";
import { useNavigate } from "react-router-dom";

const AddTipeBarangPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef();

  const handleSubmit = async (data) => {
    setLoading(true);
    // Transform tipeBarang to its value not object

    const transformedData = {
      ...data,
      goods_type: data.goods_type?.value || data.goods_type,
    };

    try {
      const response = await postTipeBarang(transformedData);

      if (response.data.status === "success") {
        console.log("Form submitted successfully!");
        setIsModalOpen(false);
        navigate("/vendor-management/tipe-barang");
      } else {
        console.error("Failed to submit form.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = () => {
    if (formRef.current) {
      formRef.current.submit();
    }
  };
  return (
    <LayoutRightSpace>
      <div className=" flex justify-between ">
        <h1 className="text-2xl font-semibold text-indigo-900 ">
          Add Tipe Barang
        </h1>
        <Button
          title={"Kirim"}
          color={"bg-indigo-900"}
          onClick={() => setIsModalOpen(true)}
        />
      </div>
      <div className="border-b border-gray-400 my-4"></div>
      <FormAddTipeBarang ref={formRef} onSubmit={handleSubmit} />
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Anda yakin ingin menambahkan tipe barang ini?"
        subtitle="Klik Konfirmasi untuk melanjutkan"
        onConfirm={handleButtonClick}
        icon={<CircleAlert size={48} />}
        loading={loading}
      />
    </LayoutRightSpace>
  );
};

export default AddTipeBarangPage;
