import React from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { vendorStatus } from "../../const/vendorManagement";

const InputModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  icon,
  subtitle,
  isLoading = false,
  selectOptions,
}) => {
  const {
    handleSubmit,
    control,

    formState: { errors },
  } = useForm({
    defaultValues: {
      verification_status: "",
    },
  });
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-[450px] h-[326px] flex flex-col items-center justify-center p-8">
        <div className="mb-4">{icon}</div>

        <h2 className="text-xl font-medium text-gray-900 mb-2 text-center">
          {title}
        </h2>

        <p className="text-gray-600 text-center mb-4">{subtitle}</p>
        <div className="w-full mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status{" "}
          </label>
          <Controller
            name="verification_status"
            control={control}
            rules={{ required: "Please select at least one status" }}
            render={({ field }) => (
              <Select
                {...field}
                options={selectOptions}
                placeholder="Pilih Status "
                className="w-full"
              />
            )}
          />
          {errors.verification_status && (
            <p className="mt-1 text-sm text-red-600">
              {errors.verification_status.message}
            </p>
          )}
        </div>

        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="w-[186px]  py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit(onConfirm)}
            className="w-[186px]  py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800"
          >
            {isLoading ? "Loading..." : "Konfirmasi"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputModal;
