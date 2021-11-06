import React, { useState } from "react";
import PropTypes from "prop-types";
import api from "../../api";

const UserFormComment = ({ userId, allUsers, setCommentsForUser }) => {
    const [data, setData] = useState();
    const [textValue, setTextValue] = useState("");
    const newTextElement = React.createRef();
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
    return (
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
    );
};
UserFormComment.propTypes = {
    userId: PropTypes.string,
    allUsers: PropTypes.array,
    setCommentsForUser: PropTypes.func
};
export default UserFormComment;
