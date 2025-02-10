import React from "react";
import { formatDate } from "utils/helpers";

const Timeline = ({ steps }) => {
  return (
    <div className="relative right-[32%]">
      {steps?.map((step, index) => (
        <div key={index} className="mb-8 flex items-start">
          {/* Vertical line */}
          {index !== steps?.length - 1 && (
            <div className="absolute left-[50%] top-0 h-full w-0.5 bg-gray-200" />
          )}

          {/* Timeline content */}
          <div className="flex items-center w-full">
            {/* Date on the left */}
            <div className="flex-1 text-right pr-4">
              <div className="inline-flex items-center space-x-2">
                <div className="text-sm text-gray-500">
                  {formatDate(step.date)}
                </div>
                {step.additionalInfo && (
                  <div
                    className={`text-sm ${step.additionalInfoColor} px-2 py-1 text-white rounded w-[100px] text-center`}
                  >
                    {step.additionalInfo}
                  </div>
                )}
              </div>
            </div>

            {/* Circle indicator */}
            <div
              className={`relative z-10 flex h-6 w-6 items-center justify-center rounded-full ${
                step.completed ? "bg-gray-500" : "bg-gray-200"
              }`}
            ></div>

            {/* Content on the right */}
            <div className="flex-1 pl-4">
              <div className="mt-1 text-sm font-semibold">{step.title}</div>
              <div className="text-sm text-gray-500">{step.description}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
