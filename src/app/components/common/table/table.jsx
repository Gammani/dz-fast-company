import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ onSort, selectedSort, columns, data, children, filterNamesUser, allUsers, searchValue }) => {
    return (
        <table className="table">
            {
                children || (
                    <>
                        <TableHeader {...{ onSort, selectedSort, columns }}/>
                        <TableBody {...{ columns, data, filterNamesUser, allUsers, searchValue }}/>
                    </>
                )
            }
        </table>
    );
};

Table.propTypes = {
    onSort: PropTypes.func,
    selectedSort: PropTypes.object,
    columns: PropTypes.object,
    data: PropTypes.array,
    children: PropTypes.array,
    filterNamesUser: PropTypes.func,
    allUsers: PropTypes.array,
    searchValue: PropTypes.string
};

export default Table;
