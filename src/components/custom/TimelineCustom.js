import React from "react";
import { formatDate } from "utils/helpers";
// dummy data step
const steps = [
  {
    date: "2024-05-19",
    title: "PO [PO0001] ATK Kantor - Bermasalah",
    description: "Lorem Ipsum",
    completed: true,
  },
  {
    date: "2024-04-14",
    title: "PO [PO0002] ATK Kantor - Bermasalah",
    description: "Lorem Ipsum",
    completed: false,
  },
  {
    date: "2024-04-14",
    title: "PO [PO0003] ATK Kantor - Baik",
    description: "Lorem Ipsum",
    completed: false,
  },
  {
    date: "2024-04-14",
    title: "PO [PO0004] ATK Kantor - Baik",
    description: "Lorem Ipsum",
    completed: false,
  },
  {
    date: "2024-04-13",
    title: "PO [PO0005] ATK Kantor - Baik",
    description: "Lorem Ipsum",
    completed: false,
  },
  {
    date: "2024-04-12",
    title: "PO [PO0006] ATK Kantor - Baik",
    description: "Lorem Ipsum",
    completed: false,
  },
];

const Timeline = () => {
  return (
    <div className="relative right-[40%]">
      {steps?.map((step, index) => (
        <div key={index} className="mb-8 flex items-start">
          {/* Vertical line */}
          {index !== steps.length - 1 && (
            <div className="absolute left-[50%] top-0 h-full w-0.5 bg-gray-200" />
          )}

          {/* Timeline content */}
          <div className="flex items-center w-full">
            {/* Date on the left */}
            <div className="flex-1 text-right pr-4">
              <div className="text-sm text-gray-500">
                {formatDate(step.date)}
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
