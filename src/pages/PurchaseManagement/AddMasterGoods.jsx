import LayoutRightSpace from "../../components/layout/LayoutRightSpace";
import Button from "../../components/Button";
import FormAddMasterGoods from "../../components/PurchaseManagement/FormAddMasterGoods";
import { useState, useRef } from "react";
import { CircleAlert } from "lucide-react";
import ConfirmationModal from "../../components/modal/ConfirmationModal";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import useGoods from "../../utils/hooks/useGoods";

const AddMasterGoods = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef();
  const isEditMode = window.location.pathname.includes("edit");
  const dispatch = useDispatch();
  const { createGoods, updateGoods } = useGoods();
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);
  const editMode = window.location.pathname.includes("edit");
  const { id } = useParams();

  const validateForm = (data) => {
    return (
      data.name.trim() !== "" &&
      data.measurement.trim() !== "" &&
      data.goods_category_id &&
      data.goods_category_id.value !== null
    );
  };
  const handleAdd = async () => {
    setIsLoading(true);

    if (formRef.current) {
      const formData = formRef.current?.getFormValues(); // Get form values
      const formDataObj = new FormData();

      const isValid = validateForm(formData);
      setIsFormValid(isValid);
      if (!isValid) {
        console.log("Form is invalid");
        alert("Form is invalid");
        setIsModalOpen(false);
        return;
      }
      formDataObj.append("name", formData.name);
      formDataObj.append("description", formData.description);
      formDataObj.append("measurement", formData.measurement);
      formDataObj.append(
        "goods_category_id",
        formData.goods_category_id?.value
      );

      const response = await createGoods(formDataObj);
      if (response.status === "success") {
        setTimeout(() => {
          navigate("/purchase-management/master-data-barang");
          setIsLoading(false);
        }, 1000);
      } else {
        console.log(response);
        alert(response.message);
        setIsLoading(false);
      }
    }
  };

  const handleEdit = async () => {
    setIsLoading(true);

    if (formRef.current) {
      const formData = formRef.current?.getFormValues(); // Get form values
      const formDataObj = new FormData();
      const isValid = validateForm(formData);
      setIsFormValid(isValid);

      if (!isValid) {
        console.log("Form is invalid");
        alert("Form is invalid");
        setIsModalOpen(false);
        return;
      }
      formDataObj.append("name", formData.name);
      formDataObj.append("description", formData.description);
      formDataObj.append("measurement", formData.measurement);
      formDataObj.append(
        "goods_category_id",
        formData.goods_category_id?.value
      );

      const response = await updateGoods({ data: formDataObj, id: id });
      if (response.status === "success") {
        setTimeout(() => {
          navigate("/purchase-management/master-data-barang");
          setIsLoading(false);
        }, 1000);
      } else {
        console.log(response);
        alert(response.message);
        setIsLoading(false);
      }
    }
  };

  const handleSubmit = () => {
    formRef.current?.submit();
  };

  return (
    <LayoutRightSpace>
      <div className=" flex justify-between ">
        <h1 className="text-2xl font-semibold text-indigo-900 ">
          {isEditMode ? "Edit Master Barang" : "Add Master Barang"}
        </h1>
        <Button
          title={"Kirim"}
          color={"bg-indigo-900"}
          onClick={() => setIsModalOpen(true)}
        />
      </div>
      <div className="border-b border-gray-400 my-4"></div>
      <FormAddMasterGoods
        ref={formRef}
        onSubmit={editMode ? handleEdit : handleAdd}
      />
      {!isEditMode ? (
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Anda yakin ingin menambahkan barang ini?"
          subtitle="Klik Konfirmasi untuk melanjutkan"
          onConfirm={handleSubmit} // Call the submit method
          icon={<CircleAlert size={48} />}
          loading={isLoading}
        />
      ) : (
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Anda yakin ingin mengubah barang ini?"
          subtitle="Klik Konfirmasi untuk melanjutkan"
          onConfirm={handleSubmit}
          icon={<CircleAlert size={48} />}
          loading={isLoading}
        />
      )}
    </LayoutRightSpace>
  );
};
export default AddMasterGoods;
