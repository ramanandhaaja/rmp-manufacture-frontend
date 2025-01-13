import { Switcher, Input } from "components/ui";
import Select from "react-select";
import useVendor from "utils/hooks/vendorManagement/useVendor";
import { useEffect, useState, useMemo } from "react";
import CustomTable from "components/custom/CustomTable";
import capitalize from "components/ui/utils/capitalize";
import { getStatusClassName } from "utils/helpers";
import TableListDropdown from "components/template/TableListDropdown";
import { useNavigate } from "react-router-dom";
import Radio from "components/ui/Radio";
import { useParams } from "react-router-dom";

const ChooseVendorList = ({ onPayloadVendorChange }) => {
  const { id } = useParams();
  const { getVendors, dataVendor } = useVendor();
  const vendorList = dataVendor?.data;
  const navigate = useNavigate();
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [selectedInput, setSelectedInput] = useState([]);
  const [isApprovalNeeded, setIsApprovalNeeded] = useState(false);
  const [payloadVendor, setPayloadVendor] = useState({
    purchase_order_id: id,
    needs_approval: "no",
    notes: "",
    vendors: [],
  });

  useEffect(() => {
    getVendors();
  }, []);

  const columns = [
    {
      accessor: "select",
      Cell: ({ row }) => {
        return (
          <Radio
            value={row.original.id}
            checked={selectedVendor === row.original.id}
            onChange={() => {
              setSelectedVendor(row.original.id);
            }}
          />
        );
      },
    },
    {
      Header: "ID Vendor",
      accessor: "id",
      Cell: ({ row }) => row.original.id,
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
        return <span>Prioritas {row.original.index + 1}</span>;
      },
    },
    {
      Header: "Penawaran",
      accessor: "penawaran",
      Cell: ({ row }) => {
        return "-";
      },
    },
    {
      accessor: "action",
      Cell: ({ row }) => (
        <TableListDropdown
          dropdownItemList={[
            {
              label: "Input Penawaran",
              onClick: () =>
                navigate(
                  `/purchase/pengadaan/penawaran-vendor/${row.original.id}`
                ),
            },
            {
              label: "Lihat Detail Vendor",
              onClick: () =>
                navigate(`/vendor-management/detail-vendor/${row.original.id}`),
            },
          ]}
        />
      ),
    },
  ];

  const selectedDataVendor = useMemo(() => {
    if (!selectedInput || selectedInput.length === 0) return null;
    return vendorList
      ?.filter((item) => selectedInput.includes(item.id))
      .map((item, index) => ({ ...item, index }));
  }, [vendorList, selectedInput]);

  useEffect(() => {
    if (selectedDataVendor) {
      const vendorsPayload = selectedDataVendor.map((vendor) => ({
        vendor_id: vendor.id,
        status: vendor.id === selectedVendor ? "approved" : "rejected",
      }));
      setPayloadVendor((prevPayload) => ({
        ...prevPayload,
        vendors: vendorsPayload,
      }));
    }
  }, [selectedVendor, selectedDataVendor]);

  const handleApprovalChange = (checked) => {
    setIsApprovalNeeded(checked);
    setPayloadVendor({
      ...payloadVendor,
      needs_approval: checked ? "yes" : "no",
    });
  };

  useEffect(() => {
    onPayloadVendorChange(payloadVendor);
  }, [payloadVendor]);

  return (
    <div className="mt-4">
      <h2 className="text-xl font-medium text-gray-800 mb-2 ">Daftar Vendor</h2>
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
          options={
            vendorList &&
            vendorList?.map((vendor) => ({
              value: vendor.id,
              label: vendor.name,
            }))
          }
          onChange={(selectedOptions) => {
            const selectedValues = selectedOptions.map(
              (option) => option.value
            );
            setSelectedInput(selectedValues);
          }}
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
