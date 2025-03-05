import {
  getRndProcessListApi,
  getRndProcessConfirmationApi,
  postRndProcessConfirmationApi,
  postRndProcessDocumentationsApi,
} from "services/RndService";
import { useState } from "react";

function useProcessRnd() {
  const [dataProcessRnd, setDataProcessRnd] = useState([]);
  const [dataProcessRndConfirmation, setDataProcessRndConfirmation] = useState(
    []
  );

  const getProcessRnd = async () => {
    try {
      const response = await getRndProcessListApi();
      setDataProcessRnd(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getProcessRndConfirmation = async (params) => {
    try {
      const response = await getRndProcessConfirmationApi(params);
      if (response.data) {
        setDataProcessRndConfirmation(response.data);
        return { status: "success", message: "" };
      } else {
        console.log(response);
        return { status: "failed", message: "" };
      }
    } catch (error) {
      console.error(error);
    }
  };

  const postRndProcessConfirmation = async (data) => {
    try {
      const response = await postRndProcessConfirmationApi(data);
      if (response.status === 201) {
        return { status: "success", message: response.data.message };
      } else {
        return { status: "failed", message: response.data.message };
      }
    } catch (error) {
      console.log(error);
      return {
        status: "network error",
        message: error?.message || error.toString(),
      };
    }
  };

  const postRndPraFormulasi = async (data) => {
    try {
      const response = await postRndProcessDocumentationsApi(data);
      console.log(response.status);
      if (response.status === 201) {
        return { status: "success", message: response.data.message };
      } else {
        return { status: "failed", message: response.data.message };
      }
    } catch (error) {
      return {
        status: "network error",
        message: error?.message || error.toString(),
      };
    }
  };
  return {
    dataProcessRnd,
    dataProcessRndConfirmation,
    getProcessRnd,
    getProcessRndConfirmation,
    postRndProcessConfirmation,
    postRndPraFormulasi,
  };
}

export default useProcessRnd;
