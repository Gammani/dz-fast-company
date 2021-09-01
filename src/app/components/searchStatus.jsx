import React from "react";

const SearchStatus = ({length, renderPhrase}) => {

    return <h1 ><span className={length === 0 ? "badge bg-danger" : "badge bg-primary"}>{`${renderPhrase(length)}`}</span></h1>
};

export default SearchStatus;
