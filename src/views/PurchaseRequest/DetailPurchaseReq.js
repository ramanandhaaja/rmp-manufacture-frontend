import LayoutRightSpace from "components/layout/LayoutRightSpace";
import usePurchaseReq from "utils/hooks/PurchaseRequest/usePurchaseRequest";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  formatDate,
  getCapitalizeType,
  getStatusClassName,
  getStatusName,
} from "utils/helpers";
import CustomTable from "components/custom/CustomTable";
import { findDepartement } from "utils/helpers";
import { Button } from "components/ui";
import { useNavigate } from "react-router-dom";
import useUser from "utils/hooks/useUser";
import ApprovalCard from "components/custom/ApprovalCard";
import {
  Notification,
  toast,
  FormContainer,
  FormItem,
  Input,
} from "components/ui";
import ConfirmationCustom from "components/custom/ConfirmationCustom";
import ModalNoteInput from "components/custom/ModalNoteInput";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Loading } from "components/shared";
import { useSelector } from "react-redux";
import TableListDropdown from "components/template/TableListDropdown";

const DetailPurchaseReq = () => {
  const navigate = useNavigate();
  const {
    dataDetailPurchase,
    getDetailPurchaseReq,
    updatePurchaseReqStatus,
    updatePurchaseReqFollowUp,
  } = usePurchaseReq();
  const [isLoadingList, setIsLoadingList] = useState(false);
  const { id } = useParams();
  const { userRole, user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const isFollowUp =
    window.location.pathname.includes("follow-up") && userRole.includes("ppic");
  const formikRef = useRef(null);
  const { goodsType } = useSelector((state) => state.goodsType);
  const [confirmModalProps, setConfirmModalProps] = useState({
    title: "",
    message: "",
    onConfirm: null,
    isOpen: false,
  });

  const [noteModalProps, setNoteModalProps] = useState({
    title: "",
    subtitle: "",
    icon: null,
    status: "",
    isOpen: false,
    onSave: null,
  });

  const isApprovalShown = userRole?.includes("factory-manager");

  const columns = [
    {
      Header: "Kode",
      accessor: "goods_id",
    },
    {
      Header: "Barang",
      accessor: "goods_name",
    },
    {
      Header: "Kategori Barang",
      accessor: "goods_category_name",
    },
    {
      Header: "QTY",
      accessor: "quantity",
    },
    {
      Header: "UOM",
      accessor: "measurement",
    },
    {
      accessor: "action",
      Cell: ({ row }) => {
        if (dataDetailPurchase.status !== "approved") {
          return (
            <TableListDropdown
              dropdownItemList={[
                {
                  label: "Edit",
                  onClick: () => navigate(`/purchase/request/edit/${id}`),
                },
              ]}
            />
          );
        }
        return null;
      },
    },
  ];

  useEffect(() => {
    setIsLoadingList(true);
    getDetailPurchaseReq(id);
    setIsLoadingList(false);
  }, [id]);

  const handleStatusUpdate = async (status, update_status_reason = "") => {
    setIsLoading(true);
    try {
      const payload = { status };
      if (update_status_reason) {
        payload.update_status_reason = update_status_reason;
      }

      const response = await updatePurchaseReqStatus(id, payload);
      await getDetailPurchaseReq(id);
      if (response.status === "failed") {
        toast.push(
          <Notification
            type="danger"
            title={"Maaf terjadi kesalahan, Status gagal diubah"}
            width={700}
          />,
          {
            placement: "top-center",
          }
        );
        throw new Error("Failed to update status");
      }

      console.log(`Status updated successfully to: ${status}`);
      toast.push(
        <Notification
          type="success"
          title={"Status berhasil diubah"}
          width={700}
        />,
        {
          placement: "top-center",
        }
      );
      await getDetailPurchaseReq(id);

      setConfirmModalProps((prev) => ({ ...prev, isOpen: false }));
      setNoteModalProps((prev) => ({ ...prev, isOpen: false }));
    } catch (error) {
      console.error("Error updating status:", error);
      toast.push(
        <Notification
          type="danger"
          title={"Maaf terjadi kesalahan, Status gagal diubah"}
          width={700}
        />,
        {
          placement: "top-center",
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenConfirmModal = (title, message, confirmHandler) => {
    setConfirmModalProps({
      title,
      message,
      onConfirm: confirmHandler,
      isOpen: true,
    });
  };

  const handleOpenNoteModal = ({ title, subtitle, icon, status, onSave }) => {
    setNoteModalProps({
      title,
      subtitle,
      icon,
      status,
      onSave,
      isOpen: true,
    });
  };

  const FormBuyer = () => {
    const handleFollowUp = async (values) => {
      console.log(values);
      try {
        setIsLoading(true);
        const response = await updatePurchaseReqFollowUp(id, {
          buyer: values.buyer,
        });
        if (response.status === "success") {
          toast.push(
            <Notification
              type="success"
              title="Follow Up berhasil diinputkan"
              width={400}
            />,
            {
              placement: "top-center",
            }
          );
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          toast.push(<Notification type="danger" title={response.message} />, {
            placement: "top-center",
          });
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    return (
      <div className="py-4">
        <Formik
          innerRef={formikRef}
          initialValues={{ buyer: "" }}
          validationSchema={Yup.object().shape({
            buyer: Yup.string().required("Buyer is required"),
          })}
          onSubmit={handleFollowUp}
        >
          {({ errors, touched }) => (
            <Form className="space-y-6">
              <FormContainer>
                {/* Vendor Name */}
                <FormItem
                  label={
                    <span>
                      Dibeli Oleh <span>*</span>
                    </span>
                  }
                  invalid={errors.buyer && touched.buyer}
                  errorMessage={errors.buyer}
                >
                  <Field
                    type="text"
                    name="buyer"
                    placeholder="Masukan pembeli"
                    component={Input}
                    uppercase={false}
                  />
                </FormItem>
              </FormContainer>
            </Form>
          )}
        </Formik>
      </div>
    );
  };

  const Approval = () => {
    return (
      <div className="px-2 py-4">
        <ApprovalCard
          data={dataDetailPurchase}
          handleStatusUpdate={handleStatusUpdate}
          isLoading={isLoading}
          onOpenConfirmModal={handleOpenConfirmModal}
          onOpenNoteModal={handleOpenNoteModal}
        />
      </div>
    );
  };

  return (
    <LayoutRightSpace content={isApprovalShown && <Approval />}>
      <div className="flex justify-between">
        <div className="flex gap-2  ">
          <h1 className="text-2xl font-semibold text-indigo-900 mb-4">
            Permintaan Pembelian Detail
          </h1>

          <div
            className={`${getStatusClassName(
              dataDetailPurchase?.status
            )} text-white h-8 px-3 py-1 rounded-lg text-sm font-bold`}
          >
            {getStatusName(dataDetailPurchase?.status)}
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() =>
              navigate(`/purchase/request/detail/informasi-pembelian/${id}`)
            }
          >
            Informasi Pembelian
          </Button>
          {isFollowUp && (
            <Button
              onClick={() => formikRef.current.handleSubmit()}
              variant="solid"
              className="text-white"
            >
              Kirim
            </Button>
          )}
        </div>
      </div>

      <div className="border-b border-gray-400 my-2"></div>
      <div>
        <h2 className="text-lg font-semibold py-4">
          Item Type: {getCapitalizeType(goodsType)}
        </h2>
      </div>
      <div className="flex justify-between">
        <div className="py-3 pt-6">
          <div className="space-y-6 mb-8">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-10">
                <p className="text-sm text-gray-500 w-32">ID</p>
                <p className="text-sm text-gray-700">
                  {dataDetailPurchase.id || "-"}
                </p>
              </div>

              <div className="flex items-center gap-11">
                <p className="text-sm text-gray-500 w-42">Tanggal Pengajuan</p>
                <p className="text-sm text-gray-700">
                  {dataDetailPurchase.request_date
                    ? formatDate(dataDetailPurchase.request_date)
                    : "-"}
                </p>
              </div>
              <div className="flex items-center gap-[37px]">
                <p className="text-sm text-gray-500 w-42">
                  Tanggal Persetujuan
                </p>
                <p className="text-sm text-gray-700">
                  {dataDetailPurchase.approval_date
                    ? formatDate(dataDetailPurchase.approval_date)
                    : "-"}
                </p>
              </div>
              <div className="flex items-center gap-10">
                <p className="text-sm text-gray-500 w-32">Dibeli Oleh</p>
                <p className="text-sm text-gray-700">
                  {dataDetailPurchase.buyer || "-"}
                </p>
              </div>
              <div className="flex items-center gap-10">
                <p className="text-sm text-gray-500 w-32">Catatan</p>
                <p className="text-sm text-gray-700">
                  {dataDetailPurchase.purchase_reason || "-"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {isFollowUp && <FormBuyer />}
        <div className="mt-4">
          {isLoadingList ? (
            <div className="flex justify-center">
              <Loading />
            </div>
          ) : (
            <CustomTable columns={columns} data={dataDetailPurchase.items} />
          )}
        </div>
      </div>
      <ConfirmationCustom
        confirmText="Konfirmasi"
        title={confirmModalProps.title}
        text=" "
        message={confirmModalProps.message}
        onConfirm={confirmModalProps.onConfirm}
        isOpen={confirmModalProps.isOpen}
        onClose={() =>
          setConfirmModalProps((prev) => ({ ...prev, isOpen: false }))
        }
        isLoading={isLoading}
      />
      <ModalNoteInput
        {...noteModalProps}
        onClose={() =>
          setNoteModalProps((prev) => ({ ...prev, isOpen: false }))
        }
        isLoading={isLoading}
      />
    </LayoutRightSpace>
  );
};

export default DetailPurchaseReq;
