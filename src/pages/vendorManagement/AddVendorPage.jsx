import { useState, useRef } from "react";
import Button from "../../components/Button";
import LayoutRightSpace from "../../components/layout/LayoutRightSpace";
import ConfirmationModal from "../../components/modal/ConfirmationModal";
import FormAddVendor from "../../components/VendorManagement/FormAddVendor";
import { CircleAlert } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createVendor,
  editVendor,
} from "../../store/vendorManagement/vendorSlice";
import { useSelector, useDispatch } from "react-redux";

const AddVendorPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formRef = useRef();
  const { vendorDetails, postStatus, postError } = useSelector(
    (state) => state.vendorList
  );
  const isEditMode = window.location.pathname.includes("edit");
  const { id } = useParams();

  const handleSubmit = async () => {
    if (formRef.current) {
      const formData = formRef.current.getFormValues(); // Get form values
      const formDataObj = new FormData();

      // Append basic fields
      formDataObj.append("name", formData.name);
      formDataObj.append(
        "vendor_type",
        formData.vendor_type?.value || formData.goods_type
      );

      // Append goods category array
      formData.goods_category?.forEach((category) => {
        formDataObj.append("goods_category[]", category.value);
      });

      // Append other basic fields
      formDataObj.append("pic_name", formData.pic_name);
      formDataObj.append("pic_phone", formData.pic_phone);
      formDataObj.append("pic_email", formData.pic_email);
      formDataObj.append("address", formData.address);

      // Append documents with proper indexing
      formData.documents?.forEach((file, index) => {
        formDataObj.append(`documents[${index}][file]`, file);
        formDataObj.append(
          `documents[${index}][description]`,
          formData.documentsDescription?.[index] || ""
        );
      });

      try {
        setLoading(true);
        const response = await dispatch(createVendor(formDataObj));
        console.log(response);
        if (response.meta.requestStatus === "fulfilled") {
          console.log("Vendor created successfully!");
          setIsModalOpen(false);
          navigate("/vendor-management/vendor");
        } else {
          console.error("Failed to create vendor:", postError);
          alert(`Failed to create vendor: ${postError}`);
        }
      } catch (error) {
        console.error("Error creating vendor:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEdit = async () => {
    if (formRef.current) {
      const formData = formRef.current.getFormValues();

      const formattedData = {
        ...formData,
        vendor_type: formData.vendor_type?.value || formData.goods_type,
        goods_category:
          formData.goods_category?.map((item) => item.value) ||
          formData.goods_category,
        // status: "active",
        // verification_status: "verified",
      };

      try {
        setLoading(true);

        const response = await dispatch(
          editVendor({ vendorId: id, vendorData: formattedData })
        );
        if (response.meta.requestStatus === "fulfilled") {
          console.log("Vendor created successfully!");
          setIsModalOpen(false);
          navigate("/vendor-management/vendor");
        } else {
          console.error("Failed to create vendor:", postError);
          alert(`Failed to create vendor: ${postError}`);
        }
      } catch (error) {
        console.error("Error creating vendor:", error);
        alert("An error occurred while creating the vendor.");
      } finally {
        setLoading(false);
      }
    }
  };

  const renderModal = () => {
    if (isEditMode && vendorDetails?.verification_status === "verified") {
      return (
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Anda yakin ingin mengubah vendor ini?"
          subtitle="Data ini sudah diverifikasi. Apakah anda tetap ingin mengubah data ini?"
          onConfirm={handleEdit}
          icon={<CircleAlert size={48} />}
          loading={loading}
        />
      );
    }
    if (isEditMode) {
      return (
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Anda yakin ingin menambahkan vendor ini?"
          subtitle="Klik Konfirmasi untuk melanjutkan"
          onConfirm={handleSubmit}
          icon={<CircleAlert size={48} />}
          loading={loading}
        />
      );
    }
    return (
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Anda yakin ingin menambahkan vendor ini?"
        subtitle="Klik Konfirmasi untuk melanjutkan"
        onConfirm={handleSubmit}
        icon={<CircleAlert size={48} />}
        loading={loading}
      />
    );
  };

  return (
    <LayoutRightSpace>
      <div className=" flex justify-between ">
        <h1 className="text-2xl font-semibold text-indigo-900 ">
          {isEditMode ? "Edit Vendor" : "Add Vendor"}
        </h1>
        <Button
          title={"Kirim"}
          color={"bg-indigo-900"}
          onClick={() => setIsModalOpen(true)}
        />
      </div>
      <div className="border-b border-gray-400 my-4"></div>
      <FormAddVendor ref={formRef} />
      {renderModal()}
    </LayoutRightSpace>
  );
};

export default AddVendorPage;
