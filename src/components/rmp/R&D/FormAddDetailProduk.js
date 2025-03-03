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
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ListAddDetailProduk from "./ListAddDetailProduk";
import { FiPlus, FiTrash } from "react-icons/fi";
import { useState, useEffect, useMemo, forwardRef } from "react";
import { useSelector } from "react-redux";
import useCreateRndReq from "utils/hooks/Rnd/useCreateRndReq";
import TextBlockSkeleton from "components/shared/loaders/TextBlockSkeleton";

const validationSchema = Yup.object().shape({
  name: Yup.array()
    .of(Yup.string().required("Nama harus diisi"))
    .min(1, "Minimal satu nama harus diisi"),
  manufacturer: Yup.string().required("Produsen harus diisi"),
  manufacturerLainnya: Yup.string().when("manufacturer", {
    is: (value) => value === "Lainnya",
    then: Yup.string().required("Produsen harus diisi"),
  }),
  registrant: Yup.string().required("Pendaftar harus diisi"),
  registrantLainnya: Yup.string().when("registrant", {
    is: (value) => value === "Lainnya",
    then: Yup.string().required("Pendaftar harus diisi"),
  }),
});

const FormAddDetailProduk = forwardRef(
  ({ isLoading, onSubmit, formRef }, ref) => {
    const { getRndProductDetails, dataDetailProduct } = useCreateRndReq();
    const { rndRequestId } = useSelector((state) => state.rnd);
    const [isLoadingDetail, setIsLoadingDetail] = useState(false);
    const radioBtnValues = ["Royal", "Fahrenheit", "Yarindo"];

    useEffect(() => {
      const fetchDetail = async () => {
        try {
          setIsLoadingDetail(true);
          await getRndProductDetails({ rnd_request_id: rndRequestId });
          setIsLoadingDetail(false);
        } catch (error) {
          console.log(error);
          setIsLoadingDetail(false);
        }
      };
      if (rndRequestId) fetchDetail();
    }, [rndRequestId]);

    const defaultValues = useMemo(() => {
      if (dataDetailProduct) {
        const parsedNames = dataDetailProduct?.name
          ? JSON.parse(dataDetailProduct.name)
          : [""];

        // Determine the correct manufacturer value for radio buttons
        const manufacturer = radioBtnValues.includes(
          dataDetailProduct?.manufacturer
        )
          ? dataDetailProduct.manufacturer
          : dataDetailProduct?.manufacturer
          ? "Lainnya"
          : "";

        // Determine the correct registrant value for radio buttons
        const registrant = radioBtnValues.includes(
          dataDetailProduct?.registrant
        )
          ? dataDetailProduct.registrant
          : dataDetailProduct?.registrant
          ? "Lainnya"
          : "";

        return {
          name: parsedNames,
          manufacturer: manufacturer,
          manufacturerLainnya: !radioBtnValues.includes(
            dataDetailProduct?.manufacturer
          )
            ? dataDetailProduct?.manufacturer || ""
            : "",
          registrant: registrant,
          registrantLainnya: !radioBtnValues.includes(
            dataDetailProduct?.registrant
          )
            ? dataDetailProduct?.registrant || ""
            : "",
        };
      }
      return {
        name: [""],
        manufacturer: "",
        manufacturerLainnya: "",
        registrant: "",
        registrantLainnya: "",
      };
    }, [dataDetailProduct, radioBtnValues]);

    return (
      <Formik
        initialValues={defaultValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        innerRef={ref}
        enableReinitialize={true}
      >
        {({ setFieldValue, values, errors, touched }) => (
          <Form>
            {isLoadingDetail ? (
              <TextBlockSkeleton />
            ) : (
              <FormContainer className="mt-10">
                <div className="border border-gray-300 rounded-md p-4">
                  <FormItem
                    key={0}
                    className="col-span-4 w-full mb-4"
                    label="Nama 1"
                    invalid={errors.name?.[0] && touched.name?.[0]}
                    errorMessage={errors.name?.[0]}
                  >
                    <div className="flex items-center">
                      <Field
                        type="text"
                        name="name.0"
                        placeholder="Nilai"
                        component={Input}
                      />
                    </div>
                  </FormItem>

                  {/* Render additional fields if they exist */}
                  {values.name?.slice(1).map((nameValue, index) => (
                    <FormItem
                      key={index + 1}
                      className="col-span-4 w-full mb-4"
                      label={`Nama ${index + 2}`}
                      invalid={
                        errors.name?.[index + 1] && touched.name?.[index + 1]
                      }
                      errorMessage={errors.name?.[index + 1]}
                    >
                      <div className="flex items-center">
                        <Field
                          type="text"
                          name={`name.${index + 1}`}
                          placeholder="Nilai"
                          component={Input}
                        />
                        <button
                          type="button"
                          className="ml-2 text-red-500 hover:text-red-700"
                          onClick={() => {
                            const newNames = values.name.filter(
                              (_, i) => i !== index + 1
                            );
                            setFieldValue("name", newNames);
                          }}
                          aria-label="Delete"
                        >
                          <FiTrash size={24} color="red" />
                        </button>
                      </div>
                    </FormItem>
                  ))}

                  <Button
                    type="button"
                    onClick={() => setFieldValue("name", [...values.name, ""])}
                  >
                    <span className="gap-2 flex items-center">
                      <FiPlus />
                      Tambah Nama
                    </span>
                  </Button>
                </div>
                <ListAddDetailProduk />
                <FormItem
                  className="col-span-4 w-full"
                  label={
                    <span className="text-xl font-semibold text-indigo-900">
                      Registrant
                    </span>
                  }
                  invalid={errors.registrant && touched.registrant}
                  errorMessage={errors.registrant}
                >
                  <Radio.Group
                    name="registrant"
                    onChange={(value) => {
                      setFieldValue("registrant", value);
                      if (value !== "Lainnya") {
                        setFieldValue("registrantLainnya", "");
                      }
                    }}
                    value={values.registrant}
                  >
                    <Radio value="Royal">Royal</Radio>
                    <Radio value="Fahrenheit">Fahrenheit</Radio>
                    <Radio value="Yarindo">Yarindo</Radio>
                    <Radio value="Lainnya">
                      Lainnya
                      <Field
                        disabled={values.registrant !== "Lainnya"}
                        type="text"
                        name="registrantLainnya"
                        component={Input}
                        className="ml-4 w-48"
                      />
                    </Radio>
                  </Radio.Group>
                </FormItem>

                <FormItem
                  className="col-span-4 w-full "
                  label={
                    <span className="text-xl font-semibold text-indigo-900">
                      Produsen
                    </span>
                  }
                  invalid={errors.manufacturer && touched.manufacturer}
                  errorMessage={errors.manufacturer}
                >
                  <Radio.Group
                    name="manufacturer"
                    onChange={(value) => {
                      setFieldValue("manufacturer", value);
                      if (value !== "Lainnya") {
                        setFieldValue("manufacturerLainnya", "");
                      }
                    }}
                    value={values.manufacturer}
                  >
                    <Radio value="Royal">Royal</Radio>
                    <Radio value="Fahrenheit">Fahrenheit</Radio>
                    <Radio value="Yarindo">Yarindo</Radio>
                    <Radio value="Lainnya">
                      Lainnya
                      <Field
                        disabled={values.manufacturer !== "Lainnya"}
                        type="text"
                        name="manufacturerLainnya"
                        component={Input}
                        className="ml-4 w-48"
                      />
                    </Radio>
                  </Radio.Group>
                </FormItem>
              </FormContainer>
            )}
          </Form>
        )}
      </Formik>
    );
  }
);

export default FormAddDetailProduk;
