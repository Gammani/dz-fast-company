import React, { useEffect, useState } from "react";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import api from "../api";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import UserTable from "./usersTable";
import _ from "lodash";
import { useParams } from "react-router-dom";
import UserId from "./userId";
import SearchBar from "./searchBar";

const UsersList = () => {
    const pageSize = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const [users, setUsers] = useState();
    const [searchValue, setSearchValue] = useState("");
    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);
    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };
    const handleToggleBookMark = (id) => {
        setUsers(
            users.filter((user) => {
                if (user._id === id) {
                    user.bookmark = !user.bookmark;
                    return user;
                }
                return user;
            })
        );
        console.log(id);
    };
    const renderPhrase = (number) => {
        if (number === 0) {
            return `Никто с тобой не тусанет`;
        }
        const decCache = [];
        const decCases = [2, 0, 1, 1, 1, 2];

        function decOfNum(number, titles) {
            if (!decCache[number]) {
                decCache[number] =
                    number % 100 > 4 && number % 100 < 20
                        ? 2
                        : decCases[Math.min(number % 10, 5)];
            }
            return titles[decCache[number]];
        }

        return decOfNum(number, [
            `${number} человек тусанет с тобой сегодня`,
            `${number} человека тусанут с тобой сегодня`,
            `${number} человек тусанет с тобой сегодня`
        ]);
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
        setSearchValue("");
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };
    const params = useParams();
    const { userId } = params;

    if (userId) {
        return <UserId id={userId} />;
    };
    const filterNamesUser = ({ name }) => {
        return name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
    };
    if (users) {
        const filteredUsers = selectedProf
            ? users.filter(
                (user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
            : users;
        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
        const usersCrop = paginate(sortedUsers, currentPage, pageSize);
        const clearFilter = () => {
            setSelectedProf();
            setSearchValue("");
        };

        return (
            <div className={"d-flex"}>
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className={"btn btn-secondary mt-2"}
                            onClick={clearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} renderPhrase={renderPhrase}/>
                    <SearchBar onSearch={setSearchValue} value={searchValue} setSelectedProf={setSelectedProf}/>
                    {count > 0 && (
                        <UserTable
                            users={usersCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                            filterNamesUser={filterNamesUser}
                            allUsers={users}
                            searchValue={searchValue}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return "loading...";
};

UsersList.propTypes = {
    users: PropTypes.array,
    renderPhrase: PropTypes.func
};

export default UsersList;
