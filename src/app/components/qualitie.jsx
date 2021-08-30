import React from "react";

const Qualitie = ({color, name, _id}) => {

    return <span key={_id} className={"badge bg-" + color} style={{margin: "2px"}}>{name}</span>
};

export default Qualitie;