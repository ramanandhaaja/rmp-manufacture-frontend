import { Formik, Form, Field } from "formik";
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

function FormAddLaporan() {
  return (
    <Formik>
      {({ values, errors, touched, setFieldValue, isValid, submitForm }) => (
        <Form className="w-full">
          <FormContainer>
            <FormItem label="Tanggal Pelaksanaan">
              <Field
                placeholder="Pilih tanggal"
                name="date"
                component={DatePicker}
                inputFormat="DD/MM/YYYY"
              />
            </FormItem>
            <h3 className="text-lg font-medium mb-2 py-2">Trial</h3>
            <div className="grid grid-cols-2 gap-6">
              <FormItem label="Komposisi Bahan Pengemasan">
                <Field
                  type="text"
                  name="nama_bahan_kemas"
                  placeholder="Masukan nama bahan kemas"
                  component={Input}
                  uppercase={false}
                />
              </FormItem>
              <FormItem label="Ukuran Bahan Pengemasan">
                <Field
                  type="text"
                  name="nama_bahan_kemas"
                  placeholder="Masukan nama bahan kemas"
                  component={Input}
                  uppercase={false}
                />
              </FormItem>
            </div>
            <h3 className="text-lg font-medium mb-2 py-2">
              Bulk Atau Produk yang digunakan
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <FormItem label="Bentuk">
                <Field
                  type="text"
                  name="nama_bahan_kemas"
                  placeholder="Masukan nama bahan kemas"
                  component={Input}
                  uppercase={false}
                />
              </FormItem>
              <FormItem label="Ukuran">
                <Field
                  type="text"
                  name="nama_bahan_kemas"
                  placeholder="Masukan nama bahan kemas"
                  component={Input}
                  uppercase={false}
                />
              </FormItem>
            </div>
            <h3 className="text-lg font-medium mb-2 py-2">Mesin </h3>
            <div className="grid grid-cols-2 gap-6">
              <FormItem label="Bentuk">
                <Select
                  options={[
                    { value: "option1", label: "Option 1" },
                    { value: "option2", label: "Option 2" },
                  ]}
                />
              </FormItem>
              <FormItem label="Change Part">
                <Field
                  type="text"
                  name="nama_bahan_kemas"
                  placeholder="Masukan nama bahan kemas"
                  component={Input}
                  uppercase={false}
                />
              </FormItem>
            </div>
            <FormItem label="Setting Mesin">
              <Input
                textArea
                name="prosedur"
                placeholder="Masukan setting mesin"
                uppercase={false}
              />
            </FormItem>
            <h3 className="text-lg font-medium mb-2 py-2">Dokumen Pendukung</h3>
            <Upload buttonText="Unggah" />
            <h3 className="text-lg font-medium py-2">Proses Primer</h3>
            <div className="border rounded-lg p-6 mb-2">
              <div className="grid grid-cols-2 gap-5">
                <FormItem label="Proses">
                  <Select
                    options={[
                      { value: "option1", label: "Option 1" },
                      { value: "option2", label: "Option 2" },
                    ]}
                  />
                </FormItem>
                <FormItem label="Kelancaran Proses" className=" w-full">
                  <Field
                    name="kelancaran_proses"
                    component={Radio.Group}
                    className="w-full pt-2"
                  >
                    <Radio value="Lancar" className="mr-2">
                      Lancar
                    </Radio>
                    <Radio value="Tidak">Tidak</Radio>
                  </Field>
                </FormItem>
              </div>
              <FormItem label="Keterangan">
                <Input
                  textArea
                  name="keterangan"
                  placeholder="Masukan keterangan"
                  uppercase={false}
                />
              </FormItem>
              <div className="pt-4">
                <Button
                  size="sm"
                  className="w-[135px] text-xs"
                  type="button"
                  onClick={() =>
                    setFieldValue("costs", [
                      ...values.costs,
                      { cost_name: "", cost_value: "" },
                    ])
                  }
                  icon={<FiPlus />}
                >
                  Tambah Proses
                </Button>
              </div>
            </div>

            <h3 className="text-lg font-medium py-2">Proses Sekunder</h3>
            <div className="border rounded-lg p-6">
              <div className="grid grid-cols-2 gap-5">
                <FormItem label="Proses">
                  <Select
                    options={[
                      { value: "option1", label: "Option 1" },
                      { value: "option2", label: "Option 2" },
                    ]}
                  />
                </FormItem>
                <FormItem label="Kelancaran Proses" className=" w-full">
                  <Field
                    name="kelancaran_proses"
                    component={Radio.Group}
                    className="w-full pt-2"
                  >
                    <Radio value="Lancar" className="mr-2">
                      Lancar
                    </Radio>
                    <Radio value="Tidak">Tidak</Radio>
                  </Field>
                </FormItem>
              </div>
              <FormItem label="Keterangan">
                <Input
                  textArea
                  name="keterangan"
                  placeholder="Masukan keterangan"
                  uppercase={false}
                />
              </FormItem>
              <div className="pt-4">
                <Button
                  size="sm"
                  className="w-[135px] text-xs"
                  type="button"
                  onClick={() =>
                    setFieldValue("costs", [
                      ...values.costs,
                      { cost_name: "", cost_value: "" },
                    ])
                  }
                  icon={<FiPlus />}
                >
                  Tambah Proses
                </Button>
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-2">
              <Button type="submit">Batal</Button>

              <Button variant="solid" type="submit">
                Ajukan
              </Button>
            </div>
          </FormContainer>
        </Form>
      )}
    </Formik>
  );
}

export default FormAddLaporan;
