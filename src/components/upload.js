import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
//import React from 'react'
//import {useDropzone} from 'react-dropzone'
import RootRef from "@material-ui/core/RootRef";
import { Paper } from "@material-ui/core";
import { UPLOAD_Mutation } from "../graphql/upload";
import { useMutation } from "@apollo/react-hooks";

function PaperDropzone() {
    const [upload] = useMutation(UPLOAD_Mutation);
    const onDrop = useCallback(async (acceptedFiles) => {
        // Do something with the files
        // acceptedFiles.forEach((file) => {
        //     const reader = new FileReader();

        //     reader.onabort = () => console.log("file reading was aborted");
        //     reader.onerror = () => console.log("file reading has failed");
        //     reader.onload = () => {
        //         // Do whatever you want with the file contents
        //         const binaryStr = reader.result;
        //         console.log(binaryStr);
        //     };
        //     reader.readAsArrayBuffer(file);
        // });
        await upload({ variables: { id: "gg", picture: acceptedFiles[0] } });
    }, []);
    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/jpeg, image/png",
        onDrop,
        multiple: false,
    });
    const { ref, ...rootProps } = getRootProps();

    return (
        <RootRef rootRef={ref}>
            <Paper {...rootProps}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </Paper>
        </RootRef>
    );
}

function MyDropzone() {
    const onDrop = useCallback((acceptedFiles) => {
        // Do something with the files
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();

            reader.onabort = () => console.log("file reading was aborted");
            reader.onerror = () => console.log("file reading has failed");
            reader.onload = () => {
                // Do whatever you want with the file contents
                const binaryStr = reader.result;
                console.log(binaryStr);
            };
            reader.readAsArrayBuffer(file);
        });
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: "image/jpeg, image/png",
        onDrop,
        multiple: false,
    });

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Drop the files here ...</p>
            ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
            )}
        </div>
    );
}
export default PaperDropzone;
