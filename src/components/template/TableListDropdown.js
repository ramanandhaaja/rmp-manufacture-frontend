import { Dropdown } from "components/ui";
import { HiDotsHorizontal } from "react-icons/hi";

const TableListDropdown = ({ dropdownItemList }) => {
  return (
    <div className="relative">
      <Dropdown
        menuStyle={{ minWidth: 205 }}
        renderTitle={
          <HiDotsHorizontal size={20} className="cursor-pointer text-black" />
        }
        placement="bottom-end"
      >
        {dropdownItemList.map((item) =>
          item.subMenu ? (
            // Render nested menu
            <Dropdown.Menu
              key={item.label}
              title={
                <div className="flex justify-between items-center w-full text-black mr-[100px]">
                  <span>{item.label}</span>
                  {item.icon && (
                    <span className="text-lg text-black">{item.icon}</span>
                  )}
                </div>
              }
              placement="middle-start-bottom"
              className="text-black "
            >
              {item.subMenu.map((subItem) => (
                <Dropdown.Item
                  key={subItem.label}
                  eventKey={`${item.label}.${subItem.label}`}
                  className="mb-1 flex justify-between items-center text-black min-w-[205px]"
                  onClick={subItem.onClick}
                >
                  <span className="text-black">{subItem.label}</span>
                  {subItem.icon && (
                    <span className=" text-black">{subItem.icon}</span>
                  )}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          ) : (
            // Render regular menu item
            <Dropdown.Item
              key={item.label}
              eventKey={item.label}
              className="mb-1 flex justify-between items-center w-full"
              onClick={item.onClick}
            >
              <span className="text-black">{item.label}</span>
              {item.icon && (
                <span className="text-lg text-black">{item.icon}</span>
              )}
            </Dropdown.Item>
          )
        )}
      </Dropdown>
    </div>
  );
};

export default TableListDropdown;
