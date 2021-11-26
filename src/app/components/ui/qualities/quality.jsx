import React from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQuality";

const Quality = ({ id }) => {
    const { isLoading, getQuality } = useQualities();
    const quality = getQuality(id);
    return (
        <>
            {
                !isLoading
                    ? <span className={"badge m-1 bg-" + quality.color} key={quality._id}>
                        {quality.name}
                    </span>
                    : "loading..."
            }
        </>
    );
};
Quality.propTypes = {
    id: PropTypes.string
};

export default Quality;
