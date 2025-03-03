import { getRndProcessListApi } from "services/RndService";
import { useState } from "react";

function useProcessRnd() {
  const [dataProcessRnd, setDataProcessRnd] = useState([]);

  const getProcessRnd = async () => {
    try {
      const response = await getRndProcessListApi();
      setDataProcessRnd(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return {
    dataProcessRnd,
    getProcessRnd,
  };
}

export default useProcessRnd;
