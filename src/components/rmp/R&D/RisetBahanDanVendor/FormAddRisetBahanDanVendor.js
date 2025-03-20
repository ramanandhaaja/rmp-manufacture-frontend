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
import { parseDate } from "utils/helpers";
import useProcessRnd from "utils/hooks/Rnd/useProcessRnd";
import { useNavigate } from "react-router-dom";
import ConfirmationCustom from "components/custom/ConfirmationCustom";
import { useSelector, useDispatch } from "react-redux";
import { clearDataRndRequest } from "store/Rnd/rndSlice";
import { useParams } from "react-router-dom";

const validationSchema = Yup.object({
  raw_material_type: Yup.string().required("Tipe Material harus diisi"),
  raw_material_name: Yup.string().required("Nama Material harus diisi"),
  details: Yup.array().of(
    Yup.object().shape({
      material_status: Yup.string().required(
        "Status Bahan Material harus dipilih"
      ),
      category: Yup.string().required("Kategori harus diisi"),
      material_category: Yup.string().required("Kategori harus diisi"),
      raw_material_code: Yup.string().required("Kode Bahan Kemas harus diisi"),
      raw_material_name: Yup.string().required("Nama Bahan Kemas harus diisi"),
      raw_material_id: Yup.number().nullable(),
    })
  ),
});

function FormAddRisetBahanDanVendor({ isEdit }) {
  const { id } = useParams();
  const { postRndRawMaterials } = useProcessRnd();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { rndRequestId } = useSelector((state) => state.rnd);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchLoading, setSearchLoading] = useState({});
  const [isLoadingVendor, setIsLoadingVendor] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [dataTrialKemas, setDataTrialKemas] = useState([]);

  const initialValues = useMemo(() => {
    if (dataTrialKemas?.length !== 0) {
      return {
        raw_material_type: dataTrialKemas?.trial_name,
        raw_material_name: dataTrialKemas?.trial_date,
        details: dataTrialKemas?.rnd_trial_packaging_material_details?.map(
          (detail) => ({
            material_status: detail.goods_id || 0,
            category: detail.vendor_id || 0,
            material_category: "Bahan Ekstraksi",
            raw_material_code: "0011",
            raw_material_name: "Ekstrak Jahe",
            raw_material_id: null,
          })
        ),
      };
    }
    return {
      raw_material_type: "",
      raw_material_name: "",
      details: [
        {
          material_status: "",
          category: "",
          material_category: "",
          raw_material_code: "",
          raw_material_name: "",
          raw_material_id: null,
        },
      ],
    };
  }, [dataTrialKemas]);

  //   const fetchTrialKemas = async () => {
  //     try {
  //       const response = await getRndTrialPackagingMaterialsById(id);
  //       setDataTrialKemas(response.data);
  //     } catch (error) {
  //       console.error("Error fetching trial kemas:", error);
  //     }
  //   };

  //   useEffect(() => {
  //     if (isEdit && id) fetchTrialKemas();
  //   }, [id]);

  //   const handleSearch = async (searchTerm, index) => {
  //     setSearchLoading((prev) => ({ ...prev, [index]: true }));
  //     try {
  //       if (!searchTerm.trim()) {
  //         setFilteredData((prev) => ({
  //           ...prev,
  //           [index]: [],
  //         }));
  //         return;
  //       }

  //       await new Promise((resolve) => setTimeout(resolve, 300));

  //       const filtered = dataMasterGoods.filter((item) => {
  //         const searchLower = searchTerm.toLowerCase();

  //         return (
  //           (typeof item.id === "string" &&
  //             item.id.toLowerCase().includes(searchLower)) ||
  //           (typeof item.name === "string" &&
  //             item.name.toLowerCase().includes(searchLower)) ||
  //           (typeof item.id === "number" &&
  //             item.id.toString().includes(searchTerm))
  //         );
  //       });

  //       setFilteredData((prev) => ({
  //         ...prev,
  //         [index]: filtered,
  //       }));
  //     } catch (error) {
  //       console.error("Error fetching purchase requests:", error);
  //     } finally {
  //       setSearchLoading((prev) => ({ ...prev, [index]: false }));
  //     }
  //   };

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    console.log(values);
    try {
      const response = await postRndRawMaterials(values);
      if (response.status === "success") {
        toast.push(
          <Notification
            type="success"
            title="Riset bahan dan vendor berhasil ditambahkan"
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
          title="Maaf Terjadi Kesalahan, Gagal menambahkan data Riset bahan dan vendor"
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

  const rawMaterialTypeOptions = [
    {
      label: "Bahan Aktif",
      value: "Bahan Aktif",
    },
    {
      label: "Bahan Tambahan",
      value: "Bahan Tambahan",
    },
    {
      label: "Bahan Penolong",
      value: "Bahan Penolong",
    },
  ];

  const rawMaterialCategoryOptions = [
    {
      label: "Bahan Baku Ekstrak",
      value: "Bahan Baku Ekstrak",
    },
    {
      label: "Bahan Baku Awal (Aktif) ",
      value: "Bahan Baku Awal (Aktif)",
    },
    {
      label: "Bahan Baku Awal (Non-Aktif)",
      value: "Bahan Baku Awal (Non-Aktif)",
    },
    {
      label: "Bahan Baku Mentah",
      value: "Bahan Baku Mentah",
    },
    {
      label: "Bahan Kemas (Primer)",
      value: "Bahan Kemas (Primer)",
    },
    {
      label: "Bahan Pelarut",
      value: "Bahan Pelarut",
    },
  ];

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, errors, touched, setFieldValue, submitForm }) => {
        // const handleItemSelect = (item, index) => {
        //   const isItemSelectedElsewhere = values.details.some(
        //     (detail, idx) => idx !== index && detail.goods_id === item.id
        //   );

        //   if (isItemSelectedElsewhere) {
        //     toast.warning("Bahan ini sudah dipilih di bagian lain");
        //     return;
        //   }

        //   setFieldValue(`details.${index}.goods_id`, item.id);
        //   const updatedFilteredData = filteredData[index]?.map(
        //     (filteredItem) => ({
        //       ...filteredItem,
        //       isSelected: filteredItem.id === item.id,
        //     })
        //   );

        //   setFilteredData((prev) => ({
        //     ...prev,
        //     [index]: updatedFilteredData,
        //   }));
        // };

        const handleAddDetail = () => {
          const newDetail = {
            material_status: "",
            category: "",
            material_category: "",
            raw_material_code: "",
            raw_material_name: "",
            raw_material_id: null,
          };

          setFieldValue("details", [...values.details, newDetail]);
        };

        return (
          <Form className="w-full">
            <FormContainer className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <FormItem
                  label="Nama Bahan Baku"
                  invalid={
                    touched.raw_material_name && errors.raw_material_name
                  }
                  errorMessage={errors.raw_material_name}
                >
                  <Field
                    type="text"
                    name="raw_material_name"
                    placeholder="Masukan nama bahan baku"
                    component={Input}
                    uppercase={false}
                  />
                </FormItem>

                <FormItem
                  label="Tipe Bahan Baku"
                  invalid={
                    touched.raw_material_type && errors.raw_material_type
                  }
                  errorMessage={errors.raw_material_type}
                >
                  <Select
                    placeholder="Pilih tipe bahan baku"
                    name="raw_material_type"
                    options={rawMaterialTypeOptions}
                    onChange={(value) => {
                      setFieldValue("raw_material_type", value.label);
                    }}
                  />
                </FormItem>
              </div>
              {values?.details?.map((detail, index) => (
                <>
                  <div
                    className={`p-4 border border-gray-200 rounded-lg ${
                      index > 0 ? "mt-4" : ""
                    }`}
                  >
                    <h3 className="text-lg font-medium mb-2 py-2">
                      Kategori Bahan {index + 1}
                    </h3>
                    <div key={index} className="grid grid-cols-2">
                      <FormItem
                        label="Kategori"
                        invalid={
                          touched?.[index]?.category &&
                          errors?.[index]?.category
                        }
                        errorMessage={errors?.[index]?.category}
                        className="pr-6"
                      >
                        <Select
                          placeholder="Pilih kategori"
                          name={`details.${index}.category`}
                          options={rawMaterialCategoryOptions}
                          onChange={(value) => {
                            setFieldValue(
                              `details.${index}.category`,
                              value.label
                            );
                          }}
                        />
                      </FormItem>
                      <FormItem
                        className="w-full pt-2 "
                        label="Material"
                        invalid={
                          errors.material_status && touched.material_status
                        }
                        errorMessage={errors.material_status}
                      >
                        <Field
                          name={`details.${index}.material_status`}
                          component={Radio.Group}
                          className="w-full flex gap-4"
                          onChange={(value) =>
                            setFieldValue(
                              `details.${index}.material_status`,
                              value
                            )
                          }
                          value={values.material_status}
                        >
                          <Radio value="Baru">Baru</Radio>
                          <Radio disabled value="Tersedia">
                            Tersedia
                          </Radio>
                        </Field>
                      </FormItem>
                      <FormItem
                        className="w-full"
                        label="Jenis Bahan"
                        invalid={
                          errors.material_category && touched.material_category
                        }
                        errorMessage={errors.material_category}
                      >
                        <Field
                          name={`details.${index}.material_category`}
                          component={Radio.Group}
                          className="w-full"
                          onChange={(value) =>
                            setFieldValue(
                              `details.${index}.material_category`,
                              value
                            )
                          }
                          value={values.material_category}
                        >
                          <Radio value="Non Ekstraksi">Non Ekstraksi</Radio>
                          <Radio value="Bahan Ekstraksi">Bahan Ekstraksi</Radio>
                        </Field>
                      </FormItem>
                    </div>
                    <div className="pt-4">
                      <div className="border rounded-lg px-6 ">
                        <div className="flex flex-col">
                          <h3 className="text-lg font-medium mb-2 py-2">
                            Bahan {index + 1}
                          </h3>
                          <div className="grid grid-cols-2 gap-2 py-2">
                            <FormItem
                              label="Kode Barang"
                              invalid={
                                touched.details?.[index]?.raw_material_code &&
                                errors.details?.[index]?.raw_material_code
                              }
                              errorMessage={
                                errors.details?.[index]?.raw_material_code
                              }
                            >
                              <Field
                                type="text"
                                name={`details.${index}.raw_material_code`}
                                placeholder="Masukan kode barang"
                                component={Input}
                                uppercase={false}
                              />
                            </FormItem>
                            <FormItem
                              label="Nama Material"
                              invalid={
                                touched.details?.[index]?.raw_material_name &&
                                errors.details?.[index]?.raw_material_name
                              }
                              errorMessage={
                                errors.details?.[index]?.raw_material_name
                              }
                            >
                              <Field
                                type="text"
                                name={`details.${index}.raw_material_name`}
                                placeholder="Masukan nama bahan baku"
                                component={Input}
                                uppercase={false}
                              />
                            </FormItem>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}

              <div className="pt-4">
                <Button
                  size="sm"
                  className="w-[135px] text-xs"
                  type="button"
                  onClick={handleAddDetail}
                  icon={<FiPlus />}
                >
                  Tambah
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
              title={"Ajukan Riset Bahan dan Vendor?"}
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

export default FormAddRisetBahanDanVendor;
