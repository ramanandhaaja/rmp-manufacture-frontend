import { Notification, toast } from "components/ui";
import { IoMdClose } from "react-icons/io";
// import Resizer from "react-image-file-resizer"
// import { apiFile } from "services/ApiBase"
import dayjs from "dayjs";
import FileSvg from "assets/svg/FileSvg";
import { TrashIcon } from "@radix-ui/react-icons";
import { RMPSTATUSCOLOR } from "constants/status.constant";
// export const resizeFile = (file) =>
//   new Promise((resolve) => {
//     Resizer.imageFileResizer(
//       file,
//       300,
//       300,
//       "JPEG",
//       100,
//       0,
//       (uri) => {
//         resolve(uri);
//       },
//       "blob"
//     );
//   });

export const beforeUploadFile = (files) => {
  let valid = true;

  const allowedFileType = ["image/jpeg", "image/png", "image/*"];
  const maxFileSize = 15000000;

  if (files) {
    for (const f of files) {
      if (!allowedFileType.includes(f.type)) {
        valid = "Please upload a .jpeg or .png file!";
      }

      if (f.size >= maxFileSize) {
        valid = "Upload image cannot more then 15mb!";
      }
    }
  }

  return valid;
};

// export const onUploadFile = async (
//   nameTemp,
//   file,
//   setFieldValue,
//   setLoadingUpload,
//   isMultiple = false,
//   values = {},
//   push
// ) => {
//   setLoadingUpload(true);
//   try {
//     const formData = new FormData();
//     const compressedFile = await resizeFile(file?.[0]);
//     formData.append("file", compressedFile);
//     const result = await apiFile(formData);

//     if (result?.data) {
//       if (isMultiple) {
//         push(result?.data);
//         setFieldValue(`${nameTemp}_id.${values.length + 1}`, result?.data?.id);
//       } else {
//         setFieldValue(nameTemp, result?.data);
//         setFieldValue(`${nameTemp}_id`, result?.data?.id);
//       }
//     }
//     setLoadingUpload(false);
//   } catch (error) {
//     toast.push(
//       <Notification title={"Error"} type="danger">
//         {error?.response?.data?.message ||
//           error?.message ||
//           "Something went wrong"}
//       </Notification>,
//       {
//         placement: "top-center",
//       }
//     );
//     setLoadingUpload(false);
//   }
// };

export const openNotification = (title, type, value) => {
  toast.push(
    <Notification title={title} type={type}>
      {value}
    </Notification>
  );
};

export const ImageView = ({
  name,
  setFieldValue,
  values,
  isMultiple,
  index,
  remove,
  withClose = true,
}) => {
  const imageUrl = isMultiple ? values[name][index]?.url : values[name]?.url;
  const filename = isMultiple
    ? values[name][index]?.filename
    : values[name]?.filename;

  const clearValues = () => {
    setFieldValue(`${name}_id`, "");
    if (isMultiple) {
      remove(index);
    } else {
      setFieldValue(`${name}`, "");
    }
  };

  return (
    <div className="relative rounded border-[1px] border-slate-300 flex justify-center items-center">
      <a href={imageUrl} target="_blank" download={filename} rel="noreferrer">
        <img
          src={imageUrl}
          alt="Upload"
          className="h-[100px] w-[100px] object-contain"
        />
      </a>
      {withClose && (
        <div
          onClick={clearValues}
          className="absolute top-0 right-0 cursor-pointer z-0 bg-white shadow-sm rounded-full p-1"
        >
          <IoMdClose />
        </div>
      )}
    </div>
  );
};

export function parseCurrency(priceString) {
  if (priceString === null || priceString === undefined) {
    return ""; // Handle null or undefined input
  }

  const numberValue = Number(priceString);

  if (!isNaN(numberValue)) {
    const formattedNumber = numberValue.toLocaleString("id-ID", {
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return formattedNumber;
  } else {
    const numberValue = parseFloat(priceString);
    if (!isNaN(numberValue)) {
      const formattedNumber = numberValue.toLocaleString("id-ID", {
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
      return formattedNumber;
    } else {
      const numberValue = parseInt(priceString);

      if (!isNaN(numberValue)) {
        const formattedNumber = numberValue.toLocaleString("id-ID", {
          currency: "IDR",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        });
        return formattedNumber;
      }
    }
  }

  return "";
}

export const FileView = ({
  name,
  setFieldValue,
  values,
  isMultiple,
  index,
  remove,
}) => {
  const url = isMultiple ? values[name][index]?.url : values[name]?.url;
  const filename = isMultiple
    ? values[name][index]?.filename
    : values[name]?.filename;

  const clearValues = () => {
    setFieldValue(`${name}_id`, "");
    if (isMultiple) {
      remove(index);
    } else {
      setFieldValue(`${name}`, "");
    }
  };

  return (
    <div className="relative flex justify-center items-center">
      <a href={url} target="_blank" download={filename} rel="noreferrer">
        <div className="flex-col justify-start items-start gap-2 inline-flex object-contain">
          <div className="w-20 h-20 px-[7px] rounded border border-slate-200 justify-center items-center gap-2.5 inline-flex">
            <FileSvg />
          </div>
          <div className="text-zinc-800 text-xs font-normal font-['Nunito Sans']">
            {filename}
          </div>
        </div>
      </a>
      <div
        onClick={clearValues}
        className="absolute top-0 right-0 cursor-pointer z-0 bg-white shadow-sm rounded-full p-1"
      >
        <IoMdClose />
      </div>
    </div>
  );
};

export const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export const setFieldDate = (form, field, date) => {
  if (date) {
    return form.setFieldValue(field.name, dayjs(date).format("DD/MM/YYYY"));
  } else {
    return form.setFieldValue(field.name, "");
  }
};

export const parsedErrors = (error) => {
  let detailMessage = "";
  if (typeof error?.response?.data?.errors === "object") {
    const object = error?.response?.data?.errors;
    for (const property in object) {
      detailMessage += `${object[property]}`;
    }
  }
  return detailMessage;
};

export function generateRandomKey() {
  var minm = 100000;
  var maxm = 999999;
  return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
}

export const formatDate = (dateString) => {
  if (!dateString) return "-";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "-";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export function parseDate(inputDate) {
  const parts = inputDate.split("/");
  // JavaScript Date object month is zero-based, so subtract 1 from the month
  const date = new Date(parts[2], parts[1] - 1, parts[0]);
  const parsedDate = date.toISOString().split("T")[0]; // Extract YYYY-MM-DD
  return parsedDate;
}

export const SingleImageView = ({
  name,
  setFieldValue,
  values,
  isMultiple,
  index,
  remove,
}) => {
  const imageUrl = isMultiple ? values[name][index]?.url : values[name]?.url;
  const filename = isMultiple
    ? values[name][index]?.filename
    : values[name]?.filename;

  const clearValues = () => {
    setFieldValue(`${name}_id`, "");
    if (isMultiple) {
      remove(index);
    } else {
      setFieldValue(`${name}`, "");
    }
  };

  return (
    <div className="relative">
      <a
        href={imageUrl}
        target="_blank"
        download={filename}
        className="rounded-xl"
        rel="noreferrer"
      >
        <img
          src={imageUrl}
          alt="Upload"
          className="h-[100px] w-[100px] object-fill rounded-xl "
        />
      </a>
      <div
        onClick={clearValues}
        className="absolute bottom-[5px] left-[70px] cursor-pointer z-0 shadow-sm rounded-full p-1 text-red-500"
      >
        <TrashIcon />
      </div>
    </div>
  );
};

export function parsePrice(priceString) {
  const price = parseFloat(priceString);

  return price.toLocaleString();
}

export function formatInt(str) {
  const val = str === "" || !str ? 0 : parseInt(str);

  return val;
}

export function reverseParsePrice(formattedPrice) {
  const priceWithoutCommas = formattedPrice.replace(/,/g, "");
  return parseFloat(priceWithoutCommas);
}

export const checkResponseFetch = (
  navigate,
  resp,
  onSuccess = () => {},
  errorMessage
) => {
  if (
    resp?.status === "success" ||
    resp?.status === 200 ||
    resp?.status === 201
  ) {
    onSuccess();
  } else {
    console.log(resp);
    if (
      resp?.status === 403 ||
      resp?.message === "You can not access this data."
    ) {
      navigate("/access-denied");
    } else if (resp?.status === 404) {
      navigate("/not-found");
    }
    toast.push(
      <Notification type="danger" duration={5000}>
        {errorMessage ?? resp?.message}
      </Notification>
    );
  }
};

export const errorAccessDeniedFetch = (error, navigate) => {
  if (error?.response?.status !== 403) return;
  navigate("/access-denied");
};

export const removeNestedNullUndefined = (obj) => {
  for (const key in obj) {
    if (obj[key] === null || obj[key] === undefined) {
      delete obj[key];
    } else if (typeof obj[key] === "object") {
      removeNestedNullUndefined(obj[key]);
    }
  }
  return obj;
};

export function generateCircleCoordinates(lat, lng, radius, numPoints = 15) {
  const coords = [];
  const earthRadius = 6371000; // Radius of the earth in meters
  const latRadians = (Math.PI / 180) * lat;

  for (let i = 0; i < numPoints; i++) {
    const angle = (2 * Math.PI * i) / numPoints;
    const dx = radius * Math.cos(angle);
    const dy = radius * Math.sin(angle);
    const newLat = lat + (dy / earthRadius) * (180 / Math.PI);
    const newLng =
      lng + (dx / (earthRadius * Math.cos(latRadians))) * (180 / Math.PI);
    coords.push(`${newLat},${newLng}`);
  }
  return coords;
}

export const findDepartement = (id) => {
  if (id === 1) {
    return "Human Resources";
  } else if (id === 2) {
    return "Finance";
  } else if (id === 3) {
    return "IT Support";
  } else {
    return "Unknown";
  }
};

export function getStatusClassName(status) {
  return RMPSTATUSCOLOR[status] || "bg-gray-500 text-white";
}
