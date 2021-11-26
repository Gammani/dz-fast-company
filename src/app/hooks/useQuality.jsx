import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import qualityService from "../services/quality.service";
import { toast } from "react-toastify";

const QualityContext = React.createContext();

export const useQualities = () => {
    return useContext(QualityContext);
};

export const QualityProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true);
    const [qualities, setQualities] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);
    useEffect(() => {
        getQualities();
    }, []);
    const getQuality = (id) => qualities.find(q => q._id === id);
    async function getQualities() {
        try {
            const { content } = await qualityService.get();
            setQualities(content);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    };
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
        setLoading(false);
    };
    return (
        <QualityContext.Provider value={{ isLoading, qualities, getQuality }}>
            { children }
        </QualityContext.Provider>
    );
};
QualityProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
