import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ length, renderPhrase }) => {
    return (
        <h1>
            <span
                className={
                    length === 0 ? "badge bg-danger" : "badge bg-primary"
                }
            >{`${renderPhrase(length)}`}</span>
        </h1>
    );
};

SearchStatus.propTypes = {
    length: PropTypes.number,
    renderPhrase: PropTypes.func.isRequired
};

export default SearchStatus;
