import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { kategoriBarangOptions } from "../../const/vendorManagement/index";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { fetchTipeBarangId } from "../../store/vendorManagement/tipeBarangSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const FormAddTipeBarang = forwardRef(({ onSubmit }, ref) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { barangPerId } = useSelector((state) => state.tipeBarang);
  const isEditMode = window.location.pathname.includes("edit");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      goods_type: "",
      status: "",
    },
  });

  useImperativeHandle(ref, () => ({
    submit: () => handleSubmit(onSubmit)(),
    getFormValues: () => getValues(),
  }));

  const optionsStatus = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  useEffect(() => {
    dispatch(fetchTipeBarangId(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (isEditMode && barangPerId) {
      reset({
        name: barangPerId.name,
        goods_type: barangPerId.goods_type
          ? {
              value: barangPerId.goods_type,
              label: barangPerId.goods_type,
            }
          : null,
        status: barangPerId.status,
      });
    }
  }, []);

  return (
    <div className="bg-white rounded-lg p-4 pt-6 md:p-6 lg:p-6 xl:p-6">
      <form>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Kategori Barang
            </label>
            <input
              defaultValue={isEditMode && barangPerId ? barangPerId.name : ""}
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
              defaultValue={
                isEditMode && barangPerId ? barangPerId.goods_type : ""
              }
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
          {isEditMode && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status Barang
              </label>
              <Controller
                defaultValue={
                  optionsStatus.find(
                    (option) =>
                      option.value ===
                      (isEditMode && barangPerId ? barangPerId.status : "")
                  ) || null
                }
                name="status"
                control={control}
                rules={{ required: "Please select at least one status" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={optionsStatus}
                    placeholder="Pilih Status Barang"
                    className="w-full"
                  />
                )}
              />
              {errors.status && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.status.message}
                </p>
              )}
            </div>
          )}
        </div>
      </form>
    </div>
  );
});

export default FormAddTipeBarang;
