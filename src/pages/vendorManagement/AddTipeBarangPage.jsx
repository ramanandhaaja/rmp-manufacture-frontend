import Button from "../../components/Button";
import LayoutRightSpace from "../../components/layout/LayoutRightSpace";
import FormAddTipeBarang from "../../components/VendorManagement/FormAddTipeBarang";
import ConfirmationModal from "../../components/modal/ConfirmationModal";
import { useState, useRef } from "react";
import { CircleAlert } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  editTipeBarang,
  postTipeBarang,
} from "../../store/vendorManagement/tipeBarangSlice";

const AddTipeBarangPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef();
  const isEditMode = window.location.pathname.includes("edit");
  const { id } = useParams();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    setLoading(true);
    if (formRef.current) {
      const formData = formRef.current.getFormValues(); // Get form values

      // Transform tipeBarang to its value not object

      const formattedData = {
        ...formData,
        goods_type: formData.goods_type?.value || formData.goods_type,
      };

      try {
        const response = await dispatch(postTipeBarang(formattedData));

        if (response.meta.requestStatus === "fulfilled") {
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
    }
  };

  const handleEdit = async () => {
    if (formRef.current) {
      const formData = formRef.current.getFormValues();

      const transformedData = {
        ...formData,
        goods_type: formData.goods_type?.value || formData.goods_type,
        status: formData.status?.value || formData.status,
      };

      try {
        setLoading(true);

        const response = await dispatch(
          editTipeBarang({ barangId: id, data: transformedData })
        );
        if (response.meta.requestStatus === "fulfilled") {
          console.log("Edited successfully!");
          setIsModalOpen(false);
          navigate("/vendor-management/tipe-barang");
        } else {
          console.error("Failed to edit barang:", postError);
          alert(`Failed to edit barang: ${postError}`);
        }
      } catch (error) {
        console.error("Error edit barang:", error);
        alert("An error occurred while editing barang.");
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <LayoutRightSpace>
      <div className=" flex justify-between ">
        <h1 className="text-2xl font-semibold text-indigo-900 ">
          {isEditMode ? "Edit Kategori Barang" : "Add Kategori Barang"}
        </h1>
        <Button
          title={"Kirim"}
          color={"bg-indigo-900"}
          onClick={() => setIsModalOpen(true)}
        />
      </div>
      <div className="border-b border-gray-400 my-4"></div>
      <FormAddTipeBarang ref={formRef} />
      {!isEditMode ? (
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Anda yakin ingin menambahkan tipe barang ini?"
          subtitle="Klik Konfirmasi untuk melanjutkan"
          onConfirm={handleSubmit}
          icon={<CircleAlert size={48} />}
          loading={loading}
        />
      ) : (
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Anda yakin ingin mengubah tipe barang ini?"
          subtitle="Klik Konfirmasi untuk melanjutkan"
          onConfirm={handleEdit}
          icon={<CircleAlert size={48} />}
          loading={loading}
        />
      )}
    </LayoutRightSpace>
  );
};

export default AddTipeBarangPage;
