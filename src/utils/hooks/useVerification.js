import { putVerficationStatus } from "../../services/VendorServices";
import { useState } from "react";

function useVerification() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState(null);

  const setStatusApi = async ({ id, data }) => {
    try {
      const response = await putVerficationStatus({ id, data });
      console.log(response);
      if (response.data.success == true) {
        console.log(response);
        setSuccess(true);
        setMessage(response.message);
        return {
          status: "success",
          message: response.message,
        };
      } else {
        console.log(response);
        setError(response.message || "Failed to update status");
        return {
          status: "error",
          message: response.message,
        };
      }
    } catch (err) {
      console.log("catch error", err);
      setError(err.message || "An error occurred");
      return {
        status: "error",
        message: err.message,
      };
    } finally {
      setLoading(false);
    }
  };
  return { setStatusApi, loading, error, success, message };
}
export default useVerification;
