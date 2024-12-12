import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { kategoriBarangOptions } from "../../const/vendorManagement/index";
import {
  createVendor,
  fetchVendorById,
} from "../../store/vendorManagement/vendorSlice";
import { useDispatch, useSelector } from "react-redux";
import { forwardRef, useImperativeHandle } from "react";
import { fetchTipeBarang } from "../../store/vendorManagement/tipeBarangSlice";
import { useParams } from "react-router-dom";
import { PurchaseReasonOptions } from "../../const/PurchaseManagement";
import SearchAndActionBtn from "../SearchAndActionBtn";
import TableProduct from "./TableProduct";

const FormAddPurchaseRequest = forwardRef(({ onSubmit }, ref) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data } = useSelector((state) => state.tipeBarang);
  const { vendorDetails } = useSelector((state) => state.vendorList);

  const [documentInputs, setDocumentInputs] = useState([]);
  const isEditMode = window.location.pathname.includes("edit");

  const {
    register,
    handleSubmit,
    control,
    getValues,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      goods_category: [],
      vendor_type: [],
      pic_name: "",
      pic_phone: "",
      pic_email: "",
      address: "",
      documents: [],
      documentsDescription: [],
    },
  });

  useEffect(() => {
    dispatch(fetchTipeBarang({ page: 1, perPage: 10 }));
    if (isEditMode) dispatch(fetchVendorById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (vendorDetails && isEditMode) {
      reset({
        name: vendorDetails.name,
        goods_category:
          vendorDetails.goods_category?.map((category) => ({
            value: category,
            label: category,
          })) || [],
        vendor_type: vendorDetails.vendor_type
          ? {
            value: vendorDetails.vendor_type,
            label: vendorDetails.vendor_type,
          }
          : null,
        pic_name: vendorDetails.pic_name,
        pic_phone: vendorDetails.pic_phone,
        pic_email: vendorDetails.pic_email,
        address: vendorDetails.address,
        documents: vendorDetails.documents,
      });
    }
  }, [vendorDetails, reset]);

  const vendorTypeOptions =
    data?.data?.map((item) => ({
      value: item.name,
      label: item.name,
    })) || [];

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 20 * 1024 * 1024) {
        // 20MB limit
        alert("File size should not exceed 20MB");
        return;
      }
      const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        alert("Only PDF, JPG, and PNG files are allowed");
        return;
      }

      setDocumentInputs((prevInputs) => {
        const newInputs = [...prevInputs];
        newInputs[index] = { ...newInputs[index], file: file };
        return newInputs;
      });

      setValue(`documents.${index}`, file);
    }
  };

  const addDocumentInput = () => {
    if (documentInputs.length < 5) {
      setDocumentInputs((prev) => [...prev, { id: prev.length + 1 }]);
    }
  };

  useImperativeHandle(ref, () => ({
    submit: () => handleSubmit(onSubmit)(),
    getFormValues: () => getValues(),
  }));

  return (
    <div className="bg-white rounded-lg p-4 pt-6 md:p-6 lg:p-6 xl:p-6">
      <form>
        <div className="space-y-6">
          {/* Owner Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dibeli Oleh
            </label>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Please select at least one user" }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={kategoriBarangOptions}
                  placeholder="Pilih Tipe Barang"
                  className="w-full"
                />
              )}
            />
            {errors.vendor_type && (
              <p className="mt-1 text-sm text-red-600">
                {errors.vendor_type.message}
              </p>
            )}
          </div>

          {/* Purchase Reason */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Alasan Pembelian
            </label>
            <Controller
              name="purchase_reason"
              control={control}
              rules={{ required: "Please select at least one reason" }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={PurchaseReasonOptions}
                  placeholder="Pilih Tipe Barang"
                  className="w-full"
                />
              )}
            />
            {errors.vendor_type && (
              <p className="mt-1 text-sm text-red-600">
                {errors.vendor_type.message}
              </p>
            )}
          </div>

          {/* Purchase Reason Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Catatan Alasan Pembelian (Opsional)
            </label>
            <textarea
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("address", { required: "Address is required" })}
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-600">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Add Product Button */}
          <SearchAndActionBtn
            showBtnExport={false}
            showBtnFilter={false}
            showBtnImport={false}
            showAddBtn={true}
            buttonTitle={"Tambah Barang"}
            buttonClassName={"bg-indigo-900 text-white"}
            onClickAddBtn={() => {
              navigate("/purchase-management/add-purchase-request");
            }}
            onClickFilter={() => setIsFilterOpen(true)}
            onClickExport={() => setOpenExport(true)}
          />

          {/* Product Table */}
          <TableProduct />

          {/* Catatan */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Catatan (Opsional)
            </label>
            <textarea
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("catatan")}
            />
            {errors.catatan && (
              <p className="mt-1 text-sm text-red-600">
                {errors.catatan.message}
              </p>
            )}
          </div>

        </div>
      </form>
    </div>
  );
});

export default FormAddPurchaseRequest;
