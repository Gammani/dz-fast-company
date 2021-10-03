import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import api from "../api";
import QualitiesList from "./qualitiesList";

const UserId = ({ id }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(id).then((data) => setUser(data));
    }, []);
    const history = useHistory();
    const handleBackToUsers = () => {
        history.replace("/users");
    };
    console.log(user);
    if (user) {
        return (
            <>
                <h1>
                    {user.name}
                </h1>
                <h2>
                     Профессия: {user.profession.name}
                </h2>
                <div>
                    <QualitiesList qualities={user.qualities}/>
                </div>
                <h3>
                    completed Meetings: {user.completedMeetings}
                </h3>
                <h1>
                    Rate: {user.rate}
                </h1>
                <button onClick={() => handleBackToUsers()}>Все Пользователи</button>
            </>
        );
    }
    return "loading...";
};

UserId.propTypes = {
    id: PropTypes.string
};
export default UserId;
