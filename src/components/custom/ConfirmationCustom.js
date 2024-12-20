import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { Button, Dialog } from "components/ui";
import React from "react";

const ConfirmationCustom = ({
  isOpen,
  onClose,
  children,
  showCancelBtn = true,
  showSubmitBtn = true,
  onConfirm,
  confirmText = "Save",
  title = "Confirmation",
  titleClass =  "mt-5 mb-3 text-main-100 text-xl font-bold",
  text = "Are you sure you want to delete this data?",
  textClass= "text-slate-500 text-base",
  data,
  icon = <QuestionMarkCircledIcon height={56} width={56} color="#037DC3" />,
  isLoading = false,
  disableCancel = false,
  buttonForm = "",
  buttonType = "button",
  width = 500,
  contentClassName= "p-5 rounded-2xl"
}) => {
  return (
    <Dialog
      closable={false}
      isOpen={isOpen}
      onClose={onClose}
      onRequestClose={onClose}
      width={width}
      contentClassName={contentClassName}
    >
      <div className="flex flex-col justify-center items-center text-center py-4">
        {icon}
        <div className={titleClass}>{title}</div>
        <div className={textClass}>{text}</div>
      </div>
      {data && (
        <div className="text-main-100 text-center font-bold text-base">{data}</div>
      )}
      {children}
      <div className="flex justify-center items-center gap-5 mt-5">
        {showCancelBtn && (
          <Button
            type="button"
            variant="default"
            onClick={onClose}
            disabled={disableCancel}
            className="ltr:mr-2 rtl:ml-2 !bg-transparent !w-[120px] !h-10"
          >
            Cancel
          </Button>
        )}
        {
          showSubmitBtn && (
        <Button
          loading={isLoading}
          type={buttonType}
          size="md"
          form={buttonForm}
          variant="solid"
          onClick={onConfirm}
          className="!w-[120px] !h-10"
        >
          {confirmText}
        </Button>
          )
        }
      </div>
    </Dialog>
  );
};

export default ConfirmationCustom;
