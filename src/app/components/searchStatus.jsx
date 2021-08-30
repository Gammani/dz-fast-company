import React from "react";

const SearchStatus = ({length, ...rest}) => {

    return <h1 ><span className={length === 0 ? "badge bg-danger" : "badge bg-primary"}>{`${rest.handlePhrase(length)}`}</span></h1>
};

export default SearchStatus;
