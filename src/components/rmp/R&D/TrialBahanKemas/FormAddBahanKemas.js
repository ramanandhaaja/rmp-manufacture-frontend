import { Formik, Form, Field } from "formik";
import { useEffect, useState, useMemo } from "react";
import {
  Notification,
  toast,
  Button,
  Radio,
  DatePicker,
  Input,
  FormItem,
  FormContainer,
  Upload,
} from "components/ui";
import { FiPlus, FiTrash } from "react-icons/fi";
import Select from "react-select";
import * as Yup from "yup";
import SearchBar from "components/custom/SearchBar";
import useMasterGoods from "utils/hooks/useMasterGoods";
import useVendor from "utils/hooks/vendorManagement/useVendor";
import { parseDate } from "utils/helpers";
import useProcessRnd from "utils/hooks/Rnd/useProcessRnd";
import { useNavigate } from "react-router-dom";
import ConfirmationCustom from "components/custom/ConfirmationCustom";
import { useSelector, useDispatch } from "react-redux";
import { clearDataRndRequest } from "store/Rnd/rndSlice";
import { useParams } from "react-router-dom";

const validationSchema = Yup.object({
  trial_name: Yup.string().required("Nama Trial harus diisi"),
  trial_date: Yup.date().required("Tanggal Trial harus diisi"),
  procedure: Yup.string().required("Prosedur harus diisi"),
  details: Yup.array().of(
    Yup.object().shape({
      goods_id: Yup.number().nullable().required("Bahan Kemas harus dipilih"),
      vendor_id: Yup.number().nullable().required("Vendor harus diisi"),
    })
  ),
});

function FormAddBahanKemas({ isEdit }) {
  const { id } = useParams();
  const { getGoods, dataMasterGoods } = useMasterGoods();
  const { postRndTrialPackagingMaterials } = useProcessRnd();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { rndRequestId } = useSelector((state) => state.rnd);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchLoading, setSearchLoading] = useState({});
  const [isLoadingVendor, setIsLoadingVendor] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const { getVendors, dataVendor } = useVendor();
  const [dataTrialKemas, setDataTrialKemas] = useState([]);
  const { getRndTrialPackagingMaterialsById } = useProcessRnd();

  const initialValues = useMemo(() => {
    if (dataTrialKemas?.length !== 0) {
      return {
        trial_name: dataTrialKemas?.trial_name,
        trial_date: dataTrialKemas?.trial_date,
        procedure: dataTrialKemas?.procedure,
        details: dataTrialKemas?.rnd_trial_packaging_material_details?.map(
          (detail) => ({
            goods_id: detail.goods_id || 0,
            vendor_id: detail.vendor_id || 0,
          })
        ),
      };
    }
    return {
      trial_name: "",
      trial_date: null,
      procedure: "",
      details: [
        {
          goods_id: "",
          vendor_id: null,
        },
      ],
    };
  }, [dataTrialKemas]);

  const fetchMasterGoods = async () => {
    setIsLoading(true);
    try {
      const response = await getGoods({ all: true });
    } catch (error) {
      console.error("Error fetching purchase requests:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchVendor = async () => {
    setIsLoadingVendor(true);
    try {
      const response = await getVendors({ all: true });
    } catch (error) {
      console.error("Error fetching purchase requests:", error);
    } finally {
      setIsLoadingVendor(false);
    }
  };

  const fetchTrialKemas = async () => {
    try {
      const response = await getRndTrialPackagingMaterialsById(id);
      setDataTrialKemas(response.data);
    } catch (error) {
      console.error("Error fetching trial kemas:", error);
    }
  };

  useEffect(() => {
    fetchMasterGoods();
  }, []);

  useEffect(() => {
    fetchVendor();
  }, []);

  useEffect(() => {
    if (isEdit && id) fetchTrialKemas();
  }, [id]);

  const handleSearch = async (searchTerm, index) => {
    setSearchLoading((prev) => ({ ...prev, [index]: true }));
    try {
      if (!searchTerm.trim()) {
        setFilteredData((prev) => ({
          ...prev,
          [index]: [],
        }));
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 300));

      const filtered = dataMasterGoods.filter((item) => {
        const searchLower = searchTerm.toLowerCase();

        return (
          (typeof item.id === "string" &&
            item.id.toLowerCase().includes(searchLower)) ||
          (typeof item.name === "string" &&
            item.name.toLowerCase().includes(searchLower)) ||
          (typeof item.id === "number" &&
            item.id.toString().includes(searchTerm))
        );
      });

      setFilteredData((prev) => ({
        ...prev,
        [index]: filtered,
      }));
    } catch (error) {
      console.error("Error fetching purchase requests:", error);
    } finally {
      setSearchLoading((prev) => ({ ...prev, [index]: false }));
    }
  };

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    const payload = {
      ...values,
      rnd_request_id: rndRequestId,
    };
    try {
      const response = await postRndTrialPackagingMaterials(payload);
      if (response.status === "success") {
        toast.push(
          <Notification
            type="success"
            title="Berhasil menambahkan bahan kemas"
            width={700}
          />,
          {
            placement: "top-center",
          }
        );
        setTimeout(() => {
          dispatch(clearDataRndRequest);
          navigate(-1);
        }, 1000);
      }
    } catch (error) {
      toast.push(
        <Notification
          type="error"
          title="Maaf Terjadi Kesalahan, Gagal menambahkan bahan kemas"
          width={700}
        />,
        {
          placement: "top-center",
        }
      );
    } finally {
      setIsSubmitting(false);
      setIsOpen(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, errors, touched, setFieldValue, submitForm }) => {
        const handleItemSelect = (item, index) => {
          const isItemSelectedElsewhere = values.details.some(
            (detail, idx) => idx !== index && detail.goods_id === item.id
          );

          if (isItemSelectedElsewhere) {
            toast.warning("Bahan ini sudah dipilih di bagian lain");
            return;
          }

          setFieldValue(`details.${index}.goods_id`, item.id);
          const updatedFilteredData = filteredData[index]?.map(
            (filteredItem) => ({
              ...filteredItem,
              isSelected: filteredItem.id === item.id,
            })
          );

          setFilteredData((prev) => ({
            ...prev,
            [index]: updatedFilteredData,
          }));
        };

        return (
          <Form className="w-full">
            <FormContainer>
              <div className="grid grid-cols-2 gap-6">
                <FormItem
                  label="Nama Bahan Kemas"
                  invalid={touched.trial_name && errors.trial_name}
                  errorMessage={errors.trial_name}
                >
                  <Field
                    type="text"
                    name="trial_name"
                    placeholder="Masukan nama bahan kemas"
                    component={Input}
                    uppercase={false}
                  />
                </FormItem>

                <FormItem
                  label="Tanggal Pelaksanaan"
                  invalid={touched.trial_date && errors.trial_date}
                  errorMessage={errors.trial_date}
                >
                  <Field
                    placeholder="Pilih tanggal"
                    name="trial_date"
                    component={DatePicker}
                    value={
                      values.trial_date ? new Date(values.trial_date) : null
                    }
                    inputFormat="DD/MM/YYYY"
                    onChange={(date) => {
                      setFieldValue("trial_date", parseDate(date));
                    }}
                  />
                </FormItem>
              </div>
              <FormItem
                label="Prosedur"
                invalid={touched.procedure && errors.procedure}
                errorMessage={errors.procedure}
              >
                <Field
                  as="textarea"
                  rows="4"
                  name="procedure"
                  placeholder="Masukan prosedur"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray"
                />
              </FormItem>

              {values.details?.map((detail, index) => (
                <div key={index} className="pt-4">
                  <div className="border rounded-lg px-6 ">
                    <div className="flex flex-col">
                      <h3 className="text-lg font-medium mb-2 border-b py-2">
                        Bahan Kemas {index + 1}
                      </h3>
                      <div className="py-2">
                        <SearchBar
                          placeholder={"Cari dari Id, Nama, atau Kategori..."}
                          onSearch={handleSearch}
                          debounceTime={500}
                          index={index}
                        />

                        <div className="pt-6">
                          {/* Loading State */}
                          {searchLoading[index] && (
                            <div className="flex items-center justify-center py-8">
                              <div className="flex items-center gap-2 text-gray-500">
                                <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                                <span>Mencari bahan...</span>
                              </div>
                            </div>
                          )}

                          {/* No Results State */}
                          {!searchLoading[index] &&
                            filteredData[index]?.length === 0 && (
                              <div className="text-center py-8">
                                <p className="text-gray-500">
                                  Bahan tidak ditemukan
                                </p>
                              </div>
                            )}

                          {filteredData[index]?.map((item) => (
                            <div
                              key={item.id}
                              className={`p-4 border rounded cursor-pointer transition-colors
                        ${
                          item.id === detail.goods_id
                            ? "bg-blue-50 border-blue-500"
                            : "hover:bg-gray-50"
                        }`}
                            >
                              <h3 className="text-lg font-medium pb-2">
                                {item.name}
                              </h3>
                              <p>ID: {item.id}</p>
                              <p>Category: {item.category.name}</p>
                              <div className="flex justify-end">
                                <Button
                                  variant="solid"
                                  type="button"
                                  color="blue-400"
                                  className="mt-2"
                                  onClick={() => handleItemSelect(item, index)}
                                >
                                  Pilih
                                </Button>
                              </div>
                            </div>
                          ))}

                          {errors.details?.[index]?.goods_id && (
                            <p className="text-red-500">
                              {errors.details?.[index]?.goods_id}
                            </p>
                          )}
                        </div>
                      </div>
                      <FormItem
                        label="Vendor"
                        className="py-2 w-[500px]"
                        invalid={
                          touched.details?.[index]?.vendor_id &&
                          errors.details?.[index]?.vendor_id
                        }
                        errorMessage={errors.details?.[index]?.vendor_id}
                      >
                        <Select
                          isLoading={isLoadingVendor}
                          options={dataVendor.map((item) => ({
                            value: item.id,
                            label: item.name,
                          }))}
                          onChange={(item) => {
                            setFieldValue(
                              `details.${index}.vendor_id`,
                              item.value
                            );
                          }}
                        />
                      </FormItem>
                    </div>
                  </div>
                </div>
              ))}

              <div className="pt-4">
                <Button
                  size="sm"
                  className="w-[135px] text-xs"
                  type="button"
                  onClick={() =>
                    setFieldValue("details", [
                      ...values.details,
                      { goods_id: "", vendor_id: "" },
                    ])
                  }
                  icon={<FiPlus />}
                >
                  Tambah Bahan
                </Button>
              </div>
              <div className="pt-4 flex justify-end gap-2">
                <Button
                  type="button"
                  onClick={() => {
                    navigate(-1);
                    dispatch(clearDataRndRequest());
                  }}
                >
                  Batal
                </Button>

                <Button
                  variant="solid"
                  type="button"
                  onClick={() => setIsOpen(true)}
                  loading={isSubmitting}
                >
                  Ajukan
                </Button>
              </div>
            </FormContainer>
            <ConfirmationCustom
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              showCancelBtn
              showSubmitBtn
              onConfirm={() => {
                submitForm();
              }}
              confirmText="Konfirmasi"
              title={"Ajukan R&D Trial Bahan Kemas?"}
              titleClass="mt-5 mb-3 text-main-100 text-xl font-bold"
              text="Pastikan data yang anda masukan sudah benar"
              textClass="text-slate-500 text-base"
              isLoading={isSubmitting}
              disableCancel={false}
              buttonType="submit"
            />
          </Form>
        );
      }}
    </Formik>
  );
}

export default FormAddBahanKemas;
