import { useState } from "react";

import { globalSearch } from "../../api/searchApi";

function SearchBar() {
  const [keyword, setKeyword] = useState("");

  const [results, setResults] = useState(null);

  const search = async () => {
    if (!keyword) {
      return;
    }

    const data = await globalSearch(keyword);

    setResults(data);
  };

  return (
    <div>
      <input
        type="text"

        placeholder="Search"

        value={keyword}

        onChange={(e) => setKeyword(e.target.value)}
      />

      <button onClick={search}>Search</button>
    </div>
  );
}

export default SearchBar;
