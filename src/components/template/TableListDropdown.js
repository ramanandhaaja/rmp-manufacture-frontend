import { Dropdown } from "components/ui";
import { HiDotsHorizontal } from "react-icons/hi";

const TableListDropdown = ({ dropdownItemList }) => {
  return (
    <div>
      <Dropdown
        menuStyle={{ minWidth: 205, marginTop: "20%" }}
        renderTitle={<HiDotsHorizontal size={20} className="cursor-pointer" />}
        placement="middle-end-bottom"
      >
        {dropdownItemList.map((item) => (
          <Dropdown.Item
            eventKey={item.label}
            key={item.label}
            className="mb-1 flex justify-between items-center !text-[#2E3133]"
            onClick={item.onClick}
          >
            {/* <Link className="gap-2 flex justify-between items-center" to={item.path}> */}
            <span>{item.label}</span>
            <span className="text-lg">{item.icon}</span>
            {/* </Link> */}
          </Dropdown.Item>
        ))}
      </Dropdown>
    </div>
  );
};

export default TableListDropdown;
