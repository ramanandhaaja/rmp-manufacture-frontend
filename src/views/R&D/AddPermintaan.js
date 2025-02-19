import LayoutRightSpace from "components/layout/LayoutRightSpace";
import usePurchaseOrder from "utils/hooks/PurchaseOrder/usePurchaseOrder";
import { useParams } from "react-router-dom";
import { FiPlus, FiTrash } from "react-icons/fi";
import { useEffect, useState } from "react";
import TextBlockSkeleton from "components/shared/loaders/TextBlockSkeleton";
import { Notification, toast, Button, Radio, DatePicker, Input, FormItem, FormContainer, Upload } from "components/ui";
import CustomTable from "components/custom/CustomTable";
import { RiFileLine } from "react-icons/ri";
import ModalUpload from "components/custom/ModalUpload";
import Tabs from "components/ui/Tabs";
import PaymentVendorList from "components/rmp/Payment/PaymentVendorList";
import { MdNavigateNext } from "react-icons/md";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import ListAddKompetitor from "components/rmp/R&D/ListAddKompetitor";
import ListAddDetailProduk from "components/rmp/R&D/ListAddDetailProduk";

const DetailPermintaanRnd = () => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { getDetailVendorOffer, dataOfferPoVendors, dataDetailPurchaseOrder } =
    usePurchaseOrder(id);
  const vendorDetail = dataOfferPoVendors?.vendor_detail;
  const vendorItems = dataOfferPoVendors?.items;
  const deliveryCost = dataOfferPoVendors?.delivery_cost;
  const [activeTab, setActiveTab] = useState("0");
  const navigate = useNavigate();


  const documents = Array(3).fill(null);

  const dummyData = [
    {
      nama: "PT Harapan Pharmacy",
      zatAktif: "Paracetamol",
      Kekuatan: "Kuat",
      bentukSediaan: "Tablet",
      Kemasan: "Strip",
      Dosis: "150 Mg",
      HNA: " 1.500",
    },
    {
      nama: "PT Indah Pharmacy",

      zatAktif: "Ibuprofen",
      Kekuatan: "Kuat",
      bentukSediaan: "Tablet",
      Kemasan: "Botol",
      Dosis: "110 Mg",
      HNA: " 2.000",
    },
    {
      nama: "PT Bintang Pharmacy",

      zatAktif: "Amoxicillin",
      Kekuatan: "Kuat",
      bentukSediaan: "Capsule",
      Kemasan: "Box",
      Dosis: "150 Mg",
      HNA: " 3.000",
    },
  ];



  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  return (
    <LayoutRightSpace>
      <div className=" px-4">
        <h1 className="text-2xl font-semibold text-indigo-900 mb-4 ">
          Buat Permintaan Produk RnD
        </h1>
        <div className="border-b border-gray-300 "></div>

        <Tabs value={activeTab} onChange={handleTabChange} variant="underline">
          <>
            <Tabs.TabList className="border-b border-gray-300 pt-2">
              <Tabs.TabNav value={"0"} className="flex-col">
                <div className="flex items-center">
                  <div className=" flex flex-col">
                    <span className="text-base ">Step 1</span>
                    <span className="text-sm text-gray-500 ">Detail Permintaan</span>
                  </div>
                  <div className="ml-2">
                    <MdNavigateNext size={24} />
                  </div>
                </div>
              </Tabs.TabNav>
              <Tabs.TabNav value={"1"} className="flex-col">
                <div className="flex items-center">
                  <div className=" flex flex-col">
                    <span className="text-base ">Step 2</span>
                    <span className="text-sm text-gray-500 ">Kompetitor</span>
                  </div>
                  <div className="ml-2">
                    <MdNavigateNext size={24} />
                  </div>
                </div>
              </Tabs.TabNav>
              <Tabs.TabNav value={"2"} className="flex-col">
                <div className="flex items-center">
                  <div className=" flex flex-col">
                    <span className="text-base ">Step 3</span>
                    <span className="text-sm text-gray-500 ">Detail Produk</span>
                  </div>
                  <div className="ml-2">
                    <MdNavigateNext size={24} />
                  </div>
                </div>
              </Tabs.TabNav>
              <Tabs.TabNav value={"3"} className="flex-col">
                <div className="flex items-center">
                  <div className=" flex flex-col">
                    <span className="text-base ">Step 4</span>
                    <span className="text-sm text-gray-500 ">Dokumen Referensi</span>
                  </div>
                </div>
              </Tabs.TabNav>
            </Tabs.TabList>
          </>
          {/* LANGKAH 1 //////////////////*/}
          <Formik>
            <Form className="space-y-6">
              <FormContainer>
                <Tabs.TabContent value={"0"}>
                  <div className="flex justify-between px-4">
                    <div className="py-3 w-full">
                      <h2 className="text-xl font-semibold text-indigo-900 mt-4 mb-4">
                        Detail Produk
                      </h2>
                      <div className="space-y-6 mb-8">
                        {isLoading ? (
                          <TextBlockSkeleton />
                        ) : (
                          <div className="grid grid-cols-4 gap-2 w-full">
                            <FormItem className="col-span-4 w-full"
                              label={"Judul Permintaan"}
                              invalid="{errors.description && touched.description}"
                              errorMessage=""
                            >
                              <Field
                                type="text"
                                name="name"
                                placeholder="Masukan Judul Permintaan"
                                component={Input}
                                className="w-full"
                                uppercase={false}
                              />
                            </FormItem>
                            <FormItem className="col-span-4 w-full"
                              label={"Tipe Pengembangan"}
                              invalid="{errors.description && touched.description}"
                              errorMessage=""
                            >
                              <Field
                                name="name"
                                component={Radio.Group}
                                className="w-full"
                              >
                                <Radio value="Produk Baru">Produk Baru</Radio>
                                <Radio value="Produk Lama">Produk Lama</Radio>
                              </Field>
                            </FormItem>

                            <FormItem className="col-span-4 w-full"
                              label={"Target Launching"}
                              invalid="{errors.description && touched.description}"
                              errorMessage=""
                            >
                              <Field
                                name="name"
                                placeholder="Select Target Launch Date"
                                component={DatePicker}
                                className="w-full"
                              />
                            </FormItem>
                            <FormItem className="col-span-4 w-full"
                              label={"Deskripsi Produk"}
                              invalid="{errors.description && touched.description}"
                              errorMessage=""
                            >
                              <Input
                                textArea
                                id="note"
                                name="note"
                                rows={4}
                                className="w-full"
                              />
                            </FormItem>
                            <FormItem className="col-span-4 w-full"
                              label={"Kategori Produk"}
                              invalid="{errors.description && touched.description}"
                              errorMessage=""
                            >
                              <Field
                                name="name"
                                component={Radio.Group}
                                className="w-full"
                              >
                                <Radio value="Obat Tradisional">Obat Tradisional</Radio>
                                <Radio value="Suplemen Kesehatan">Suplemen Kesehatan</Radio>
                                <Radio value="Kosmetik">Kosmetik</Radio>
                              </Field>
                            </FormItem>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Tabs.TabContent>
                {/* LANGKAH 2 ///////////////////////////////*/}
                <Tabs.TabContent value="1">
                  <div className="mt-10">
                    <ListAddKompetitor
                      dataTableItems={dummyData} />
                  </div>
                </Tabs.TabContent>
                {/* LANGKAH 3 //////////////////////////////*/}
                <Tabs.TabContent value="2">
                  <div className="mt-10">
                    <div className="border border-gray-300 rounded-md p-4">
                      <FormItem className="col-span-4 w-full mb-4"
                        label={"Nama 1"}
                        invalid="{errors.description && touched.description}"
                        errorMessage=""
                      >
                        <div className="flex items-center">
                          <Input
                            type="text"
                            name="name1"
                            placeholder="Nilai"
                          />
                          <button
                            type="button"
                            className="ml-2 text-red-500 hover:text-red-700"
                            aria-label="Delete"
                          >
                            <FiTrash size={24} color="red" />
                          </button>
                        </div>
                      </FormItem>

                      <FormItem className="col-span-4 w-full mb-4"
                        label={"Nama 2"}
                        invalid="{errors.description && touched.description}"
                        errorMessage=""
                      >

                        <div className="flex items-center">
                          <Input
                            type="text"
                            name="name2"
                            placeholder="Nilai"
                          />
                          <button
                            type="button"
                            className="ml-2 text-red-500 hover:text-red-700"
                            aria-label="Delete"
                          >
                            <FiTrash size={24} color="red" />
                          </button>
                        </div>
                      </FormItem>

                      <Button type="button" onClick={() => setIsOpen(true)}>
                        <span className="gap-2 flex items-center">
                          <FiPlus />
                          Tambah Nama
                        </span>
                      </Button>
                    </div>
                    <ListAddDetailProduk />
                    <FormItem className="col-span-4 w-full"
                      label={<span style={{ fontSize: '18px' }}>Pendaftar</span>}
                      invalid="{errors.description && touched.description}"
                      errorMessage=""
                    >
                      <Field
                        name="name"
                        component={Radio.Group}
                        className="w-full"
                      >
                        <Radio value="Royal">Royal</Radio>
                        <Radio value="Fahrenheir">Fahrenheit</Radio>
                        <Radio value="Yarindo">Yarindo</Radio>
                        <Radio value="Lainnya">
                          Lainnya
                          <Field
                            type="text"
                            name="otherProducer"
                            placeholder=""
                            component={Input}
                            className="ml-4 w-48"
                          />
                        </Radio>
                      </Field>
                    </FormItem>
                    <FormItem className="col-span-4 w-full"
                      label={<span style={{ fontSize: '18px' }}>Produsen</span>}
                      invalid="{errors.description && touched.description}"
                      errorMessage=""
                    >
                      <Field
                        name="name"
                        component={Radio.Group}
                        className="w-full "
                      >
                        <Radio value="Royal">Royal</Radio>
                        <Radio value="Fahrenheir">Fahrenheit</Radio>
                        <Radio value="Yarindo">Yarindo</Radio>
                        <Radio value="Lainnya">
                          Lainnya
                          <Field
                            type="text"
                            name="otherProducer"
                            placeholder=""
                            component={Input}
                            className="ml-4 w-48"
                          />
                        </Radio>
                      </Field>
                    </FormItem>
                  </div>
                </Tabs.TabContent>
                {/* LANGKAH 4 //////////////////*/}
                <Tabs.TabContent value="3">
                  <div className="mt-10">
                    <h2 className="text-xl font-semibold text-indigo-900 mt-4 mb-4">
                      Upload Dokumen Referensi
                    </h2>
                    <Upload
                      accept=".pdf"
                      multiple={false}
                      uploadLimit={1}
                      draggable={true}
                    >
                      <div className="flex flex-col items-center justify-center h-[200px] rounded-lg hover:bg-gray-100 transition-colors">
                        <p className="text-gray-600 mb-2">Unggah File (PDF max 20mb)</p>
                        <Button size="sm" className="w-32">
                          Telusuri File
                        </Button>
                      </div>
                    </Upload>
                    <div className="flex gap-2 py-4">
                      {documents.map((_, index) => (
                        <div key={index} className="py-4">
                          <h2 className="text-base font-semibold mb-4">
                            Dokumen Referensi
                          </h2>
                          <div className="border border-gray-400 rounded-lg p-2 w-[320px] flex items-center gap-1">
                            <RiFileLine size={18} />
                            document-name.pdf
                          </div>

                        </div>
                      ))}
                    </div>
                  </div>
                </Tabs.TabContent>
              </FormContainer>
            </Form>
          </Formik>
        </Tabs>
        <div className="flex justify-end gap-2 py-4">
          <Button  disabled={activeTab == 0}>
            Batal
          </Button>
          <Button  disabled={activeTab == 0}>
            Sebelumnya
          </Button>
          <Button variant="solid">
            Konfirmasi
          </Button>
        </div>

      </div>
      {/* <ModalUpload
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => setIsOpen(false)}
        title="Upload Bukti Pembayaran"
      /> */}
    </LayoutRightSpace>
  );
};

export default DetailPermintaanRnd;
