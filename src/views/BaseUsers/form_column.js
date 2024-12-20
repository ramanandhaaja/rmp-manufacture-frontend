import React from "react";
import { Checkbox } from "components/ui";

import { PageConfig } from "./config";

export const FormColumn = ({ checkboxList, setCheckboxList }) => {
  const onCheckboxChange = (options, e) => {
    setCheckboxList(options);
  };

  return (
    <div className="pb-3">
      <h5 className="mb-4">Columns</h5>

      <div>
        <Checkbox.Group
          vertical
          value={checkboxList}
          onChange={onCheckboxChange}
          className="lg:grid grid-cols-8 gap-1"
        >
          {PageConfig.listFields.map((item) => {
            return (
              <Checkbox key={item.key} value={item.key}>
                {item.label}
              </Checkbox>
            );
          })}
        </Checkbox.Group>
      </div>
    </div>
  );
};
