import { IoSearchOutline } from "react-icons/io5";

const SearchBar = ({ placeholder }) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        className="pl-4 pr-10 py-2 border border-gray-200 rounded-md w-80"
      />
      <IoSearchOutline
        size={20}
        className="absolute left-[280px] top-2.5 text-gray-400"
      />
    </div>
  );
};
export default SearchBar;
