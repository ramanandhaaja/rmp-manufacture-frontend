import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { Plus } from "lucide-react";
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

const FormAddVendor = forwardRef(({ onSubmit }, ref) => {
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
      setDocumentInputs((prevInputs) => {
        const newInputs = [...prevInputs];
        newInputs[index] = { ...newInputs[index], file: file };
        return newInputs;
      });

      const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        alert("Only PDF, JPG, and PNG files are allowed");
        return;
      }
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
          {/* Vendor Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Vendor
            </label>
            <input
              type="text"
              placeholder="Value"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("name", {
                required: "Nama Vendor is required",
              })}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* notes: tambah btn + untuk input tipe */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kategori Barang
            </label>
            <Controller
              name="goods_category"
              control={control}
              rules={{ required: "Please select at least one type" }}
              render={({ field }) => (
                <Select
                  {...field}
                  isMulti
                  options={vendorTypeOptions}
                  placeholder="Kategori Barang"
                  className="w-full"
                />
              )}
            />
            {errors.goods_category && (
              <p className="mt-1 text-sm text-red-600">
                {errors.goods_category.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipe Barang Vendor
            </label>
            <Controller
              name="vendor_type"
              control={control}
              rules={{ required: "Please select at least one kategori" }}
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

          {/* PIC */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              PIC
            </label>
            <input
              type="text"
              placeholder="Value"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("pic_name", { required: "PIC is required" })}
            />
            {errors.pic_name && (
              <p className="mt-1 text-sm text-red-600">
                {errors.pic_name.message}
              </p>
            )}
          </div>

          {/* PIC Contact and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kontak PIC
              </label>
              <input
                type="text"
                placeholder="Value"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("pic_phone", {
                  required: "Contact is required",
                })}
              />
              {errors.pic_phone && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.pic_phone.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email PIC
              </label>
              <input
                type="email"
                placeholder="Value"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("pic_email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.pic_email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.pic_email.message}
                </p>
              )}
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Alamat
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

          {/* Document Upload */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Dokumen Pendukung (Opsional)
              </label>
              <button
                type="button"
                onClick={addDocumentInput}
                disabled={documentInputs.length >= 5}
                className=" bg-indigo-900 text-white px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span className="flex items-center gap-2">
                  <Plus size={16} />
                  Tambah Dokumen
                </span>
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Anda hanya dapat menambahkan maksimal 5 dokumen pendukung
            </p>

            {documentInputs.map((input, index) => (
              <div key={input.id} className="mb-4">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 pr-28"
                    placeholder="document name"
                    value={input.file ? input.file.name : ""}
                  />
                  <label className="absolute right-1 px-4 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
                    Browse File
                    <input
                      type="file"
                      hidden
                      accept=".pdf,.jpg,.jpeg,.png"
                      {...register(`documents.${index}`)}
                      onChange={(e) => handleFileChange(e, index)}
                    />
                  </label>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Supported formats : PDF, JPG, PNG with maximum size 20 MB
                </p>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
});

export default FormAddVendor;
