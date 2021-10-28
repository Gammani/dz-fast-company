import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({ options, onChange, name, label, defaultValue }) => {
    const optionsArray = !Array.isArray(options) && typeof (options) === "object"
        ? Object.keys(options).map(optionName => ({ label: options[optionName].name, value: options[optionName]._id, color: options[optionName].color }))
        : options;
    const handleChange = (oldValue) => {
        onChange({ name, value: oldValue.map(value => ({ name: value.label, _id: value.value, color: value.color })) });
    };
    return (
        <div className={"mb-4"}>
            <label className="form-label">
                {label}
            </label>
            <Select
                defaultValue={defaultValue && defaultValue.map(optionName => ({ label: optionName.name, value: optionName._id, color: optionName.color }))}
                isMulti
                closeMenuOnSelect={false}
                options={optionsArray}
                className={"basic-multi-select"}
                classNamePrefix={"select"}
                onChange={handleChange}
                name={name}
            />
        </div>
    );
};
MultiSelectField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    defaultValue: PropTypes.array
};
export default MultiSelectField;
