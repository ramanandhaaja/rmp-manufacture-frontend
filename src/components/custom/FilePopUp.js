import { Dialog } from 'components/ui';

const FilePopUp = ({ modalIsOpen, onModalClose, filePopUp }) => {
  return (
    <Dialog
      isOpen={modalIsOpen}
      width={800}
      onClose={onModalClose}
      onRequestClose={onModalClose}
      className="!p-0 !w-max !max-w-[60%]"
      bodyOpenClassName="dialog-scroll"
    >
      <div className="flex h-full w-full">
        <div className="flex flex-1 p-5 rounded-xl">
          <img
            src={filePopUp?.url}
            alt={filePopUp?.name}
            className="object-contain rounded-md"
          />
        </div>
      </div>
    </Dialog>
  );
};

export default FilePopUp;
