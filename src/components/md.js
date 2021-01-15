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
        <div className="App">
            <div className="container">
                <div className="row mt-4">
                    <div className="col text-center">
                        <h1>
                            {" "}
                            <h2 className="text-align-center" variant="light">
                                Markdown Previewer
                            </h2>
                        </h1>
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-md-6">
                        {" "}
                        <div className="col text-center">
                            <h4>
                                <h2
                                    className="text-align-center"
                                    variant="secondary"
                                >
                                    Markdown Input
                                </h2>
                            </h4>
                        </div>
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
                    </div>
                </div>
            </div>
            <Markdown style={outputStyle}>{markdown}</Markdown>
        </div>
    );
}
