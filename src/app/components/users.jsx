import React from 'react';
import SearchStatus from "./searchStatus";
import User from "./user";


const Users = ({users, ...rest}) => {

    return (
        <>
            <SearchStatus length={users.length} handlePhrase={rest.handlePhrase}/>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Имя</th>
                    <th scope="col">Качества</th>
                    <th scope="col">Профессия</th>
                    <th scope="col">Встретился, раз</th>
                    <th scope="col">Статус</th>
                    <th scope="col">Оценка</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => {
                    return <User user={user} handleToggleBookMark={rest.handleToggleBookMark} handleDelete={rest.handleDelete} key={user._id}/>
                })}
                </tbody>
            </table>
        </>
    )
}

export default Users;