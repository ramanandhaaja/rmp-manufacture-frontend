import React, { useState } from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import LayoutRightSpace from "../../components/layout/LayoutRightSpace";
import PageTitle from "../../components/PageTitle";

const AddVendorPage = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      vendorName: "",
      vendorTypes: [],
      pic: "",
      picContact: "",
      picEmail: "",
      address: "",
      documents: [],
    },
  });

  const [documentInputs, setDocumentInputs] = useState([{ id: 1 }]);

  const vendorTypeOptions = [
    { value: "type1", label: "Tipe Barang" },
    { value: "type2", label: "Tipe Barang" },
    { value: "type3", label: "Tipe Barang" },
    { value: "type4", label: "Tipe Barang" },
  ];

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
    }
  };

  const addDocumentInput = () => {
    if (documentInputs.length < 5) {
      setDocumentInputs((prev) => [...prev, { id: prev.length + 1 }]);
    }
  };

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission here
  };

  return (
    <LayoutRightSpace>
      <PageTitle title={"Tambah Vendor"} />
      <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-6 xl:p-6">
        <div className="bg-white rounded-lg shadow-md p-4 pt-6 md:p-6 lg:p-6 xl:p-6">
          <form onSubmit={handleSubmit(onSubmit)}>
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
                  {...register("vendorName", {
                    required: "Nama Vendor is required",
                  })}
                />
                {errors.vendorName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.vendorName.message}
                  </p>
                )}
              </div>

              {/* Vendor Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipe Barang Vendor
                </label>
                <Controller
                  name="vendorTypes"
                  control={control}
                  rules={{ required: "Please select at least one type" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isMulti
                      options={vendorTypeOptions}
                      placeholder="Tipe Barang"
                      className="w-full"
                    />
                  )}
                />
                {errors.vendorTypes && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.vendorTypes.message}
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
                  {...register("pic", { required: "PIC is required" })}
                />
                {errors.pic && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.pic.message}
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
                    {...register("picContact", {
                      required: "Contact is required",
                    })}
                  />
                  {errors.picContact && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.picContact.message}
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
                    {...register("picEmail", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.picEmail && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.picEmail.message}
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
                    className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    + Tambah Dokumen
                  </button>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  Anda hanya dapat menambahkan maksimal 5 dokumen pendukung
                </p>

                {documentInputs.map((input, index) => (
                  <div key={input.id} className="mb-4">
                    <div className="flex gap-4 items-center">
                      <input
                        type="text"
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                        placeholder="document name"
                      />
                      <label className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
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
      </div>
    </LayoutRightSpace>
  );
};

export default AddVendorPage;
