// FileUpload.js
import React from 'react';
import { useDropzone } from 'react-dropzone';

const FileUpload = ({ onFileSelect, label }) => {
    const onDrop = (acceptedFiles) => {
        onFileSelect(acceptedFiles[0]);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

    return (
        <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <p>{label}</p>
        </div>
    );
};

export default FileUpload;
