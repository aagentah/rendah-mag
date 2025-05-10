import React, { useState, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';
import Layout from '~/components/layout';
import Button from '~/components/elements/button';
import Radio from '~/components/elements/radio';

const Tool = () => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [categoryLabel, setCategoryLabel] = useState('');
  const [output, setOutput] = useState('Square');
  const [backgroundImage, setBackgroundImage] = useState('/images/bg-grey.png');
  const [loading, setLoading] = useState(false);
  const [backgroundPositionX, setBackgroundPositionX] = useState(50);
  const [backgroundPositionY, setBackgroundPositionY] = useState(50);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isPortrait, setIsPortrait] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  const [isSquare, setIsSquare] = useState(false);
  const [textAlign, setTextAlign] = useState('right');
  const [titleFontSize, setTitleFontSize] = useState('small');
  const [verticalAlign, setVerticalAlign] = useState('bottom');
  const [backgroundOverlay, setBackgroundOverlay] = useState('gradient');

  const canvasRef = useRef(null);

  const parseBoldMarkdown = (text) => {
    if (!text) return '';
    return text
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/__([^_]+)__/g, '<em>$1</em>');
  };

  const handleBackgroundImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setBackgroundImage(imageUrl);
      setBackgroundPositionX(50);
      setBackgroundPositionY(50);
      setZoomLevel(1);

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
          break;
        case 'Story':
          canvasContainer.style.width = `${containerWidth / 2}px`;
          canvasContainer.style.height = `${(containerWidth / 2) * (19 / 6)}px`;
          canvasContainer.style.maxWidth = `${containerWidth / 2}px`;
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

  const handleZoomChange = (e) => {
    setZoomLevel(Number(e.target.value));
  };

  const getTextAlignmentClasses = () => {
    let alignClass = '';
    let paddingClass = '';

    switch (textAlign) {
      case 'left':
        alignClass = 'text-start justify-start';
        paddingClass = 'pr-8';
        break;
      case 'center':
        alignClass = 'text-center justify-center';
        paddingClass = 'px-8';
        break;
      case 'right':
        alignClass = 'text-end justify-end';
        paddingClass = 'pl-8';
        break;
      default:
        alignClass = 'text-end justify-end';
        paddingClass = 'pl-8';
    }

    return { alignClass, paddingClass };
  };

  const { alignClass, paddingClass } = getTextAlignmentClasses();

  const isXDisabled = (isPortrait || isSquare) && zoomLevel === 1;
  const isYDisabled = (isLandscape || isSquare) && zoomLevel === 1;

  return (
    <Layout navOffset="center" navOnWhite={true}>
      <div className="flex flex-wrap md:flex-row container mx-auto md:py-6">
        <div className="w-full md:w-2/4">
          <div className="p-6 flex flex-col gap-6 border border-neutral-600 bg-neutral-700 rounded-md">
            <div>
              <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">
                Text
              </h3>
              <div className="mb-4">
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Title{' '}
                  <span className="text-xs text-neutral-400 font-normal">
                    (use **text** for bold and __text__ for italics)
                  </span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 rounded border border-neutral-600 focus:border-neutral-400 focus:ring-1 focus:ring-neutral-500 bg-transparent text-neutral-200 placeholder-neutral-500 transition"
                  placeholder="Enter title..."
                />
              </div>
              <div className="mb-4">
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full p-2 rounded border border-neutral-600 focus:border-neutral-400 focus:ring-1 focus:ring-neutral-500 bg-transparent text-neutral-200 placeholder-neutral-500 transition"
                  placeholder="Enter subtitle..."
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Category Label
                </label>
                <input
                  type="text"
                  value={categoryLabel}
                  onChange={(e) => setCategoryLabel(e.target.value)}
                  className="w-full p-2 rounded border border-neutral-600 focus:border-neutral-400 focus:ring-1 focus:ring-neutral-500 bg-transparent text-neutral-200 placeholder-neutral-500 transition"
                  placeholder="Enter category label..."
                />
              </div>
            </div>
            <div className="border-t border-neutral-600 pt-4">
              <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">
                Layout
              </h3>
              <div className="mb-4">
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Text Alignment
                </label>
                <div className="flex gap-3">
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      name="textAlign"
                      value="left"
                      checked={textAlign === 'left'}
                      onChange={() => setTextAlign('left')}
                      className="accent-neutral-400"
                    />
                    <span className="text-neutral-300 text-xs">Left</span>
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      name="textAlign"
                      value="center"
                      checked={textAlign === 'center'}
                      onChange={() => setTextAlign('center')}
                      className="accent-neutral-400"
                    />
                    <span className="text-neutral-300 text-xs">Center</span>
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      name="textAlign"
                      value="right"
                      checked={textAlign === 'right'}
                      onChange={() => setTextAlign('right')}
                      className="accent-neutral-400"
                    />
                    <span className="text-neutral-300 text-xs">Right</span>
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Vertical Alignment
                </label>
                <div className="flex gap-3">
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      name="verticalAlign"
                      value="middle"
                      checked={verticalAlign === 'middle'}
                      onChange={() => setVerticalAlign('middle')}
                      className="accent-neutral-400"
                    />
                    <span className="text-neutral-300 text-xs">Middle</span>
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      name="verticalAlign"
                      value="bottom"
                      checked={verticalAlign === 'bottom'}
                      onChange={() => setVerticalAlign('bottom')}
                      className="accent-neutral-400"
                    />
                    <span className="text-neutral-300 text-xs">Bottom</span>
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Title Font Size
                </label>
                <div className="flex gap-3">
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      name="titleFontSize"
                      value="x-small"
                      checked={titleFontSize === 'x-small'}
                      onChange={() => setTitleFontSize('x-small')}
                      className="accent-neutral-400"
                    />
                    <span className="text-neutral-300 text-xs">X-Small</span>
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      name="titleFontSize"
                      value="small"
                      checked={titleFontSize === 'small'}
                      onChange={() => setTitleFontSize('small')}
                      className="accent-neutral-400"
                    />
                    <span className="text-neutral-300 text-xs">Small</span>
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      name="titleFontSize"
                      value="medium"
                      checked={titleFontSize === 'medium'}
                      onChange={() => setTitleFontSize('medium')}
                      className="accent-neutral-400"
                    />
                    <span className="text-neutral-300 text-xs">Medium</span>
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      name="titleFontSize"
                      value="large"
                      checked={titleFontSize === 'large'}
                      onChange={() => setTitleFontSize('large')}
                      className="accent-neutral-400"
                    />
                    <span className="text-neutral-300 text-xs">Large</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Output
                </label>
                <select
                  value={output}
                  onChange={(e) => setOutput(e.target.value)}
                  className="w-full p-2 rounded border border-neutral-600 focus:border-neutral-400 focus:ring-1 focus:ring-neutral-500 bg-transparent text-neutral-200 transition"
                >
                  <option value="Square">Square (1:1)</option>
                  <option value="Story">Story (6:19)</option>
                  <option value="4:5">Portrait (4:5)</option>
                </select>
              </div>
            </div>
            <div className="border-t border-neutral-600 pt-4">
              <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">
                Background
              </h3>
              <div className="mb-4">
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Background Image
                </label>
                <input
                  type="file"
                  onChange={handleBackgroundImageUpload}
                  className="w-full p-2 rounded border border-neutral-600 bg-neutral-800 text-neutral-200 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-neutral-600 file:text-neutral-100 hover:file:bg-neutral-500 transition"
                />
              </div>
              <div className="mb-4">
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Background Overlay
                </label>
                <div className="flex gap-3">
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      name="backgroundOverlay"
                      value="gradient"
                      checked={backgroundOverlay === 'gradient'}
                      onChange={() => setBackgroundOverlay('gradient')}
                      className="accent-neutral-400"
                    />
                    <span className="text-neutral-300 text-xs">
                      Include bottom-gradient
                    </span>
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      name="backgroundOverlay"
                      value="darken"
                      checked={backgroundOverlay === 'darken'}
                      onChange={() => setBackgroundOverlay('darken')}
                      className="accent-neutral-400"
                    />
                    <span className="text-neutral-300 text-xs">Darken 50%</span>
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      name="backgroundOverlay"
                      value="darken75"
                      checked={backgroundOverlay === 'darken75'}
                      onChange={() => setBackgroundOverlay('darken75')}
                      className="accent-neutral-400"
                    />
                    <span className="text-neutral-300 text-xs">Darken 75%</span>
                  </label>
                </div>
              </div>
              {backgroundImage && (
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Zoom
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="3"
                    step="0.1"
                    value={zoomLevel}
                    onChange={handleZoomChange}
                    className="w-full slider accent-neutral-400"
                  />
                  <span className="text-xs text-neutral-400 w-full text-right block mt-1">
                    {zoomLevel.toFixed(1)}x
                  </span>
                </div>
              )}
              {backgroundImage && (
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Move X
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={backgroundPositionX}
                      onChange={handleBackgroundPositionXChange}
                      className={`w-full slider accent-neutral-400 ${
                        isXDisabled ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      disabled={isXDisabled}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Move Y
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={backgroundPositionY}
                      onChange={handleBackgroundPositionYChange}
                      className={`w-full slider accent-neutral-400 ${
                        isYDisabled ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      disabled={isYDisabled}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="border-t border-neutral-600 pt-6 flex flex-col items-center">
              <Button
                type="primary"
                size="medium"
                text="Export to PNG"
                color="neutral-500"
                fluid={true}
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
        </div>

        <div className="w-full md:w-2/4 flex justify-center items-center">
          <div
            id="canvas"
            ref={canvasRef}
            className="relative w-full bg-neutral-500 text-white bg-center overflow-hidden"
            style={{}}
          >
            {backgroundImage && (
              <div
                className="absolute inset-0 w-full h-full"
                style={{
                  backgroundImage: `url(${backgroundImage})`,
                  backgroundSize: `${zoomLevel * 100}%`,
                  backgroundPosition: `${backgroundPositionX}% ${backgroundPositionY}%`,
                  backgroundRepeat: 'no-repeat',
                  filter:
                    backgroundOverlay === 'darken'
                      ? 'brightness(0.5)'
                      : backgroundOverlay === 'darken75'
                      ? 'brightness(0.25)'
                      : 'none',
                  zIndex: 0,
                }}
              />
            )}
            {backgroundOverlay === 'gradient' && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: 'url(/images/bottom-gradient.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'bottom',
                  backgroundRepeat: 'no-repeat',
                  zIndex: 1,
                }}
              />
            )}
            <div
              className={`relative p-2 flex flex-col ${
                verticalAlign === 'middle' ? 'justify-center' : 'justify-end'
              }`}
              style={{
                height: '100%',
                position: 'relative',
                zIndex: 2,
              }}
            >
              <div className="w-full p-3">
                <div
                  className={`flex flex-wrap px-4 ${
                    verticalAlign === 'middle' ? 'pb-0' : 'pb-4'
                  }`}
                >
                  <div className={`flex flex-wrap ${alignClass} w-full`}>
                    <div
                      className={`w-full ${
                        titleFontSize === 'x-small'
                          ? 'text-xl'
                          : titleFontSize === 'small'
                          ? 'text-2xl'
                          : titleFontSize === 'medium'
                          ? 'text-4xl'
                          : titleFontSize === 'large'
                          ? 'text-5xl'
                          : 'text-5xl'
                      } ${paddingClass} font-normal text-balance text-neutral-200`}
                      dangerouslySetInnerHTML={{
                        __html: parseBoldMarkdown(title),
                      }}
                    />
                    {subtitle && (
                      <div
                        className={`w-full text-sm mt-2 ${paddingClass} text-balance text-neutral-300`}
                      >
                        {subtitle}
                      </div>
                    )}
                  </div>
                </div>

                {categoryLabel && (
                  <div
                    className={`w-full flex flex-wrap items-center gap-x-2 text-xs justify-center text-center text-neutral-400 pt-4 ${
                      verticalAlign === 'bottom' ? 'pb-2' : 'pb-0'
                    }`}
                  >
                    <svg
                      version="1.0"
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 1080 1080"
                    >
                      <g fill="#d4d4d4">
                        <path d="M358 12.7c-158.6.8-288.7 1.6-288.9 1.9-.2.2 7 15.6 16.1 34.1l16.6 33.8 94.8.8c52.2.5 95 1 95.2 1.1.1.2-20.3 34.6-45.3 76.6-25.1 42-45.4 76.7-45.3 77.1.2.4 13.4 22.9 29.3 49.8l29 49 177.1.3 177 .3-94.8 153.8C466.7 576 424 645.6 424 646.1s11.6 19.9 25.8 43l25.7 42.2 86.8-.6c47.7-.3 86.7-.4 86.7-.2s-19.2 31.7-42.7 70.1c-23.4 38.5-42.8 70.6-43 71.5-.3.9 7.8 20.6 17.9 43.8l18.3 42.1h56l56-.1 42-71.9c23.1-39.6 42.2-72 42.5-72 .3 0 19.1 32.4 41.9 72l41.3 72h48.9c26.9 0 48.9-.4 48.9-.8 0-.5-40-70.5-89-155.6-48.9-85.1-89-155-89-155.5 0-.4 40.1-70 89-154.7 49-84.6 88.9-154.7 88.8-155.7-.2-1-40.3-74.4-89.3-163.2L798.5 11l-76 .2c-41.8 0-205.8.7-364.5 1.5z" />
                        <path d="M69.2 117.5c.4 2 83.2 157.5 83.8 157.5.6-.1 83.3-155.7 83.8-157.7.3-1.1-14.9-1.3-83.8-1.3-74 0-84.1.2-83.8 1.5zM410.4 758.7c.8 1.9 81.8 150 84.6 154.7l1.8 3 52.6-79.3c28.9-43.5 52.6-79.4 52.6-79.7 0-.2-43.2-.4-96.1-.4-90.4 0-96.1.1-95.5 1.7zM335.2 849.1c.6 1.7 48.2 75.8 48.8 75.8.4 0 39.8-73.3 40.8-76 .2-.5-19.4-.9-44.8-.9-32.3 0-45.1.3-44.8 1.1zM741 969c-31.9 53.4-58.4 97.8-58.7 98.6-.4 1.2 14.5 1.4 113.7 1.4 93.7 0 114.1-.2 113.8-1.3-.3-1.5-108.6-193.7-109.8-195-.5-.5-27 42.8-59 96.3z" />
                      </g>
                    </svg>
                    {categoryLabel}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Tool;
