import { Button } from "components/ui";
import { PageConfig } from "./config";

export const Details = ({ item, onDialogClose }) => {
  return (
    <>
      <h5 className="mb-4 text-center">Details</h5>

      {PageConfig.formFields.map((i) => {
        return (
          <div class="flex flex-row mb-3" key={i.key}>
            <div class="basis-1/4">{i.label}</div>
            <div class="basis-3/4">{item[i.key] ?? ""}</div>
          </div>
        );
      })}

      <div className="text-center mt-6">
        <Button
          className=" min-w-[250px] "
          type="button"
          onClick={onDialogClose}
        >
          Close
        </Button>
      </div>
    </>
  );
};
