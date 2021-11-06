import React from "react";
import { showDate } from "../../utils/date";
import PropTypes from "prop-types";
import api from "../../api";

const UserComments = ({ userId, allUsers, commentsForUser, setCommentsForUser }) => {
    const removeMessage = (commentId) => {
        api.comments.remove(commentId);
        api.comments.fetchCommentsForUser(userId).then(data => setCommentsForUser(data));
    };
    const getUserName = (id) => {
        if (allUsers) {
            const user = allUsers.filter(user => user._id === id);
            return user[0].name;
        }
    };
    return (
        <div className="card mb-3">
            <div className="card-body">
                <h2>Comments</h2>
                <hr/>
                {
                    commentsForUser && commentsForUser.map(comment => {
                        return (
                            <div className="bg-light card-body mb-3" key={comment._id}>
                                <div className="row">
                                    <div className="col">
                                        <div className="d-flex flex-start">
                                            <img
                                                src={`https://avatars.dicebear.com/api/avataaars/${(
                                                    Math.random() + 1
                                                )
                                                    .toString(36)
                                                    .substring(7)}.svg`}
                                                className="
                                                    rounded-circle
                                                    shadow-1-strong
                                                    me-3
                                                "
                                                alt="avatar"
                                                width="65"
                                                height="65"
                                            />
                                            <div
                                                className="
                                                    flex-grow-1 flex-shrink-1
                                                "
                                            >
                                                <div className="mb-4">
                                                    <div
                                                        className="
                                                            d-flex
                                                            justify-content-between
                                                            align-items-center
                                                        "
                                                    >
                                                        <p className="mb-1">
                                                            {`${getUserName(comment.userId)} - `}
                                                            <span className="small">
                                                                {showDate(comment.created_at)}
                                                            </span>
                                                        </p>
                                                        <button
                                                            className="
                                                                btn btn-sm
                                                                d-flex
                                                                align-items-center
                                                            "
                                                            onClick={() => removeMessage(comment._id)}
                                                        >{<i className="bi bi-trash"></i>}
                                                            <i
                                                                className="
                                                                    bi bi-x-lg
                                                                "
                                                            ></i>
                                                        </button>
                                                    </div>
                                                    <p className="small mb-0">
                                                        {comment.content}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};
UserComments.propTypes = {
    userId: PropTypes.string,
    allUsers: PropTypes.array,
    commentsForUser: PropTypes.string,
    setCommentsForUser: PropTypes.func
};
export default UserComments;
