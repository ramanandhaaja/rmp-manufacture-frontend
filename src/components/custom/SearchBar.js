import { IoSearchOutline } from "react-icons/io5";
import { Input } from "components/ui";
import { useRef, useState, useCallback } from "react";
import debounce from "lodash/debounce";

const SearchBar = ({
  placeholder,
  onSearch,
  debounceTime = 500, // default debounce time in milliseconds
  className = "",
  index,
}) => {
  const searchInput = useRef();
  const [searchTerm, setSearchTerm] = useState("");

  // Create a debounced version of the search function
  const debouncedSearch = useCallback(
    debounce((searchValue) => {
      if (onSearch) {
        onSearch(searchValue, index);
      }
    }, debounceTime),
    [onSearch, debounceTime]
  );

  // Handle input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <div className="relative">
      <Input
        search
        ref={searchInput}
        className={`text-blue-999 lg:w-[320px] lg:mb-0 mb-4 mr-2 ${className}`}
        size="md"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleSearchChange}
        suffix={<IoSearchOutline className="text-lg text-blue-999" />}
      />
    </div>
  );
};

export default SearchBar;
