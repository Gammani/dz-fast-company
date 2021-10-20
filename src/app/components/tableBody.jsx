import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const TableBody = ({ data, columns, filterNamesUser, allUsers, searchValue }) => {
    const renderContent = (item, column) => {
        if (columns[column].component) {
            const component = columns[column].component;
            if (typeof component === "function") {
                return component(item);
            }
            return component;
        } else {
            return _.get(item, columns[column].path);
        }
    };

    return (
        <tbody>
            { searchValue !== "" ? allUsers.filter(filterNamesUser).map((item) => (<tr key={item._id}>{Object.keys(columns).map((column) => (<td key={column}>{ renderContent(item, column) }</td>))}</tr>)) : data.filter(filterNamesUser).map((item) => (<tr key={item._id}>{Object.keys(columns).map((column) => (<td key={column}>{ renderContent(item, column) }</td>))}</tr>))}
        </tbody>
    );
};
TableBody.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.object.isRequired,
    filterNamesUser: PropTypes.func,
    allUsers: PropTypes.array,
    searchValue: PropTypes.string
};

export default TableBody;
