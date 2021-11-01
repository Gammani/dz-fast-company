import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import api from "../../../api";
import QualitiesList from "../../ui/qualities";
import { showDate } from "../../../utils/date";

const UserPage = ({ userId }) => {
    const history = useHistory();
    const [user, setUser] = useState();
    const [allUsers, setAllUsers] = useState();
    const [data, setData] = useState();
    const [commentsForUser, setCommentsForUser] = useState();
    const [textValue, setTextValue] = useState("");
    const newTextElement = React.createRef();

    useEffect(() => {
        api.users.getById(userId).then(data => setUser(data));
        api.users.fetchAll().then(data => { setAllUsers(data); });
    }, []);
    useEffect(() => {
        api.comments.fetchCommentsForUser(userId).then(data => setCommentsForUser(data));
    }, []);
    const handleEditUser = () => {
        history.push(`/users/${userId}/edit`);
    };
    const handleChangeUser = ({ target }) => {
        setData((prevState) => ({
            ...prevState,
            pageId: userId,
            userId: target.value
        }));
    };
    const handleChangeText = () => {
        const newText = newTextElement.current.value;
        setTextValue(newText);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const newText = textValue;
        setTextValue("");
        const newDate = { ...data, content: newText };
        api.comments.add(newDate);
        api.comments.fetchCommentsForUser(userId).then(data => setCommentsForUser(data));
    };
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
    if (user) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <div className="card mb-3">
                            <div className="card-body">
                                <button
                                    className="
                                    position-absolute
                                    top-0
                                    end-0
                                    btn btn-light btn-sm
                                "
                                    onClick={handleEditUser}
                                >
                                    <i className="bi bi-gear"></i>
                                </button>
                                <div
                                    className="
                                    d-flex
                                    flex-column
                                    align-items-center
                                    text-center
                                    position-relative
                                "
                                >
                                    <img
                                        src={`https://avatars.dicebear.com/api/avataaars/${(
                                            Math.random() + 1
                                        )
                                            .toString(36)
                                            .substring(7)}.svg`}
                                        className="rounded-circle"
                                        width="150"
                                        alt={"image"}
                                    />
                                    <div className="mt-3">
                                        <h4>{user.name}</h4>
                                        <p className="text-secondary mb-1">{user.profession.name}</p>
                                        <div className="text-muted">
                                            <i
                                                className="
                                                bi bi-caret-down-fill
                                                text-primary
                                            "
                                                role="button"
                                            ></i>
                                            <i
                                                className="
                                                bi bi-caret-up
                                                text-secondary
                                            "
                                                role="button"
                                            ></i>
                                            <span className="ms-2">{user.rate}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card mb-3">
                            <div
                                className="
                                card-body
                                d-flex
                                flex-column
                                justify-content-center
                                text-center
                            "
                            >
                                <h5 className="card-title">
                                    <span>Qualities</span>
                                </h5>
                                <p className="card-text">
                                    <QualitiesList qualities={user.qualities}/>
                                </p>
                            </div>
                        </div>
                        <div className="card mb-3">
                            <div className="card mb-3">
                                <div
                                    className="
                                    card-body
                                    d-flex
                                    flex-column
                                    justify-content-center
                                    text-center
                                "
                                >
                                    <h5 className="card-title">
                                        <span>Completed meetings</span>
                                    </h5>

                                    <h1 className="display-1">125</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    { /* отсюда формы */ }
                    <div className="col-md-8">
                        <form onSubmit={handleSubmit}>
                            <div className="card mb-2">
                                <div className="card-body">
                                    <div>
                                        <h2>New comment</h2>
                                        <div className="mb-4">
                                            <select
                                                className="form-select"
                                                id="validationCustom04"
                                                name={"userName"}
                                                defaultValue={""}
                                                onChange={handleChangeUser}
                                            >
                                                <option disabled value="">
                                                    Выберите пользователя
                                                </option>
                                                {
                                                    allUsers && allUsers.map(user => <option
                                                        key={user._id}
                                                        value={user._id}
                                                    >
                                                        {user.name}
                                                    </option>)
                                                }
                                            </select>
                                        </div>
                                        <div className="mb-4">
                                            <label
                                                htmlFor="exampleFormControlTextarea1"
                                                className="form-label"
                                            >Сообщение</label
                                            >
                                            <textarea
                                                name={"content"}
                                                className="form-control"
                                                id="exampleFormControlTextarea1"
                                                rows="3"
                                                onChange={handleChangeText}
                                                ref={newTextElement}
                                                value={textValue}
                                            ></textarea>
                                            <button type={"submit"} className={"btn btn-primary mx-auto"}>Опубликовать</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                        { /* отсюда комменты */ }
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
