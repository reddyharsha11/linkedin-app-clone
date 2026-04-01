import { useState } from "react";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="flex justify-center mt-6 mb-3">
      <input
        type="text"
        placeholder="Search Any Events..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-3/4 p-2 rounded-l-lg outline-none border-2 border-[#D81B9A] text-white"
      />
      <button className="bg-[#FF8212] text-white px-4 rounded-r-lg hover:bg-[#D81B9A]">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
