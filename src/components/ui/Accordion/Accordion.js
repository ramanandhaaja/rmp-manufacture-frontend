// src/components/Accordion.js
import React, { useEffect, useState } from 'react';
import Button from '../Buttons';
import { DragHandleDots2Icon, TrashIcon } from '@radix-ui/react-icons';

const AccordionItem = ({
  title,
  children,
  withDeleteHeader,
  isActive,
  onItemClick,
  headerClass,
  provided,
  onDeleteCard,
  isDelete = true,
  withDragHandle = true,
  bodyClass = '',
  titleClass = '',
  isExpandedActive = true,
  textColor = '',
}) => {
  return (
    <div className="rounded-b-md">
      <div
        className={`flex items-center justify-between p-4 cursor-pointer shadow-inner ${headerClass}`}
        onClick={onItemClick}
      >
        {withDeleteHeader ? (
          <div className="flex flex-row justify-between w-full">
            {withDragHandle ? (
              <div className="flex flex-row items-center">
                <Button
                  variant="plain"
                  type="button"
                  className="w-4 h-4 mr-2"
                  icon={<DragHandleDots2Icon />}
                  {...provided?.dragHandleProps}
                />
                <div className="text-main-100">{title}</div>
              </div>
            ) : (
              <div className={`${textColor} text-main-100`}>{title}</div>
            )}

            {!isDelete ? null : (
              <Button
                className="items-center"
                variant="plain"
                color="red-600"
                icon={
                  <TrashIcon height={24} width={24} className="text-red-600" />
                }
                onClick={onDeleteCard}
              >
                <div className="font-nunito font-bold mt-[2px] text-red-600">
                  Delete
                </div>
              </Button>
            )}
          </div>
        ) : (
          <span
            className={`text-main-100 text-sm font-normal font-['Nunito Sans'] leading-tight ${titleClass}`}
          >
            {title}
          </span>
        )}
        {isExpandedActive && (
          <svg
            className={`w-6 h-6 transition-transform transform ${
              isActive ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="#94A3B8"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </div>
      {!isExpandedActive && (
        <div className={`p-4 bg-white rounded-b-md shadow-inner ${bodyClass}`}>
          {children}
        </div>
      )}
      {isActive && isExpandedActive && (
        <div className={`p-4 bg-white rounded-b-md shadow-inner ${bodyClass}`}>
          {children}
        </div>
      )}
    </div>
  );
};

const Accordion = ({ children, className, indexActive }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    setActiveIndex(indexActive);
  }, []);

  const handleItemClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };
  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            isActive: index === activeIndex,
            onItemClick: () => handleItemClick(index),
          });
        }
        return null;
      })}
    </div>
  );
};

export { Accordion, AccordionItem };
