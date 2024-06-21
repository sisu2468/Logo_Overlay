// App.js
import React, { useState } from 'react';
import FileUpload from './FileUpload';
import ImageOverlay from './ImageOverlay';
import './App.css';

const App = () => {
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [logoImage, setLogoImage] = useState(null);

    return (
        <div className="App">
            <h1>Image Overlay App</h1>
            <FileUpload label="Select Background Image" onFileSelect={(file) => setBackgroundImage(URL.createObjectURL(file))} />
            {backgroundImage && <ImageOverlay backgroundImage={backgroundImage} logoImage={logoImage} />}
            <FileUpload label="Select Logo Image" onFileSelect={(file) => setLogoImage(URL.createObjectURL(file))} />
        </div>
    );
};

export default App;
