import React from 'react';
import PdfSvg from 'assets/svg/PdfSvg';
import ExcelSvg from 'assets/svg/ExcelSvg';
import WordSvg from 'assets/svg/WordSvg';
import { FileView } from './FileView';
import { ImageView } from './ImageView';

const FileHandler = ({ file, setIsFilePopUp, setFilePopUp }) => {
  if (!file?.url) return <span>No Data</span>;

  const getFileType = extension => {
    const ext = extension?.toLowerCase();
    if (ext === 'pdf') return 'pdf';
    if (ext?.includes('xls')) return 'excel';
    if (ext?.includes('doc') || ext?.includes('docx')) return 'word';
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) return 'image';
    return 'unknown';
  };

  const getIcon = fileType => {
    switch (fileType) {
      case 'pdf':
        return <PdfSvg />;
      case 'excel':
        return <ExcelSvg />;
      case 'word':
        return <WordSvg />;
      default:
        return null;
    }
  };

  const fileType = getFileType(file.extension);

  if (fileType === 'image') {
    return (
      <ImageView
        url={file.url}
        name={file.name || 'file'}
        setIsFilePopUp={setIsFilePopUp}
        setFilePopUp={setFilePopUp}
      />
    );
  }

  if (['pdf', 'excel', 'word'].includes(fileType)) {
    return (
      <FileView
        extension={file.extension?.toLowerCase()}
        fileName={file.name}
        withOpen={true}
        url={file.url}
        icon={getIcon(fileType)}
      />
    );
  }

  // Fallback for unknown file types
  return (
    <a
      href={file.url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sky-600 hover:text-sky-700 underline"
    >
      View Document
    </a>
  );
};

export default FileHandler;
