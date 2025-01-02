import React, { useState, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';
import Layout from '~/components/layout';
import Button from '~/components/elements/button';

const Tool = () => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [output, setOutput] = useState('Square');
  const [backgroundImage, setBackgroundImage] = useState('/images/bg-grey.png');
  const [loading, setLoading] = useState(false);
  const [backgroundPositionX, setBackgroundPositionX] = useState(50);
  const [backgroundPositionY, setBackgroundPositionY] = useState(50);
  const [isPortrait, setIsPortrait] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  const [isSquare, setIsSquare] = useState(false);

  const canvasRef = useRef(null);

  const handleBackgroundImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setBackgroundImage(imageUrl);
      setBackgroundPositionX(50);
      setBackgroundPositionY(50);

      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        if (img.naturalWidth > img.naturalHeight) {
          setIsLandscape(true);
          setIsPortrait(false);
          setIsSquare(false);
        } else if (img.naturalHeight > img.naturalWidth) {
          setIsPortrait(true);
          setIsLandscape(false);
          setIsSquare(false);
        } else {
          setIsSquare(true);
          setIsPortrait(false);
          setIsLandscape(false);
        }
      };
    }
  };

  useEffect(() => {
    const updateCanvasSize = () => {
      const canvasContainer = canvasRef.current;
      if (!canvasContainer) return;

      const containerWidth = 500;

      switch (output) {
        case 'Square':
          canvasContainer.style.width = `${containerWidth}px`;
          canvasContainer.style.height = `${containerWidth}px`;
          canvasContainer.style.maxWidth = `${containerWidth}px`;
          canvasContainer.style.height = `${containerWidth}px`;
          break;
        case 'Story':
          canvasContainer.style.width = `${containerWidth / 2}px`;
          canvasContainer.style.height = `${(containerWidth / 2) * (19 / 6)}px`;
          canvasContainer.style.maxWidth = `${containerWidth / 2}px`;
          canvasContainer.style.height = `${(containerWidth / 2) * (19 / 6)}px`;
          break;
        case '4:5':
          canvasContainer.style.width = `${containerWidth}px`;
          canvasContainer.style.height = `${containerWidth * (5 / 4)}px`;
          canvasContainer.style.maxWidth = `${containerWidth}px`;
          canvasContainer.style.maxHeight = `${containerWidth * (5 / 4)}px`;
          break;
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [output]);

  const handleExport = () => {
    setLoading(true);
    const canvas = canvasRef.current;

    toPng(canvas, {
      quality: 1.0,
      width: parseInt(canvas.dataset.exportWidth),
      height: parseInt(canvas.dataset.exportHeight),
      pixelRatio: 2,
    })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'image.png';
        link.click();
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  };
  const handleBackgroundPositionXChange = (e) => {
    setBackgroundPositionX(Number(e.target.value));
  };

  const handleBackgroundPositionYChange = (e) => {
    setBackgroundPositionY(Number(e.target.value));
  };

  const isXDisabled = isPortrait || isSquare;
  const isYDisabled = isLandscape || isSquare;

  return (
    <Layout navOffset="center" navOnWhite={true}>
      <div className="dn flex-md flex-col flex-row-md container mla mra pv6-md">
        <div className="col-24 col-8-md pa2">
          <div className="mb2 flex flex flex-wrap">
            <label className="f6 highlight db mb2 w-100">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-24 pa2 bg-transparent ba bc-black black"
            />
          </div>
          <div className="mb2 flex flex flex-wrap">
            <label className="f6 highlight db mb2 w-100">Subtitle</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="col-24 pa2 bg-transparent ba bc-black black"
            />
          </div>
          <div className="mb2 flex flex-wrap">
            <label className="f6 highlight db mb2 w-100">Output</label>
            <div className="select-arrow-padding">
              <select
                value={output}
                onChange={(e) => setOutput(e.target.value)}
                className="col-24 pa2 bg-transparent ba bc-black black"
              >
                <option value="Square">Square (1:1)</option>
                <option value="Story">Story (6:19)</option>
                <option value="4:5">Portrait (4:5)</option>
              </select>
            </div>
          </div>
          <div className="mb2 flex flex-wrap">
            <label className="f6 highlight db mb2 w-100">
              Background Image
            </label>
            <input
              type="file"
              onChange={handleBackgroundImageUpload}
              className="col-24 pa2 bg-highlight"
            />
          </div>

          {backgroundImage && (
            <div className="mb4">
              <div className="mb2 flex flex-wrap">
                <label className="f6 highlight dib mb1">Move X</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={backgroundPositionX}
                  onChange={handleBackgroundPositionXChange}
                  className={`slider col-24 ${
                    isXDisabled ? 'o-50 not-allowed' : ''
                  }`}
                  disabled={isXDisabled}
                />
              </div>
              <div className="mb2 flex flex-wrap">
                <label className="f6 highlight dib mb1">Move Y</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={backgroundPositionY}
                  onChange={handleBackgroundPositionYChange}
                  className={`slider col-24 ${
                    isYDisabled ? 'o-50 not-allowed' : ''
                  }`}
                  disabled={isYDisabled}
                />
              </div>
            </div>
          )}

          <div className="mt4 mw5">
            <Button
              type="primary"
              size="medium"
              text="Export to PNG"
              color="black"
              fluid={false}
              icon={null}
              iconFloat={null}
              inverted={false}
              loading={loading}
              disabled={false}
              skeleton={false}
              onClick={handleExport}
              withLinkProps={null}
            />
          </div>
        </div>

        <div className="col-24 col-16-md pa2 flex justify-center items-center">
          <div
            id="canvas"
            ref={canvasRef}
            className="relative col-24 bg-black white bg-center overflow-hidden"
            style={{
              backgroundImage: backgroundImage
                ? `url(${backgroundImage})`
                : 'none',
              backgroundSize: 'cover',
              backgroundPosition: `${backgroundPositionX}% ${backgroundPositionY}%`,
            }}
          >
            <div
              className="canvas-content relative pa2"
              style={{
                height: '100%',
                backgroundImage: 'url(/images/bottom-gradient.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'bottom',
                backgroundRepeat: 'none',
              }}
            >
              <div className="absolute bottom left right mla mra col-24 pa3">
                <div className="flex flex-wrap ph2 pv1 white mb4">
                  <div className="col-24 flex flex-wrap justify-end tar">
                    <div className="w-100 title bold f3 mb3 pl5">{title}</div>
                    <div className="w-100 subtitle f4 pl5">{subtitle}</div>
                  </div>
                </div>
                <div className="flex flex-wrap ph2 pv1 white">
                  <div className="col-24 flex flex-wrap align-center justify-around">
                    <div className="col-8" />
                    <div className="website f6  col-8 tac">Interview</div>
                    <div className="flex justify-end  col-8">
                      <svg
                        version="1.0"
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 1080 1080"
                      >
                        <g fill="#ffffff">
                          <path d="M358 12.7c-158.6.8-288.7 1.6-288.9 1.9-.2.2 7 15.6 16.1 34.1l16.6 33.8 94.8.8c52.2.5 95 1 95.2 1.1.1.2-20.3 34.6-45.3 76.6-25.1 42-45.4 76.7-45.3 77.1.2.4 13.4 22.9 29.3 49.8l29 49 177.1.3 177 .3-94.8 153.8C466.7 576 424 645.6 424 646.1s11.6 19.9 25.8 43l25.7 42.2 86.8-.6c47.7-.3 86.7-.4 86.7-.2s-19.2 31.7-42.7 70.1c-23.4 38.5-42.8 70.6-43 71.5-.3.9 7.8 20.6 17.9 43.8l18.3 42.1h56l56-.1 42-71.9c23.1-39.6 42.2-72 42.5-72 .3 0 19.1 32.4 41.9 72l41.3 72h48.9c26.9 0 48.9-.4 48.9-.8 0-.5-40-70.5-89-155.6-48.9-85.1-89-155-89-155.5 0-.4 40.1-70 89-154.7 49-84.6 88.9-154.7 88.8-155.7-.2-1-40.3-74.4-89.3-163.2L798.5 11l-76 .2c-41.8 0-205.8.7-364.5 1.5z" />
                          <path d="M69.2 117.5c.4 2 83.2 157.5 83.8 157.5.6-.1 83.3-155.7 83.8-157.7.3-1.1-14.9-1.3-83.8-1.3-74 0-84.1.2-83.8 1.5zM410.4 758.7c.8 1.9 81.8 150 84.6 154.7l1.8 3 52.6-79.3c28.9-43.5 52.6-79.4 52.6-79.7 0-.2-43.2-.4-96.1-.4-90.4 0-96.1.1-95.5 1.7zM335.2 849.1c.6 1.7 48.2 75.8 48.8 75.8.4 0 39.8-73.3 40.8-76 .2-.5-19.4-.9-44.8-.9-32.3 0-45.1.3-44.8 1.1zM741 969c-31.9 53.4-58.4 97.8-58.7 98.6-.4 1.2 14.5 1.4 113.7 1.4 93.7 0 114.1-.2 113.8-1.3-.3-1.5-108.6-193.7-109.8-195-.5-.5-27 42.8-59 96.3z" />
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Tool;
