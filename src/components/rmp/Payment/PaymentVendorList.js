import CustomTable from "components/custom/CustomTable";
import { vendorData } from "views/Payment/dummyData";

const PaymentVendorList = () => {
  const columns = [
    {
      Header: "Id vendor",
      accessor: "id_vendor",
    },
    {
      Header: "Vendor",
      accessor: "vendor",
    },
    {
      Header: "Kontak",
      accessor: "kontak",
    },
    {
      Header: "Alamat",
      accessor: "alamat",
    },
    {
      Header: "Pic",
      accessor: "pic",
    },
    {
      Header: "Kontak Pic",
      accessor: "kontak_pic",
    },
    {
      Header: "Email Pic",
      accessor: "email_pic",
    },
  ];

  return (
    <div>
      <CustomTable data={vendorData} columns={columns} />
    </div>
  );
};

export default PaymentVendorList;
