import FormAddTrialFormula from "components/rmp/R&D/TrialFormula/FormAddTrialFormula";
import { useSelector } from "react-redux";

function AddBahanKemas() {
  const { isEdit } = useSelector((state) => state.rnd);

  return (
    <>
      <div className="p-6 bg-white rounded-lg">
        <div className=" p-2">
          <h1 className="text-2xl font-semibold text-indigo-900 mb-4">
            Trial Formula
          </h1>
        </div>
        <div className="border-b border-gray-400 my-2"></div>
        <div className="p-4">
          <FormAddTrialFormula isEdit={isEdit} />
        </div>
      </div>
    </>
  );
}

export default AddBahanKemas;
