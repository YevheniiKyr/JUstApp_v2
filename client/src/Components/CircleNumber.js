import React from 'react';
import '../styles/CircleNumber.css'; // Import the CSS file with the styles for the CircleNumber component


function CircleNumber({number}) {

    return (
        <div style={{fontSize: "1rem", display:"flex", margin: "auto"}} className={"circle"} >{number}</div>
    );
}

export default CircleNumber;