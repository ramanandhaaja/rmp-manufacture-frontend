import { forwardRef, useEffect, useImperativeHandle } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { fetchTipeBarang } from "../../store/vendorManagement/kategoriBarangSlice";
import useGoods from "../../utils/hooks/useGoods";
import { useParams } from "react-router-dom";

const FormAddMasterGoods = forwardRef(({ onSubmit }, ref) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.kategoriBarang);
  const isEditMode = window.location.pathname.includes("edit");
  const { getGoodsDetail, detailGoods } = useGoods();

  useEffect(() => {
    dispatch(fetchTipeBarang({ page: 1, perPage: 20 }));
  }, [dispatch]);

  useEffect(() => {
    const getGoodsPerId = () => {
      if (id && isEditMode) {
        getGoodsDetail(id);
      }
    };
    getGoodsPerId();
  }, [id]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    trigger,
    reset,
    getValues,
  } = useForm({
    defaultValues: {
      name: "",
      measurement: "",
      goods_category_id: null,
      description: "",
    },
  });

  useEffect(() => {
    if (isEditMode && detailGoods) {
      reset({
        name: detailGoods.name,
        measurement: detailGoods.measurement,
        goods_category_id: detailGoods.goods_category_id
          ? {
              value: detailGoods.goods_category_id,
              label: getCategoryValueById(detailGoods.goods_category_id),
            }
          : null,
        description: detailGoods.description,
      });
    }
  }, []);

  const getCategoryValueById = (id) => {
    const category = data?.data?.find((item) => item.id === id);
    return category ? category.name : null;
  };

  const goodsCategoryOptions =
    data?.data?.map((item) => ({
      value: item.id,
      label: item.name,
    })) || [];

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
              Nama Barang <span>*</span>
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
                required: "Nama Barang is required",
              })}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kategori Barang <span>*</span>
            </label>
            <Controller
              name="goods_category_id"
              control={control}
              rules={{ required: "Please select at least one kategori" }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={goodsCategoryOptions}
                  placeholder="Pilih Kategori Barang"
                  className="w-full"
                />
              )}
            />
            {errors.goods_category_id && (
              <p className="mt-1 text-sm text-red-600">
                {errors.goods_category_id.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Measurement <span>*</span>
            </label>
            <input
              type="text"
              placeholder="Masukkan ukuran barang"
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.measurement
                  ? "border-red-600 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              {...register("measurement", {
                required: "Measurment is required",
              })}
            />
            {errors.measurement && (
              <p className="mt-1 text-sm text-red-600">
                {errors.measurement.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deskripsi
            </label>
            <textarea
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("description")}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
});

export default FormAddMasterGoods;
