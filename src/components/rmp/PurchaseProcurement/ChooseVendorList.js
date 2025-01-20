import { Switcher, Input, Button } from "components/ui";
import Select from "react-select";
import useVendor from "utils/hooks/vendorManagement/useVendor";
import usePurchaseOrder from "utils/hooks/PurchaseOrder/usePurchaseOrder";
import { useEffect, useState, useMemo } from "react";
import CustomTable from "components/custom/CustomTable";
import capitalize from "components/ui/utils/capitalize";
import { getStatusClassName } from "utils/helpers";
import TableListDropdown from "components/template/TableListDropdown";
import { useNavigate } from "react-router-dom";
import Radio from "components/ui/Radio";
import { useParams } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";

const ChooseVendorList = ({ onPayloadVendorChange }) => {
  const { id } = useParams();
  const { getVendors, dataVendor } = useVendor();
  const { dataDetailPurchaseOrder, confirmPoVendors } = usePurchaseOrder();
  const navigate = useNavigate();
  const [selectedDataVendor, setSelectedDataVendor] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [selectedInput, setSelectedInput] = useState([]);
  const [isApprovalNeeded, setIsApprovalNeeded] = useState(false);
  const [isLoadingAdd, setIsLoadingAdd] = useState(false);
  const [payloadVendor, setPayloadVendor] = useState({
    purchase_order_id: id,
    needs_approval: "no",
    notes: "",
    vendors: [],
  });
  useEffect(() => {
    getVendors({ all: true });
  }, []);

  const columns = [
    {
      accessor: "select",
      Cell: ({ row }) => {
        return (
          <Radio
            value={row.original.vendor_id}
            checked={selectedVendor === row.original.vendor_id}
            onChange={() => {
              setSelectedVendor(row.original.vendor_id);
            }}
          />
        );
      },
    },
    {
      Header: "ID Vendor",
      accessor: "id",
      Cell: ({ row }) => row.original.vendor_id,
    },
    {
      Header: "Vendor",
      accessor: "name",
      Cell: ({ row }) => row.original.name,
    },
    {
      Header: "Alamat",
      accessor: "address",
      Cell: ({ row }) => row.original.address,
    },
    {
      Header: "PIC",
      accessor: "pic_name",
      Cell: ({ row }) => row.original.pic_name,
    },
    {
      Header: "Kontak PIC",
      accessor: "pic_phone",
      Cell: ({ row }) => {
        return row.original.pic_phone;
      },
    },
    {
      Header: "Email PIC",
      accessor: "email",
      Cell: ({ row }) => {
        return row.original.pic_email;
      },
    },
    {
      Header: "Prioritas",
      accessor: "priority",
      Cell: ({ row }) => {
        return <span>-</span>;
      },
    },
    {
      Header: "Penawaran",
      accessor: "penawaran",
      Cell: ({ row }) => {
        return row.original.is_submit_offer ? (
          <div className="flex justify-center gap-2 items-center px-1 py-1 bg-emerald-600 text-white  rounded">
            <p>Penawaran</p>
            <span>
              <FiCheckCircle />
            </span>
          </div>
        ) : (
          <span>-</span>
        );
      },
    },
    {
      accessor: "action",
      Cell: ({ row }) => (
        <TableListDropdown
          dropdownItemList={[
            {
              label: isLoadingAdd ? "Loading..." : "Input Penawaran",
              onClick: () => handleAddVendor(row.original.vendor_id),
            },
            {
              label: "Lihat Detail Vendor",
              onClick: () =>
                navigate(
                  `/vendor-management/detail-vendor/${row.original.vendor_id}`
                ),
            },
          ]}
        />
      ),
    },
  ];

  useEffect(() => {
    if (
      dataDetailPurchaseOrder?.vendors &&
      dataDetailPurchaseOrder.vendors.length > 0 &&
      dataVendor?.length > 0
    ) {
      // Map existing vendors to select options format
      const initialVendors = dataDetailPurchaseOrder.vendors.map((vendor) => ({
        value: vendor.vendor_id,
        label: vendor.name,
      }));

      setSelectedInput(initialVendors.map((vendor) => vendor.value));

      // Keep the original structure from dataDetailPurchaseOrder.vendors
      setSelectedDataVendor(dataDetailPurchaseOrder.vendors);

      // Set selected vendor if there's an approved one
      const approvedVendor = dataDetailPurchaseOrder.vendors.find(
        (vendor) => vendor.status === "approved"
      );
      if (approvedVendor) {
        setSelectedVendor(approvedVendor.vendor_id);
      }
    }
  }, [dataDetailPurchaseOrder, dataVendor]);

  useEffect(() => {
    if (selectedDataVendor) {
      const vendorsPayload = selectedDataVendor.map((vendor) => ({
        vendor_id: vendor.vendor_id,
        status: vendor.vendor_id === selectedVendor ? "approved" : "rejected",
      }));

      setPayloadVendor((prevPayload) => ({
        ...prevPayload,
        vendors: vendorsPayload,
      }));
    }
  }, [selectedVendor, selectedDataVendor]);

  // Handle multi-select changes
  const handleVendorChange = (selectedOptions) => {
    if (!selectedOptions) {
      setSelectedInput([]);
      setSelectedDataVendor([]);
      return;
    }

    const selectedValues = selectedOptions.map((option) => option.value);
    setSelectedInput(selectedValues);

    const selectedVendors = dataVendor
      ?.filter((vendor) => selectedValues.includes(vendor.id))
      .map((vendor) => ({
        vendor_id: vendor.id,
        name: vendor.name,
        pic_name: vendor.pic_name,
        pic_phone: vendor.pic_phone,
        pic_email: vendor.pic_email,
        status: vendor.id === selectedVendor ? "approved" : "rejected",
        priority: null,
        offer_id: null,
        is_submit_offer: false,
      }));

    setSelectedDataVendor(selectedVendors || []);
  };

  const handleApprovalChange = (checked) => {
    setIsApprovalNeeded(checked);
    setPayloadVendor({
      ...payloadVendor,
      needs_approval: checked ? "yes" : "no",
    });
  };

  const handleAddVendor = async (vendor_id) => {
    // Accept vendor_id as a parameter
    if (!payloadVendor) return;
    try {
      setIsLoadingAdd(true);
      if (vendor_id) {
        const resp = await confirmPoVendors(payloadVendor);
        if (resp.status === "success") {
          setTimeout(() => {
            navigate(`/purchase/pengadaan/penawaran-vendor/${vendor_id}`);
          }, 1000);
        } else {
          console.log(resp);
          // toast.push(
          //   <Notification
          //     type="danger"
          //     title="Maaf terjadi kesalahan, gagal merilis PO"
          //     width={700}
          //   />,
          //   {
          //     placement: "top-center",
          //   }
          // );
        }
      }
    } catch (error) {
      console.log(error);
      // toast.push(
      //   <Notification
      //     type="danger"
      //     title="Maaf terjadi kesalahan, gagal merilis PO"
      //     width={700}
      //   />,
      //   {
      //     placement: "top-center",
      //   }
      // );
    } finally {
      setIsLoadingAdd(false);
    }
  };
  // useEffect(() => {
  //   onPayloadVendorChange(payloadVendor);
  // }, [payloadVendor]);

  return (
    <div className="mt-4">
      <div className="flex justify-between ">
        <h2 className="text-xl font-medium text-gray-800 mb-2 ">
          Daftar Vendor
        </h2>
        {/* <div className="gap-2 flex items-center">
          <Button type="button">
            <span className="gap-2 flex items-center">Submit Vendor</span>
          </Button>
        </div> */}
      </div>
      <div className="py-4">
        <label
          htmlFor="vendor"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Vendor
        </label>
        <Select
          isMulti
          placeholder="Pilih Vendor"
          value={selectedInput.map((id) => ({
            value: id,
            label: dataVendor?.find((v) => v.id === id)?.name,
          }))}
          options={dataVendor?.map((vendor) => ({
            value: vendor.id,
            label: vendor.name,
          }))}
          onChange={handleVendorChange}
        />
      </div>
      <div>
        <CustomTable data={selectedDataVendor} columns={columns} />
      </div>
      <div className="block py-6">
        <h2 className="text-lg font-medium text-gray-800 mb-4">
          Butuh Persetujuan Direksi ?
        </h2>
        <Switcher
          defaultChecked={false}
          onChange={handleApprovalChange}
          checkedContent="Ya"
          unCheckedContent={<span className="text-gray-800">Tidak</span>}
          className="w-16"
        />
        {isApprovalNeeded && (
          <>
            <p className="text-sm text-gray-700 py-2">
              Penawaran ini akan dikirimkan ke direksi untuk ditinjau kembali
            </p>
            <div className="py-4">
              <label
                htmlFor="note"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Catatan
              </label>
              <Input
                textArea
                id="note"
                name="note"
                className="w-full"
                rows={4}
                onChange={(e) =>
                  setPayloadVendor({
                    ...payloadVendor,
                    notes: e.target.value,
                  })
                }
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChooseVendorList;
