import React, {useState} from "react";
import Users from "./components/users";
import api from "./api";


function App() {
    const usersApi = api.users.fetchAll();
    const usersInit = usersApi.map(user => {
        return {...user, status: false}
    })

    const [users, setUsers] = useState(usersInit);


    const handleDelete = (userId) => {
        const usersCopy = users.filter(user => user._id !== userId);
        setUsers(usersCopy);
    };

    const handleToggleBookMark = (id) => {
        const usersCopy = users;
        setUsers(usersCopy.map(user => user._id === id ? {
            ...user,
            status: user.status === false ? true : false
        } : user));
    };

    const handlePhrase = (number) => {
        if (number === 0) {
            return `Никто с тобой не тусанет`
        }
        let decCache = [],
            decCases = [2, 0, 1, 1, 1, 2];

        function decOfNum(number, titles) {
            if (!decCache[number]) decCache[number] = number % 100 > 4 && number % 100 < 20 ? 2 : decCases[Math.min(number % 10, 5)];
            return titles[decCache[number]];
        }

        return decOfNum(number, [`${number} человек тусанет с тобой сегодня`, `${number} человека тусанут с тобой сегодня`, `${number} человек тусанет с тобой сегодня`]);
    };

    return (
        <div>
            <Users
                users={users} setUsers={setUsers}
                onChangeStatus={handleToggleBookMark}
                handleToggleBookMark={handleToggleBookMark}
                handlePhrase={handlePhrase}
                handleDelete={handleDelete}
            />
        </div>
    )
}

export default App;