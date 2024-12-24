import { useState } from "react";
import { getMeasurementUnitsApi } from "services/MeasurementService";

const useMeasurement = () => {
  const [measurementUnits, setMeasurementUnits] = useState([]);

  const getMeasurementUnits = async () => {
    const { data } = await getMeasurementUnitsApi();
    setMeasurementUnits(data);
  };

  return { measurementUnits, getMeasurementUnits };
};

export default useMeasurement;
