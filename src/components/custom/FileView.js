import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import PdfSvg from 'assets/svg/PdfSvg';
import ExcelSvg from 'assets/svg/ExcelSvg';

export const FileView = ({
  extension,
  withDelete = false,
  setFieldValue,
  fileName,
  withOpen = false,
  url,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative rounded-xl border-[1px] border-slate-300 w-[100px] h-[100px] ${
        extension === 'pdf' && 'p-1'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {extension === 'pdf' ? <PdfSvg /> : <ExcelSvg />}

      {withDelete && (
        <div
          onClick={setFieldValue}
          className="absolute top-1 right-1 cursor-pointer z-10 bg-white shadow-sm rounded-full p-1"
        >
          <IoMdClose />
        </div>
      )}

      {isHovered && (
        <>
          {withOpen ? (
            <a href={url} target="_blank" download={fileName} rel="noreferrer">
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-black bg-opacity-50 text-white">
                <span className="truncate">
                  {fileName}.{extension}
                </span>
              </div>
            </a>
          ) : (
            <div className="absolute inset-0 z-0 flex justify-center items-center bg-black bg-opacity-50 text-white">
              <span className="truncate">
                {fileName}.{extension}
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};
