import Accordion, { AccordionItem } from "components/ui/Accordion/index";
import { Button } from "components/ui";
import { useState } from "react";
import { productDevelopmentData } from "./dummyData";
import { HiDotsHorizontal } from "react-icons/hi";

const ProcessDevelopment = () => {
  return (
    <div className="space-y-4">
      {productDevelopmentData.map((data, index) => (
        <Accordion key={index} className="border rounded-md  ">
          <AccordionItem
            title={
              <div>
                <h2 className="text-base font-bold ">
                  {data.id}. {data.title}
                </h2>
              </div>
            }
          >
            <div className="block">
              <ul>
                {data.items.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between text-base py-6 px-4 "
                  >
                    <p className="font-semibold ">
                      {item.id} {item.title}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="border border-gray-400 h-8 px-3 py-1 rounded text-sm ">
                        Konfirmasi
                      </div>
                      <button>
                        <HiDotsHorizontal color="black" size={20} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};

export default ProcessDevelopment;
