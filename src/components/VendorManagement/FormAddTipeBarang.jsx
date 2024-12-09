import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { kategoriBarangOptions } from "../../const/vendorManagement/index";

import { forwardRef, useImperativeHandle } from "react";

const FormAddTipeBarang = forwardRef(({ onSubmit }, ref) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      name: "",
      goods_type: "",
    },
  });

  useImperativeHandle(ref, () => ({
    submit: () => handleSubmit(onSubmit)(),
    getFormValues: () => getValues(),
  }));

  return (
    <div className="bg-white rounded-lg p-4 pt-6 md:p-6 lg:p-6 xl:p-6">
      <form>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Kategori Barang
            </label>
            <input
              type="text"
              placeholder="Masukkan nama"
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name
                  ? "border-red-600 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              {...register("name", {
                required: "Nama Tipe Barang is required",
              })}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipe Barang
            </label>
            <Controller
              name="goods_type"
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
            {errors.goods_type && (
              <p className="mt-1 text-sm text-red-600">
                {errors.goods_type.message}
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
});

export default FormAddTipeBarang;
