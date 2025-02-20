import TextBlockSkeleton from "components/shared/loaders/TextBlockSkeleton";
import { formatDate } from "utils/helpers";
import { Input, FormItem, FormContainer, Button } from "components/ui";
import { useState } from "react";
import usePurchaseOrder from "utils/hooks/PurchaseOrder/usePurchaseOrder";
import { toast, Notification } from "components/ui";
import { NoDataSvg } from "assets/svg";

const PoAdjusmentNotes = ({
  data,
  isLoading,
  isShowInput = false,
  fetchNotes,
}) => {
  const [inputValue, setInputValue] = useState("");
  const { replyAdjustmentNote } = usePurchaseOrder();
  const id = data?.[0]?.purchase_order_id;

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleNoteSubmit = async () => {
    try {
      const payload = {
        note: inputValue,
      };
      const resp = await replyAdjustmentNote(id, payload);
      if (resp.status === "success") {
        toast.push(
          <Notification
            type="success"
            title="Berhasil mengirim catatan adjustment"
            width={700}
          />,
          {
            placement: "top-center",
          }
        );
        setInputValue("");
        await fetchNotes();
      } else {
        toast.push(
          <Notification
            type="danger"
            title="Maaf terjadi kesalahan, gagal mengirim catatan adjustment"
            width={700}
          />,
          {
            placement: "top-center",
          }
        );
      }
    } catch (error) {
      toast.push(
        <Notification
          type="danger"
          title="Maaf terjadi kesalahan, gagal mengirim catatan adjustment"
          width={700}
        />,
        {
          placement: "top-center",
        }
      );
    }
  };

  if (data?.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center">
        <NoDataSvg />
        <div className="flex flex-col gap-1 items-center mt-[21px]">
          <p className="text-blue-999 text-lg font-bold">Belum Ada Data</p>
          <p className="text-blue-999">Data catatan belum tersedia</p>
        </div>
      </div>
    );
  }

  const shouldRenderNote = (item, type) => {
    return (
      (type === "adjustment" && item.user_id === 5) ||
      (type === "reply" && item.user_id === 4)
    );
  };

  const renderNoteSection = (item, type) => {
    if (!shouldRenderNote(item, type)) {
      return null;
    }

    return (
      <div className="p-4 ">
        <p className="text-sm font-bold text-gray-500">
          {type === "adjustment" ? "Catatan Adjustment" : "Balasan"}
        </p>
        <p className="text-gray-700 mt-2">{item.note}</p>
      </div>
    );
  };

  return (
    <div className="max-w-4xl">
      <div className="grid grid-cols-3 gap-6">
        {isLoading ? (
          <TextBlockSkeleton />
        ) : (
          data?.map((item) => [
            <div key={`date-${item.id}`} className="flex items-center">
              <p className="text-sm font-bold mb-2">
                {formatDate(item.created_at)}
              </p>
            </div>,
            <div key={`adjustment-${item.id}`}>
              {renderNoteSection(item, "adjustment")}
            </div>,
            <div key={`reply-${item.id}`}>
              {renderNoteSection(item, "reply")}
            </div>,
          ])
        )}
      </div>
      {isShowInput && (
        <div className="py-4">
          <h2 className="text-lg font-semibold text-indigo-900 pb-4">
            Input Catatan
          </h2>
          <FormContainer layout="INLINE" className="flex items-center gap-2">
            <FormItem className="flex-1">
              <Input
                type="textArea"
                name="name"
                uppercase={false}
                value={inputValue}
                onChange={handleInputChange}
              />
            </FormItem>
            <FormItem>
              <Button
                disabled={!inputValue}
                type="submit"
                variant="solid"
                size="sm"
                onClick={handleNoteSubmit}
              >
                Kirim
              </Button>
            </FormItem>
          </FormContainer>
        </div>
      )}
    </div>
  );
};

export default PoAdjusmentNotes;
