import React from "react";
import Qualitie from "./qualitie";
import BookMark from "./bookmark";

const User = ({user, ...rest}) => {

    return (
        <tr key={rest.key}>
            <th scope="row">{user.name}</th>
            <td key={rest.key}>{user.qualities.map(el => <Qualitie _id={el._id} color={el.color} name={el.name} key={el._id}/>)}</td>
            <td key={user.profession._id}>{user.profession.name}</td>
            <td >{user.completedMeetings}</td>
            <td ><BookMark id={user._id} status={user.status} handleToggleBookMark={rest.handleToggleBookMark}/></td>
            <td >{user.rate}</td>
            <td ><button onClick={() => rest.handleDelete(user._id)} className={"btn btn-danger position-relative"}>delete</button></td>
        </tr>
    )
}

export default User;