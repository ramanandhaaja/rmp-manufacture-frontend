import { Formik, Form, Field } from "formik";
import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGoodsCategory from "utils/hooks/useGoodsCategory";
import useMasterGoods from "utils/hooks/useMasterGoods";
import { Input, Button, FormItem, FormContainer, Alert } from "components/ui";
import Select from "react-select";
import { FiPlus } from "react-icons/fi";
import * as Yup from "yup";
import CustomTable from "components/custom/CustomTable";
import InputModal from "components/custom/ModalInput";
import SearchBar from "components/custom/SearchBar";
import useUser from "utils/hooks/useUser";
import useColumns from "utils/hooks/PurchaseRequest/useColumn";
import useMeasurement from "utils/hooks/useMeasurement";
import { useSelector } from "react-redux";
import ConfirmationCustom from "components/custom/ConfirmationCustom";

const FormPurchaseReq = forwardRef(
  ({ setFormData, initialData, isEdit }, ref) => {
    const formikRef = useRef(null);
    const { getGoodsCategory, dataGoodsCategory } = useGoodsCategory();
    const { getGoods, dataMasterGoods } = useMasterGoods();
    const [tableData, setTableData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [id, setId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { user, userRole } = useUser();
    const [editingItem, setEditingItem] = useState(null);
    const { columnsItemPurchase } = useColumns(
      setIsOpen,
      null,
      setIsOpenDelete,
      setId,
      setEditingItem
    );
    const userName = user.name;
    const { measurementUnits, getMeasurementUnits } = useMeasurement();
    const { goodsType } = useSelector((state) => state.goodsType);
    const isPpic = userRole.includes("ppic");
    const initialValues = {
      request_date: "",
      buyer: "",
      total_items: null,
      purchase_reason: "",
      purchase_reason_detail: "",
      notes: "",
      created_by: "",
      items: [
        {
          goods_id: null,
          quantity: null,
          measurement: null,
        },
      ],
    };

    const validationSchema = Yup.object().shape({
      buyer: Yup.string()
        .nullable()
        .when([], {
          is: () => isPpic,
          then: Yup.string()
            .min(1, "Please select at least one buyer")
            .required("Please select a vendor"),
        }),
      purchase_reason: Yup.string()
        .nullable()
        .when([], {
          is: () => isPpic,
          then: Yup.string()
            .min(1, "Please select at least one reason")
            .required("Please select a reason"),
        }),
    });

    const inputFields = [
      {
        name: "goods_category",
        label: "Kategori Barang",
        type: "select",
        required: true,
        errorMessage: "Please select one",

        placeholder: "Pilih kategori barang",
      },
      {
        name: "goods",
        label: "Barang",
        type: "select",
        required: true,
        errorMessage: "Please select one",
        options: dataMasterGoods?.map((goods) => ({
          value: goods.id,
          label: goods.name,
        })),
        placeholder: "Pilih barang",
      },
      {
        name: "quantity",
        label: "Quantity",
        type: "text",
        required: true,
        errorMessage: "Please input a quantity",
        placeholder: "Masukan Quantity",
      },
      {
        name: "measurement",
        label: "UOM",
        type: "select",
        required: true,
        errorMessage: "Please input a UOM",
        options: measurementUnits?.map((unit) => ({
          value: unit.id,
          label: unit.abbreviation,
        })),
        placeholder: "Masukan UOM",
      },
    ];

    const buyerOptions = [
      { value: "Ppic", label: "Ppic" },
      { value: "Head Office", label: "Head Office" },
    ];

    const reasonOptions = [
      { value: "pembelian-pertama", label: "Pembelian Pertama" },
      { value: "restock", label: "Restock" },
      { value: "sampel", label: " Sampel" },
    ];

    useEffect(() => {
      getGoodsCategory({ all: true });
    }, []);
    useEffect(() => {
      getGoods({ all: true });
    }, []);
    useEffect(() => {
      getMeasurementUnits();
    }, []);

    useEffect(() => {
      if (isEdit) {
        if (formikRef.current && initialData) {
          formikRef.current.resetForm({
            values: initialData,
          });
          setTableData(initialData.items);
        }
      }
    }, [initialData, isEdit]);

    // Function for adding new item
    const handleAddItem = (item) => {
      const transformedItem = {
        goods_id: item.goods.value,
        goods_name: item.goods.label,
        goods_category_name: item.goods_category.label,
        quantity: item.quantity,
        measurement: item.measurement.label,
        measurement_id: item.measurement.value,
      };

      setTableData([...tableData, transformedItem]);
      setIsOpen(false);
    };

    // Function for editing existing item
    const handleEditItem = (item) => {
      console.log(item);
      const transformedItem = {
        goods_id: item.goods.value,
        goods_name: item.goods.label,
        goods_category_name: item.goods_category.label,
        quantity: item.quantity,
        measurement: item.measurement.label,
        measurement_id: item.measurement.value,
      };

      setTableData((prevData) =>
        prevData.map((tableItem) =>
          tableItem.goods_id === editingItem.goods_id
            ? transformedItem
            : tableItem
        )
      );
      setEditingItem(null);
      setIsOpen(false);
    };

    const handleSave = (item) => {
      if (editingItem) {
        handleEditItem(item);
      } else {
        handleAddItem(item);
      }
    };

    const handleDeleteItem = (id) => {
      setIsLoading(true);
      setTableData((prevData) => prevData.filter((item) => item.id !== id));
      setIsLoading(false);
    };

    const initialValuesItem = () => {
      if (editingItem) {
        return {
          goods_category_name: editingItem.goods_category_name,
          goods_name: editingItem.goods_name,
          id: editingItem.goods_id,
          measurement: editingItem.measurement,
          measurement_id: editingItem.measurement_id,
          quantity: editingItem.quantity,
        };
      }
      return null;
    };

    const handleSubmit = (values, { setSubmitting }) => {
      try {
        const mappedItems = tableData.map((item) => ({
          goods_id: item.goods_id,
          quantity: Number(item.quantity),
          measurement_id: item.measurement_id,
        }));

        const payloadCreate = {
          buyer: values.buyer,
          purchase_reason: values.purchase_reason,
          purchase_reason_detail: values.purchase_reason_detail,
          request_type: goodsType,
          notes: values.notes,
          created_by: userName,
          items: mappedItems,
        };
        const payloadEdit = {
          buyer: values.buyer,
          purchase_reason: values.purchase_reason,
          purchase_reason_detail: values.purchase_reason_detail,
          request_type: goodsType,
          notes: values.notes,
          updated_by: userName,
          items: mappedItems,
        };

        if (setFormData) {
          console.log("Calling setFormData with payload");
          if (isEdit) {
            setFormData(payloadEdit);
          } else {
            setFormData(payloadCreate);
          }
        } else {
          console.log("setFormData is not defined");
        }
      } catch (error) {
        console.error("Form submission error:", error);
      } finally {
        setSubmitting(false);
      }
    };
    useImperativeHandle(ref, () => ({
      handleSubmit: () => {
        if (formikRef.current) {
          formikRef.current.submitForm();
        } else {
          console.log("formikRef is not defined");
        }
      },
    }));

    return (
      <>
        <div className="p-4">
          <Formik
            innerRef={formikRef}
            initialValues={initialData ? initialData : initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnMount
          >
            {({ errors, touched, setFieldValue, isSubmitting, values }) => (
              <Form>
                <FormContainer>
                  {isPpic && (
                    <>
                      <FormItem
                        label={
                          <span>
                            Dibeli Oleh <span>*</span>
                          </span>
                        }
                        invalid={errors.buyer && touched.buyer}
                        errorMessage={errors.buyer}
                      >
                        <Select
                          name="buyer"
                          options={buyerOptions}
                          value={
                            values.buyer
                              ? { value: values.buyer, label: values.buyer }
                              : null
                          }
                          onChange={(selectedOption) => {
                            setFieldValue(
                              "buyer",
                              selectedOption ? selectedOption.value : ""
                            );
                          }}
                          placeholder="Pilih "
                        />
                      </FormItem>
                      <FormItem
                        label={
                          <span>
                            Alasan Pembelian <span>*</span>
                          </span>
                        }
                        invalid={
                          errors.purchase_reason && touched.purchase_reason
                        }
                        errorMessage={errors.purchase_reason}
                      >
                        <Select
                          name="purchase_reason"
                          options={reasonOptions}
                          value={
                            values.purchase_reason
                              ? {
                                  value: values.purchase_reason,
                                  label: values.purchase_reason,
                                }
                              : null
                          }
                          onChange={(selectedOption) => {
                            setFieldValue(
                              "purchase_reason",
                              selectedOption ? selectedOption.label : ""
                            );
                          }}
                          placeholder="Pilih alasan pembelian"
                        />
                      </FormItem>
                      <FormItem
                        label={
                          <span>Catatatan Alasan Pembelian (opsional)</span>
                        }
                        invalid={
                          errors.purchase_reason_detail &&
                          touched.purchase_reason_detail
                        }
                        errorMessage={errors.purchase_reason_detail}
                      >
                        <Field
                          as="textarea"
                          rows="4"
                          name="purchase_reason_detail"
                          value={values.purchase_reason_detail || ""}
                          placeholder="Tulis catatan alasan pembelian"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </FormItem>
                    </>
                  )}

                  <div className="py-6">
                    <div className="flex justify-between my-4">
                      <SearchBar placeholder="cari barang" />
                      <Button type="button" onClick={() => setIsOpen(true)}>
                        <span className="gap-2 flex items-center">
                          <FiPlus />
                          Tambah Barang
                        </span>
                      </Button>
                    </div>
                    <CustomTable
                      data={tableData}
                      columns={columnsItemPurchase()}
                    />
                  </div>

                  <FormItem
                    className="mt-4"
                    label={<span>Catatatan Pembelian (opsional)</span>}
                    invalid={errors.notes && touched.notes}
                    errorMessage={errors.notes}
                  >
                    <Field
                      as="textarea"
                      rows="4"
                      name="notes"
                      placeholder="Catatan pembelian"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={values.notes || ""}
                    />
                  </FormItem>
                </FormContainer>
              </Form>
            )}
          </Formik>
          <InputModal
            title={editingItem ? "Edit Barang" : "Tambah Barang"}
            inputFields={inputFields}
            isOpen={isOpen}
            onClose={() => {
              setIsOpen(false);
              setEditingItem(null);
            }}
            dataGoodsCategory={dataGoodsCategory}
            dataMasterGoods={dataMasterGoods}
            measurementUnits={measurementUnits}
            onSave={handleSave}
            defaultValues={initialValuesItem()}
            isEdit={isEdit}
          />
          <ConfirmationCustom
            isOpen={isOpenDelete}
            onClose={() => setIsOpenDelete(false)}
            showCancelBtn
            showSubmitBtn
            onConfirm={() => {
              handleDeleteItem(id, setIsOpenDelete(false));
            }}
            confirmText="Konfirmasi"
            title="Anda yakin ingin menghapus item ini?"
            titleClass="mt-5 mb-3 text-main-100 text-xl font-bold"
            text="Klik Konfirmasi untuk melanjutkan"
            textClass="text-slate-500 text-base"
            isLoading={isLoading}
            disableCancel={false}
            buttonType="button"
            width={500}
            contentClassName="p-5 rounded-2xl"
          />
        </div>
      </>
    );
  }
);

export default FormPurchaseReq;
