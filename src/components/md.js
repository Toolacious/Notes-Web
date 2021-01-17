import React, { useState } from "react";
import Markdown from "./Markdown";

export default function Md() {
    const [markdown, setstate] = useState("");

    var inputStyle = {
        width: "400px",
        height: "50vh",
        marginLeft: "auto",
        marginRight: "auto",
        padding: "10px",
    };
    var outputStyle = {
        width: "400px",
        height: "50vh",
        backgroundColor: "#DCDCDC",
        marginLeft: "auto",
        marginRight: "auto",
        padding: "10px",
    };

    return (
        <>
                        <div className="input" style={inputStyle}>
                            <textarea
                                className="input"
                                style={inputStyle}
                                value={markdown}
                                onChange={(e) => {
                                    setstate(e.target.value);
                                }}
                            ></textarea>
                        </div>
        
            <Markdown style={outputStyle}>{markdown}</Markdown></>
    );
}
