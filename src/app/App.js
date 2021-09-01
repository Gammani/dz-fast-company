import React, { useState } from 'react';
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import api from "./api"

function App() {
    const [users, setUsers] = useState(api.users.fetchAll());
    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };
    const handleToggleBookMark = (id) => {
        setUsers(users.filter((user) => {
            if (user._id === id) { user.bookmark = !user.bookmark; return user }
            return user
        }))
        console.log(id)
    }
    const renderPhrase = (number) => {
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
            <SearchStatus length={users.length} renderPhrase={renderPhrase}/>
            <Users onDelete={handleDelete} onToggleBookMark={handleToggleBookMark} users={users} />
        </div>
    );
}

export default App;