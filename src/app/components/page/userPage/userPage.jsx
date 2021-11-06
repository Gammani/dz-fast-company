import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import UserCard from "../../ui/userCard";
import QualitiesUserCard from "../../ui/qualitiesUserCard";
import MeetingUserCard from "../../ui/meetingUserCard";
import UserFormComment from "../../ui/userFormComment";
import UserComments from "../../ui/userComments";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();
    const [allUsers, setAllUsers] = useState();
    const [commentsForUser, setCommentsForUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then(data => setUser(data));
        api.users.fetchAll().then(data => { setAllUsers(data); });
    }, []);
    useEffect(() => {
        api.comments.fetchCommentsForUser(userId).then(data => setCommentsForUser(data));
    }, []);

    if (user) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard userId={userId} user={user}/>
                        <QualitiesUserCard data={user.qualities}/>
                        <MeetingUserCard value={user.completedMeetings}/>
                    </div>
                    <div className="col-md-8">
                        <UserFormComment userId={userId} allUsers={allUsers} setCommentsForUser={setCommentsForUser}/>
                        <UserComments userId={userId} allUsers={allUsers} setCommentsForUser={setCommentsForUser} commentsForUser={commentsForUser}/>
                    </div>
                </div>
            </div>
        );
    } else {
        return <h1>loading...</h1>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};
export default UserPage;
