// ImageOverlay.js
import React, { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Image as KonvaImage, Transformer } from 'react-konva';
import useImage from 'use-image';
import html2canvas from 'html2canvas';

const ImageOverlay = ({ backgroundImage, logoImage }) => {
const [bgImage] = useImage(backgroundImage);
const [logoImg] = useImage(logoImage);
const [logoPosition, setLogoPosition] = useState({ x: 100, y: 100 });
const [logoSize, setLogoSize] = useState({ width: 200, height: 100 });
const [logoRotation, setLogoRotation] = useState(0);
const [showTransformer, setShowTransformer] = useState(true);

const logoRef = useRef();
const trRef = useRef();
const stageRef = useRef();

useEffect(() => {
    if (logoRef.current && trRef.current && showTransformer) {
        trRef.current.nodes([logoRef.current]);
        trRef.current.getLayer().batchDraw();
    }
}, [logoImg, showTransformer]);

const handleApply = () => {
    setShowTransformer(false);
};

const handleSave = () => {
    const stage = stageRef.current;
    html2canvas(stage.content).then((canvas) => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'result.png';
        link.click();
    });
};

return (
    <>
        <Stage width={800} height={600} ref={stageRef}>
            <Layer>
                {bgImage && <KonvaImage image={bgImage} width={800} height={600} />}
                {logoImg && (
                    <>
                        <KonvaImage
                            image={logoImg}
                            x={logoPosition.x}
                            y={logoPosition.y}
                            width={logoSize.width}
                            height={logoSize.height}
                            rotation={logoRotation}
                            draggable
                            onDragEnd={(e) => {
                                setLogoPosition({
                                    x: e.target.x(),
                                    y: e.target.y(),
                                });
                            }}
                            onTransformEnd={(e) => {
                                const node = logoRef.current;
                                const scaleX = node.scaleX();
                                const scaleY = node.scaleY();
                                setLogoSize({
                                    width: node.width() * scaleX,
                                    height: node.height() * scaleY,
                                });
                                setLogoRotation(node.rotation());
                                node.scaleX(1);
                                node.scaleY(1);
                            }}
                            ref={logoRef}
                        />
                        {showTransformer && <Transformer ref={trRef} />}
                    </>
                )}
            </Layer>
        </Stage>
        
        <button onClick={handleApply}>Apply</button>
        <button onClick={handleSave}>Save Result</button>
    </>
);
};

export default ImageOverlay;