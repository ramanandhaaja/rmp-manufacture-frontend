import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Formik, Form, Field } from "formik";

import * as Yup from "yup";
import Select from "react-select";
import { Dialog } from "components/ui";
import useProcessRnd from "utils/hooks/Rnd/useProcessRnd";
import useVendor from "utils/hooks/vendorManagement/useVendor";

const ModalSearchInput = forwardRef(
  (
    {
      onBahanSelect,
      isOpen,
      onClose,
      onConfirm,
      width = 500,
      contentClassName = "p-5 rounded-2xl bg-white",
      isLoading = false,
      onSave,
    },
    ref
  ) => {
    const validationSchema = Yup.object().shape({
      raw_material_id: Yup.string().required("Raw Material is required"),
      vendor_id: Yup.string().required("Vendor is required"),
    });
    const [selectedBahan, setSelectedBahan] = useState(null);
    const [vendors, setVendors] = useState([]);
    const [rawMaterials, setRawMaterials] = useState([]);
    const { getMasterRawMaterials } = useProcessRnd();
    const { getVendors } = useVendor();
    const [isLoadingVendor, setIsLoadingVendor] = useState(false);
    const [isLoadingRawMaterial, setIsLoadingRawMaterial] = useState(false);

    const fetchRawMaterials = async () => {
      setIsLoadingRawMaterial(true);
      try {
        const response = await getMasterRawMaterials();
        setRawMaterials(response.data.data);
      } catch (error) {
        console.error("Error fetching raw materials:", error);
        return [];
      } finally {
        setIsLoadingRawMaterial(false);
      }
    };

    const fetchVendors = async () => {
      setIsLoadingVendor(true);
      try {
        const response = await getVendors();
        setVendors(response.data.data);
      } catch (error) {
        console.error("Error fetching vendors:", error);
        return [];
      } finally {
        setIsLoadingVendor(false);
      }
    };

    useEffect(() => {
      fetchRawMaterials();
      fetchVendors();
    }, []);

    const bahanOptions = rawMaterials.map((bahan) => ({
      value: bahan.id,
      label: bahan.raw_material_name,
      kode: bahan.raw_material_code,
      category: bahan.category,
    }));

    const vendorOptions = vendors.map((vendor) => ({
      value: vendor.id,
      label: vendor.name,
    }));

    const initialValues = {
      raw_material_id: "",
      vendor_id: "",
    };

    const handleSubmit = (values, { resetForm }) => {
      // Call onConfirm with the form values

      onConfirm({
        id_bahan: values.raw_material_id,
        name_bahan: selectedBahan?.label,
        code: selectedBahan?.kode,
        category: selectedBahan?.category,
        vendor_name: values.vendor_id,
        vendor_id: values.vendor_id,
      });

      // Close the modal and reset
      onClose();
      resetForm();
      clearSelectedBahan();
    };

    useImperativeHandle(ref, () => ({
      submit: (formikProps) => {
        if (formikProps) {
          formikProps.handleSubmit();
        }
      },
      getFormValues: (formikProps) => {
        if (formikProps) {
          return formikProps.values;
        }
        return {};
      },
    }));

    const clearSelectedBahan = () => {
      setSelectedBahan(null);
    };

    if (!isOpen) return null;

    return (
      <Dialog
        closable={false}
        isOpen={isOpen}
        onClose={onClose}
        onRequestClose={onClose}
        width={width}
        contentClassName={contentClassName}
      >
        <h2 className="text-xl font-medium text-gray-900 mb-2 text-center">
          Input Bahan
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit || onConfirm}
        >
          {(formikProps) => (
            <Form className="w-full ">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Bahan <span className="text-red-500">*</span>
                  </label>
                  <Select
                    isLoading={isLoadingRawMaterial}
                    options={bahanOptions}
                    placeholder="Cari bahan"
                    className="w-full"
                    // value={formikProps.values.raw_material_id}
                    onChange={(option) => {
                      formikProps.setFieldValue(
                        "raw_material_id",
                        option.value
                      );
                      const selectedData = {
                        bahan: option,
                      };
                      setSelectedBahan(option);
                      onBahanSelect(selectedData);
                    }}
                    // onBlur={() => formikProps.setFieldTouched("status", true)}
                  />
                  {formikProps.touched.raw_material_id &&
                    formikProps.errors.raw_material_id && (
                      <p className="mt-1 text-sm text-red-600">
                        {formikProps.errors.raw_material_id}
                      </p>
                    )}
                </div>
                {selectedBahan && (
                  <div className="p-4 border rounded cursor-pointer transition-colors">
                    <h3 className="text-lg font-medium pb-2">
                      {selectedBahan.label}
                    </h3>
                    <p>ID: {selectedBahan.value}</p>
                    <p>Kode: {selectedBahan.kode}</p>
                    <p>Category: {selectedBahan.category}</p>
                    <div className="flex justify-end"></div>
                  </div>
                )}
                <div className="w-full mb-10">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vendor <span className="text-red-500">*</span>
                  </label>
                  <Select
                    isLoading={isLoadingVendor}
                    options={vendorOptions}
                    placeholder="Select vendor"
                    className="w-full"
                    // value={formikProps.values.vendor_id}
                    onChange={(option) => {
                      formikProps.setFieldValue("vendor_id", option.value);
                      const selectedData = {
                        bahan: selectedBahan,
                        vendor: option,
                      };
                      onBahanSelect(selectedData);
                    }}
                    // onBlur={() => formikProps.setFieldTouched("status", true)}
                  />
                  {formikProps.touched.vendor_id &&
                    formikProps.errors.vendor_id && (
                      <p className="mt-1 text-sm text-red-600">
                        {formikProps.errors.vendor_id}
                      </p>
                    )}
                </div>
              </div>

              <div className="flex justify-between mt-4 w-full">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    clearSelectedBahan();
                  }}
                  className="w-[186px] py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-[186px] py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800"
                >
                  {isLoading ? "Loading..." : "Confirm"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Dialog>
    );
  }
);

export default ModalSearchInput;
