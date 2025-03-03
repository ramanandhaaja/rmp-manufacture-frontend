import {
  Radio,
  DatePicker,
  Input,
  FormItem,
  FormContainer,
} from "components/ui";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { forwardRef, useMemo, useState, useEffect } from "react";
import TextBlockSkeleton from "components/shared/loaders/TextBlockSkeleton";
import { parseDate } from "utils/helpers";
import { useSelector } from "react-redux";
import useCreateRndReq from "utils/hooks/Rnd/useCreateRndReq";
import dayjs from "dayjs";

const ProductDetailSchema = Yup.object().shape({
  title: Yup.string().required("Judul Permintaan diperlukan"),
  development_type: Yup.string().required("Tipe Pengembangan diperlukan"),
  launching_date: Yup.date().required("Target Launching diperlukan"),
  description: Yup.string().required("Deskripsi diperlukan"),
  category: Yup.string().required("Kategori Produk diperlukan"),
  priority: Yup.string().required("Prioritas diperlukan"),
});

const FormDetailPermintaan = forwardRef(({ isLoading, onSubmit }, ref) => {
  const { rndRequestId } = useSelector((state) => state.rnd);
  const { getDetailRndRequest, dataDetailRndRequest } = useCreateRndReq();
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setIsLoadingDetail(true);
        await getDetailRndRequest(rndRequestId);
        setIsLoadingDetail(false);
      } catch (error) {
        console.log(error);
        setIsLoadingDetail(false);
      }
    };
    if (rndRequestId) fetchDetail();
  }, [rndRequestId]);

  const defaultValues = useMemo(() => {
    if (dataDetailRndRequest) {
      return {
        title: dataDetailRndRequest?.title,
        development_type: dataDetailRndRequest?.development_type,
        launching_date: dataDetailRndRequest?.launching_date
          ? dayjs(dataDetailRndRequest.launching_date)
          : null,
        description: dataDetailRndRequest?.description,
        category: dataDetailRndRequest?.category,
        priority: dataDetailRndRequest?.priority,
      };
    }
    return {
      title: "",
      development_type: "",
      launching_date: null,
      description: "",
      category: "",
      priority: "",
    };
  }, [dataDetailRndRequest]);

  return (
    <div className="flex justify-between px-4">
      <div className="py-3 w-full">
        <h2 className="text-xl font-semibold text-indigo-900 mt-4 mb-4">
          Detail Produk
        </h2>
        <div className="space-y-6 mb-8">
          {isLoadingDetail ? (
            <TextBlockSkeleton />
          ) : (
            <Formik
              initialValues={defaultValues}
              validationSchema={ProductDetailSchema}
              onSubmit={onSubmit}
              innerRef={ref}
              enableReinitialize={true}
            >
              {({ errors, touched, setFieldValue, values }) => (
                <Form className="w-full">
                  <FormContainer>
                    <div className="grid grid-cols-4 gap-2 w-full">
                      <FormItem
                        className="col-span-4 w-full"
                        label="Judul Permintaan*"
                        invalid={errors.title && touched.title}
                        errorMessage={errors.title}
                      >
                        <Field
                          type="text"
                          name="title"
                          placeholder="Masukan Judul Permintaan"
                          component={Input}
                          className="w-full"
                          uppercase={false}
                        />
                      </FormItem>
                      <FormItem
                        className="col-span-4 w-full"
                        label="Tipe Pengembangan*"
                        invalid={
                          errors.development_type && touched.development_type
                        }
                        errorMessage={errors.development_type}
                      >
                        <Field
                          name="development_type"
                          component={Radio.Group}
                          className="w-full"
                          value={dataDetailRndRequest?.development_type}
                          onChange={(value) =>
                            setFieldValue("development_type", value)
                          }
                        >
                          <Radio value="Produk Baru">Produk Baru</Radio>
                          <Radio value="Produk Lama">Produk Lama</Radio>
                        </Field>
                      </FormItem>

                      <FormItem
                        className="col-span-4 w-full"
                        label="Target Launching*"
                        invalid={
                          errors.launching_date && touched.launching_date
                        }
                        errorMessage={errors.launching_date}
                      >
                        <Field
                          name="launching_date"
                          placeholder="Select Target Launch Date"
                          component={DatePicker}
                          className="w-full"
                          onChange={(date) => {
                            setFieldValue("launching_date", parseDate(date));
                          }}
                          defaultValue={
                            dataDetailRndRequest?.launching_date
                              ? parseDate(dataDetailRndRequest.launching_date)
                              : null
                          }
                          value={
                            values.launching_date
                              ? new Date(values.launching_date)
                              : null
                          }
                          inputFormat="DD/MM/YYYY"
                          type="date"
                        />
                      </FormItem>
                      <FormItem
                        className="col-span-4 w-full"
                        label="Deskripsi Produk*"
                        invalid={errors.description && touched.description}
                        errorMessage={errors.description}
                      >
                        <Field name="description">
                          {({ field }) => (
                            <Input
                              {...field}
                              textArea
                              rows={4}
                              className="w-full"
                            />
                          )}
                        </Field>
                      </FormItem>
                      <FormItem
                        className="col-span-4 w-full"
                        label="Kategori Produk*"
                        invalid={errors.category && touched.category}
                        errorMessage={errors.category}
                      >
                        <Field
                          name="category"
                          component={Radio.Group}
                          className="w-full"
                          onChange={(value) => setFieldValue("category", value)}
                          value={values.category}
                        >
                          <Radio value="Obat Bahan Alam">Obat Bahan Alam</Radio>
                          <Radio value="Suplemen Kesehatan">
                            Suplemen Kesehatan
                          </Radio>
                          <Radio value="Kosmetik">Kosmetik</Radio>
                        </Field>
                      </FormItem>
                      <FormItem
                        className="col-span-4 w-full"
                        label="Prioritas Produk*"
                        invalid={errors.priority && touched.priority}
                        errorMessage={errors.priority}
                      >
                        <Field
                          name="priority"
                          component={Radio.Group}
                          className="w-full"
                          onChange={(value) => setFieldValue("priority", value)}
                          value={values.priority}
                        >
                          <Radio value="Tinggi">Tinggi</Radio>
                          <Radio value="Sedang">Sedang</Radio>
                          <Radio value="Rendah">Rendah</Radio>
                        </Field>
                      </FormItem>
                    </div>
                  </FormContainer>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </div>
  );
});

export default FormDetailPermintaan;
