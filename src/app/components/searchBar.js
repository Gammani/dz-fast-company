import React from "react";
import PropTypes from "prop-types";

function SearchBar({ value, onSearch, setSelectedProf }) {
    value !== "" && setSelectedProf();
    return (
        <input
            type="text"
            onChange={(e) => onSearch(e.target.value)}
            value={value}
            placeholder={"Search..."}
        />
    );
};

SearchBar.propTypes = {
    value: PropTypes.string,
    onSearch: PropTypes.func,
    setSelectedProf: PropTypes.func
};

export default SearchBar;
