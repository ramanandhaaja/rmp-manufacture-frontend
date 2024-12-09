import { useState } from "react";
import Button from "../../components/Button";
import LayoutRightSpace from "../../components/layout/LayoutRightSpace";
import ConfirmationModal from "../../components/modal/ConfirmationModal";
import FormAddVendor from "../../components/VendorManagement/FormAddVendor";
import { CircleAlert } from "lucide-react";

const AddVendorPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <FormAddVendor />
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Anda yakin ingin menambahkan vendor ini?"
        subtitle="Klik Konfirmasi untuk melanjutkan"
        onConfirm={() => setIsModalOpen(false)}
        icon={<CircleAlert size={48} />}
      />
    </LayoutRightSpace>
  );
};

export default AddVendorPage;
