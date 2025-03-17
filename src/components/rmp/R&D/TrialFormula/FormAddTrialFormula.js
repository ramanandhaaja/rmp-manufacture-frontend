import { Formik, Form, Field } from "formik";
import {
  Notification,
  Alert,
  toast,
  Button,
  Radio,
  DatePicker,
  Input,
  FormItem,
  FormContainer,
  Upload,
} from "components/ui";
import CustomTable from "components/custom/CustomTable";
import SearchBar from "components/custom/SearchBar";
import { FiPlus, FiTrash } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ModalInputBahan from "./ModalInputBahan";
import * as Yup from "yup";
import { formatDate } from "utils/helpers";
import useProcessRnd from "utils/hooks/Rnd/useProcessRnd";
import ConfirmationCustom from "components/custom/ConfirmationCustom";
import { useSelector } from "react-redux";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Nama Trial is required"),
  trial_date: Yup.date().required("Tanggal Pelaksanaan is required"),
  procedure: Yup.string().required("Prosedur is required"),
});

function FormAddTrialFormula() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedBahan, setSelectedBahan] = useState(null);
  const [dataTable, setDataTable] = useState([]);
  const { postTrialFormula } = useProcessRnd();
  const { rndRequestId } = useSelector((state) => state.rnd);

  const columns = [
    { Header: "Id", accessor: "id_bahan" },
    { Header: "Nama Bahan", accessor: "name_bahan" },
    { Header: "Kode", accessor: "code" },
    { Header: "Kategori", accessor: "category" },
    { Header: "Vendor", accessor: "vendor_name" },
    {
      Header: "Aksi",
      accessor: "action",
      Cell: ({ row }) => (
        <Button
          variant="plain"
          onClick={() => handleRemoveBahan(row.original.id_bahan)}
        >
          <FiTrash size={18} color="red" />
        </Button>
      ),
    },
  ];

  const initialValues = {
    name: "",
    trial_date: "",
    procedure: "",
  };

  const handleBahanSelect = (data) => {
    setSelectedBahan(data);
  };

  const handleAddBahan = (item) => {
    // Check if item already exists in table
    const isDuplicate = dataTable.some(
      (row) => row.id_bahan === selectedBahan?.bahan.value
    );

    if (isDuplicate) {
      toast.push(
        <Notification type="warning" title="Item sudah dipilih!" closable />,
        {
          placement: "top-center",
          width: 700,
        }
      );
      return;
    }

    setDataTable((prevData) => [
      ...prevData,
      {
        id_bahan: selectedBahan?.bahan.value,
        name_bahan: selectedBahan?.bahan.label,
        code: selectedBahan?.bahan.kode,
        category: selectedBahan?.bahan.category,
        vendor_name: selectedBahan?.vendor.label,
        vendor_id: selectedBahan?.vendor.value,
      },
    ]);

    setIsOpen(false);
  };

  console.log(dataTable);

  const handleRemoveBahan = (id_bahan) => {
    setDataTable((prevData) =>
      prevData.filter((item) => item.id_bahan !== id_bahan)
    );
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      const payload = {
        rnd_request_id: rndRequestId,
        name: values.name,
        trial_date: parseDateForMySQL(values.trial_date),
        procedure: values.procedure,
        details: dataTable.map((item) => ({
          raw_material_id: item.id_bahan,
          vendor_id: item.vendor_id,
        })),
      };

      const resp = await postTrialFormula(payload);
      if (resp?.status === "success") {
        toast.push(
          <Notification
            type="success"
            title="Berhasil menambahkan data!"
            closable
          />,
          {
            placement: "top-center",
            width: 700,
          }
        );
        setTimeout(() => {
          navigate(-1);
        }, 1000);
      } else {
        toast.push(
          <Notification
            type="danger"
            title="Terjadi kesalahan, gagal menambahkan data!"
            closable
          />,
          {
            placement: "top-center",
            width: 700,
          }
        );
      }
    } catch (error) {
      toast.push(
        <Notification
          type="danger"
          title="Terjadi kesalahan, gagal menambahkan data!"
        />,
        {
          placement: "top-center",
          width: 700,
        }
      );
    } finally {
      setIsOpenModal(false);
      setSubmitting(false);
    }
  };

  function parseDateForMySQL(inputDate) {
    try {
      // Convert input to Date object
      const date = new Date(inputDate);

      // Check if date is valid
      if (isNaN(date.getTime())) {
        return null;
      }

      // Get year, month and day
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-based
      const day = date.getDate().toString().padStart(2, "0");

      // Return in YYYY-MM-DD format for MySQL
      return `${year}-${month}-${day}`;
    } catch (error) {
      return null;
    }
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched, setFieldValue, submitForm }) => (
          <Form>
            <FormContainer className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <FormItem
                  label="Nama Trial"
                  invalid={errors.name && touched.name}
                  errorMessage={errors.name}
                >
                  <Field
                    type="text"
                    name="name"
                    component={Input}
                    placeholder="Masukkan nama trial"
                  />
                </FormItem>
                <FormItem
                  label="Tanggal Pelaksanaan"
                  invalid={errors.trial_date && touched.trial_date}
                  errorMessage={errors.trial_date}
                >
                  <Field
                    placeholder="Pilih tanggal"
                    name="trial_date"
                    component={DatePicker}
                    inputFormat="DD/MM/YYYY"
                    onChange={(date) => {
                      setFieldValue("trial_date", date);
                    }}
                  />
                </FormItem>
              </div>
              <div className=" border border-gray-200 rounded">
                <div className="block p-4 space-y-4">
                  <h3 className="text-lg font-medium text-indigo-900">Bahan</h3>
                  <div className="flex justify-between">
                    <SearchBar placeholder="Cari bahan" />
                    <Button
                      icon={<FiPlus />}
                      type="button"
                      onClick={() => setIsOpen(true)}
                    >
                      Tambah Bahan
                    </Button>
                  </div>
                  <CustomTable columns={columns} data={dataTable} />
                  {dataTable.length === 0 && (
                    <p className="text-red-500 text-sm">
                      Minimal satu bahan dipilih
                    </p>
                  )}
                </div>
              </div>
              <FormItem
                label="Prosedur"
                invalid={errors.procedure && touched.procedure}
                errorMessage={errors.procedure}
              >
                <Field
                  as="textarea"
                  rows={4}
                  name="procedure"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </FormItem>
              <div className="pt-4 flex justify-end gap-2">
                <Button
                  type="button"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Batal
                </Button>

                <Button
                  variant="solid"
                  type="button"
                  disabled={isSubmitting || dataTable.length === 0}
                  onClick={() => {
                    setIsOpenModal(true);
                  }}
                >
                  {isSubmitting ? "Submitting..." : "Ajukan"}
                </Button>
              </div>
            </FormContainer>
            <ModalInputBahan
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              onConfirm={handleAddBahan}
              onBahanSelect={handleBahanSelect}
            />
            <ConfirmationCustom
              isOpen={isOpenModal}
              onClose={() => setIsOpenModal(false)}
              showCancelBtn
              showSubmitBtn
              onConfirm={() => {
                submitForm();
              }}
              confirmText="Konfirmasi"
              title={"Ajukan Trial Formula?"}
              titleClass="mt-5 mb-3 text-main-100 text-xl font-bold"
              text="Pastikan data yang anda masukan sudah benar"
              textClass="text-slate-500 text-base"
              isLoading={isSubmitting}
              disableCancel={false}
              buttonType="submit"
            />
          </Form>
        )}
      </Formik>
    </>
  );
}

export default FormAddTrialFormula;
