import { Formik, Form, Field } from "formik";
import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import useGoodsCategory from "utils/hooks/useGoodsCategory";
import useMasterGoods from "utils/hooks/useMasterGoods";
import { Input, Button, FormItem, FormContainer, Alert } from "components/ui";
import Select from "react-select";
import * as Yup from "yup";
import CustomTable from "components/custom/CustomTable";
import InputModal from "components/custom/ModalInput";
import SearchBar from "components/custom/SearchBar";
import useUser from "utils/hooks/useUser";
import useColumns from "utils/hooks/PurchaseRequest/useColumn";
import useMeasurement from "utils/hooks/useMeasurement";
import { useSelector } from "react-redux";

const FormPurchaseReq = forwardRef(
  ({ setFormData, initialData, isEdit }, ref) => {
    const navigate = useNavigate();
    const formikRef = useRef(null);
    const { getGoodsCategory, dataGoodsCategory } = useGoodsCategory();
    const { getGoods, dataMasterGoods } = useMasterGoods();
    const [tableData, setTableData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [id, setId] = useState(null);
    const { userRole } = useUser();
    const { columnsItemPurchase } = useColumns(setIsOpen, setId);
    const role = userRole[0];
    const { measurementUnits, getMeasurementUnits } = useMeasurement();
    const { goodsType } = useSelector((state) => state.goodsType);

    const initialValues = {
      request_date: "",
      buyer: "",
      total_items: null,
      notes: "",
      created_by: "",
      items: [
        {
          goods_id: null,
          quantity: null,
          measurement: "",
        },
      ],
    };

    const validationSchema = Yup.object().shape({
      buyer: Yup.number()
        .min(1, "Please select at least one buyer")
        .required("Please select a vendor"),
      //   total_items: Yup.number()
      //     .required("Please select a vendor type"),
      //   created_by: Yup.string().required("Please enter the created by"),
      //   items: Yup.array()
      //     .min(1, "Please select at least one category")
      //     .required("Please select a category"),
      //   quantity: Yup.number().required("Please enter the quantity"),
      // notes: Yup.string().required("Please enter the notes"),
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

    useEffect(() => {
      getGoodsCategory({ all: true });
    }, []);
    useEffect(() => {
      getGoods({ all: true });
    }, []);
    useEffect(() => {
      getMeasurementUnits();
    }, []);

    const handleAddItem = (item) => {
      const transformedItem = {
        goods_id: item.goods.value,
        goods_name: item.goods.label,
        goods_category: item.goods_category.label,
        quantity: item.quantity,
        measurement: item.measurement,
      };
      setTableData([...tableData, transformedItem]);
      setIsOpen(false);
    };

    console.log(tableData);

    const handleSubmit = (values, { setSubmitting }) => {
      try {
        const mappedItems = tableData.map((item) => ({
          goods_id: item.goods_id,
          quantity: Number(item.quantity),
          measurement_id: item.measurement.value,
        }));
        const payload = {
          //   buyer: values.buyer,
          request_type: goodsType,
          total_items: tableData.length,
          //   notes: values.notes,
          created_by: role,
          items: mappedItems,
        };
        console.log("Payload created:", payload);

        if (setFormData) {
          console.log("Calling setFormData with payload");
          setFormData(payload);
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
            initialValues={initialValues}
            // validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnMount
          >
            {({ errors, touched, setFieldValue, isSubmitting, values }) => (
              <Form className="space-y-6">
                <FormContainer>
                  {/* <FormItem
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
                       options={dataGoodsCategory.map((category) => ({
                         value: category.id,
                         label: category.name,
                       }))}
                       value={values.goods_category?.map((category) => ({
                           value: category,
                           label: category,
                       }))}
                      placeholder="Pilih "
                    />
                  </FormItem> */}

                  {/* <FormItem
                    label={
                      <span>
                        Alasan Pembelian <span>*</span>
                      </span>
                    }
                    invalid={errors.reason && touched.reason}
                    errorMessage={errors.reason}
                  >
                    <Select
                      name="reason"
                      //   options={vendorTypeOptions.map((type) => ({
                      //     value: type.value,
                      //     label: type.label,
                      //   }))}
                      //   value={
                      //     values.vendor_type
                      //       ? {
                      //           value: values.vendor_type,
                      //           label: capitalize(values.vendor_type),
                      //         }
                      //       : null
                      //   }
                      placeholder="Select Vendor Type"
                    />
                  </FormItem> */}

                  <FormItem
                    label={<span>Catatatan Pembelian (opsional) </span>}
                    invalid={errors.notes && touched.notes}
                    errorMessage={errors.notes}
                  >
                    <Field
                      as="textarea"
                      rows="4"
                      name="notes"
                      placeholder="Catatan pembelian"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </FormItem>
                </FormContainer>
              </Form>
            )}
          </Formik>

          <div className="mt-10">
            <div className="flex justify-between my-4">
              <SearchBar placeholder="cari barang" />
              <Button
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                Tambah Barang
              </Button>
            </div>
            <CustomTable data={tableData} columns={columnsItemPurchase()} />
          </div>
          <InputModal
            title={"Tambah Barang"}
            inputFields={inputFields}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            dataGoodsCategory={dataGoodsCategory}
            dataMasterGoods={dataMasterGoods}
            measurementUnits={measurementUnits}
            onSave={handleAddItem}
          />
        </div>
      </>
    );
  }
);

export default FormPurchaseReq;
