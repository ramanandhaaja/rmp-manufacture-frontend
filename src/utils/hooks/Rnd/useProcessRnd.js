import {
  getRndProcessListApi,
  getRndProcessConfirmationApi,
  postRndProcessConfirmationApi,
  postRndProcessDocumentationsApi,
  postRndTrialPackagingMaterialsApi,
  getRndTrialPackagingMaterialsApi,
  deleteRndTrialPackagingMaterialsApi,
  getRndTrialPackagingMaterialsApiById,
  getRndRawMaterialsApi,
  getRndRawMaterialsListApi,
  postRndRawMaterialsApi,
  postTrialFormulaApi,
  getRndTrialFormulationsApi,
  deleteRndTrialFormulationsApi,
  getDetailTrialFormulationsApi,
  postTrialFormulationReportsApi,
  getDetailTrialFormulationReportApi,
  getTrialAnalysisMethodsApi,
  getDetailTrialAnalysisMethodApi,
  postTrialAnalysisMethodApi,
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

  const postRndTrialPackagingMaterials = async (data) => {
    try {
      const response = await postRndTrialPackagingMaterialsApi(data);
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

  const getRndTrialPackagingMaterials = async (params) => {
    try {
      const response = await getRndTrialPackagingMaterialsApi(params);
      if (response.status === 200) {
        return {
          status: "success",
          message: response.data.message,
          data: response.data,
        };
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

  const getRndTrialPackagingMaterialsById = async (id) => {
    try {
      const response = await getRndTrialPackagingMaterialsApiById(id);
      if (response.status === 200) {
        return {
          status: "success",
          message: response.data.message,
          data: response.data,
        };
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

  const deleteRndTrialPackagingMaterials = async (id) => {
    try {
      const response = await deleteRndTrialPackagingMaterialsApi(id);
      console.log(response);
      if (response.status === 204) {
        return {
          status: "success",
          message:
            response.data.message ||
            "Successfully deleted rnd trial packaging materials",
        };
      } else {
        console.log(response);
        return {
          status: "failed",
          message:
            response.data.message ||
            "Failed to delete rnd trial packaging materials",
        };
      }
    } catch (error) {
      console.log(error);
      return {
        status: "failed",
        message: error?.response?.data?.message || error.toString(),
      };
    }
  };

  const getMasterRawMaterials = async (params) => {
    try {
      const response = await getRndRawMaterialsApi(params);
      if (response.status === 200) {
        return {
          status: "success",
          message: response.data.message,
          data: response.data,
        };
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

  const getRndRawMaterials = async (params) => {
    try {
      const response = await getRndRawMaterialsListApi(params);
      if (response.status === 200) {
        return {
          status: "success",
          message: response.data.message,
          data: response.data,
        };
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

  const postRndRawMaterials = async (data) => {
    try {
      const response = await postRndRawMaterialsApi(data);
      if (response.status === 201) {
        return {
          status: "success",
          message: response.data.message,
        };
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

  const getRndTrialFormulations = async (params) => {
    try {
      const response = await getRndTrialFormulationsApi(params);
      if (response.status === 200) {
        return {
          status: "success",
          message: response.data.message,
          data: response.data,
        };
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

  const getDetailTrialFormulations = async (id) => {
    try {
      const response = await getDetailTrialFormulationsApi(id);
      if (response.status === 200) {
        return {
          status: "success",
          message: response.data.message,
          data: response.data,
        };
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

  const postTrialFormula = async (data) => {
    try {
      const response = await postTrialFormulaApi(data);
      if (response.status === 201) {
        return {
          status: "success",
          message: response.data.message,
        };
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

  const deleteRndTrialFormulations = async (id) => {
    try {
      const response = await deleteRndTrialFormulationsApi(id);
      if (response.status === 200) {
        return {
          status: "success",
          message: response.data.message,
        };
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

  const postTrialFormulationReports = async (data) => {
    try {
      const response = await postTrialFormulationReportsApi(data);
      if (response.status === 201) {
        return {
          status: "success",
          message: response.data.message,
        };
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

  const getDetailTrialFormulationsReport = async (id) => {
    try {
      const response = await getDetailTrialFormulationReportApi(id);
      if (response.status === 200) {
        return {
          status: "success",
          message: response.data.message,
          data: response.data,
        };
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

  const getTrialAnalysisMethod = async () => {
    try {
      const response = await getTrialAnalysisMethodsApi();
      if (response.status === 200) {
        return {
          status: "success",
          message: response.data.message,
          data: response.data,
        };
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

  const getDetailTrialAnalysisMethod = async (id) => {
    try {
      const response = await getDetailTrialAnalysisMethodApi(id);
      if (response.status === 200) {
        return {
          status: "success",
          message: response.data.message,
          data: response.data,
        };
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

  const postTrialAnalysisMethod = async (data) => {
    try {
      const response = await postTrialAnalysisMethodApi(data);
      if (response.status === 201) {
        return {
          status: "success",
          message: response.data.message,
        };
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
    postRndTrialPackagingMaterials,
    getRndTrialPackagingMaterials,
    deleteRndTrialPackagingMaterials,
    getRndTrialPackagingMaterialsById,
    getRndRawMaterials,
    postRndRawMaterials,
    getMasterRawMaterials,
    postTrialFormula,
    getRndTrialFormulations,
    deleteRndTrialFormulations,
    getDetailTrialFormulations,
    postTrialFormulationReports,
    getDetailTrialFormulationsReport,
    getTrialAnalysisMethod,
    postTrialAnalysisMethod,
    getDetailTrialAnalysisMethod,
  };
}

export default useProcessRnd;
