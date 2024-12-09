import { useState, useRef } from "react";
import Button from "../../components/Button";
import LayoutRightSpace from "../../components/layout/LayoutRightSpace";
import ConfirmationModal from "../../components/modal/ConfirmationModal";
import FormAddVendor from "../../components/VendorManagement/FormAddVendor";
import { CircleAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createVendor } from "../../store/vendorManagement/vendorSlice";
import { useSelector, useDispatch } from "react-redux";

const AddVendorPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formRef = useRef();
  const { postStatus, postError } = useSelector((state) => state.vendorList);

  const handleButtonClick = async () => {
    if (formRef.current) {
      const formData = formRef.current.getFormValues(); // Get form values

      const transformedData = {
        ...formData,
        vendor_type: formData.vendor_type?.value || formData.goods_type,
        goods_category:
          formData.goods_category?.map((item) => item.value) ||
          formData.goods_category,
        // status: "active",
        // verification_status: "verified",
      };

      try {
        setLoading(true); // Start loading state
        const response = await dispatch(createVendor(transformedData)); // Dispatch the action

        // Check the status of the post request
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
  return (
    <LayoutRightSpace>
      <div className=" flex justify-between ">
        <h1 className="text-2xl font-semibold text-indigo-900 ">Add Vendor</h1>
        <Button
          title={"Kirim"}
          color={"bg-indigo-900"}
          onClick={() => setIsModalOpen(true)}
        />
      </div>
      <div className="border-b border-gray-400 my-4"></div>
      <FormAddVendor ref={formRef} />
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Anda yakin ingin menambahkan vendor ini?"
        subtitle="Klik Konfirmasi untuk melanjutkan"
        onConfirm={handleButtonClick}
        icon={<CircleAlert size={48} />}
        loading={loading}
      />
    </LayoutRightSpace>
  );
};

export default AddVendorPage;
