import React, {useState} from 'react';
import api from "../api";

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());
    const handleDelete = (userId) => {
        const usersCopy = users.filter(user => user._id !== userId);
        setUsers(usersCopy);
        console.log(userId);
    };

    const handlePhrase = (number) => {
        if(number === 0) {
            return `Никто с тобой не тусанет`
        }
        let decCache = [],
            decCases = [2, 0, 1, 1, 1, 2];
        function decOfNum(number, titles)
        {
            if(!decCache[number]) decCache[number] = number % 100 > 4 && number % 100 < 20 ? 2 : decCases[Math.min(number % 10, 5)];
            return titles[decCache[number]];
        }

        return decOfNum(number, [`${number} человек тусанет с тобой сегодня`, `${number} человека тусанут с тобой сегодня`, `${number} человек тусанет с тобой сегодня`]);
    };

    return (
        <>
            <h1 ><span className={users.length === 0 ? "badge bg-danger" : "badge bg-primary"}>{`${handlePhrase(users.length)}`}</span></h1>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Имя</th>
                    <th scope="col">Качества</th>
                    <th scope="col">Профессия</th>
                    <th scope="col">Встретился, раз</th>
                    <th scope="col">Оценка</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => {
                    return (
                        <tr key={user._id}>
                            <th scope="row">{user.name}</th>
                            <td>{user.qualities.map(el => <span key={el._id} className={"badge bg-" + el.color} style={{margin: "2px"}}>{el.name}</span>)}</td>
                            <td key={user.profession._id}>{user.profession.name}</td>
                            <td >{user.completedMeetings}</td>
                            <td >{user.rate}</td>
                            <td ><button onClick={() => handleDelete(user._id)} className={"btn btn-danger position-relative"}>delete</button></td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </>
    )
}

export default Users;