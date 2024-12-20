export const ImageView = ({ name, url, setIsFilePopUp, setFilePopUp }) => {
  return (
    <div
      className="border-[1px] border-slate-300 rounded-xl cursor-pointer w-max"
      onClick={() => {
        setIsFilePopUp(true);
        setFilePopUp({
          url: url,
          name: name,
        });
      }}
    >
      <img
        src={url}
        alt={name}
        className="h-[100px] w-[100px] object-contain"
      />
    </div>
  );
};
