import React, { useState, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';
import SuperGif from 'libgif';
import Layout from '~/components/layout';
import Button from '~/components/elements/button';

const Tool = () => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [output, setOutput] = useState('4:5');
  const [backgroundImage, setBackgroundImage] = useState('/images/bg-grey.png');
  const [soundBar] = useState('/images/soundbar.gif');
  const [loading, setLoading] = useState(false);
  const [backgroundPositionX, setBackgroundPositionX] = useState(50);
  const [backgroundPositionY, setBackgroundPositionY] = useState(50);
  const [isPortrait, setIsPortrait] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  const [isSquare, setIsSquare] = useState(false);
  const [imageNaturalSize, setImageNaturalSize] = useState({
    width: 0,
    height: 0,
  });
  const [containerDimensions, setContainerDimensions] = useState({
    width: 500,
    height: 500,
  });

  // New state for audio overlay.
  const [audioFile, setAudioFile] = useState(null);
  const [audioStart, setAudioStart] = useState(0);

  const canvasRef = useRef(null);
  const gifRef = useRef(null);

  // Handle background image upload and set orientation flags.
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
        setImageNaturalSize({
          width: img.naturalWidth,
          height: img.naturalHeight,
        });
      };
    }
  };

  // Handle audio file upload.
  const handleAudioFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAudioFile(e.target.files[0]);
    }
  };

  // Set the canvas dimensions based on the chosen output.
  useEffect(() => {
    const updateCanvasSize = () => {
      const canvasContainer = canvasRef.current;
      if (!canvasContainer) return;

      const containerWidth = 500;
      let width, height;
      switch (output) {
        case 'Square':
          width = containerWidth;
          height = containerWidth;
          break;
        case 'Story':
          width = containerWidth / 2;
          height = (containerWidth / 2) * (19 / 6);
          break;
        case '4:5':
          width = containerWidth;
          height = containerWidth * (5 / 4);
          break;
        default:
          width = containerWidth;
          height = containerWidth;
      }
      // Set the visible dimensions.
      canvasContainer.style.width = `${width}px`;
      canvasContainer.style.height = `${height}px`;
      setContainerDimensions({ width, height });
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [output]);

  // Initialize animated GIF using libgif (SuperGif).
  useEffect(() => {
    if (gifRef.current) {
      const superGif = new SuperGif({
        gif: gifRef.current,
        auto_play: true,
        loop_mode: true,
      });
      superGif.load();
    }
  }, [soundBar]);

  // Export function creates a video (with audio overlay) by capturing frames.
  // We now use the element’s offsetWidth/offsetHeight so that exported dimensions match the on‑screen dimensions.
  const handleExport = async () => {
    setLoading(true);

    const duration = 10; // seconds (10 fps * 10 seconds = 100 frames)
    const fps = 10;
    const totalFrames = duration * fps;
    const canvasElement = canvasRef.current;

    // Use the actual rendered dimensions.
    const exportWidth = canvasElement.offsetWidth;
    const exportHeight = canvasElement.offsetHeight;

    const originalX = backgroundPositionX;
    const capturedFrames = [];

    console.log(`Beginning frame capture for ${totalFrames} frames...`);

    // Determine if we should apply our 120% scale animation.
    // Previously we only animated if the image's aspect ratio nearly matched the container.
    // Here, we also force the animation if the image is perfectly square.
    const imageRatioExport =
      imageNaturalSize.height > 0
        ? imageNaturalSize.width / imageNaturalSize.height
        : 0;
    const containerRatioExport = exportWidth / exportHeight;
    const isSquareImage =
      imageNaturalSize.width > 0 &&
      Math.abs(imageNaturalSize.width - imageNaturalSize.height) < 1;
    const useScaleAnimation =
      imageNaturalSize.width > 0 &&
      (isSquareImage ||
        Math.abs(imageRatioExport - containerRatioExport) < 0.01);

    if (useScaleAnimation) {
      canvasElement.style.backgroundSize = '120% auto';
    }

    // Animate the background X position from right (100%) to left (0%) over the frames.
    for (let i = 0; i < totalFrames; i++) {
      const progress = i / (totalFrames - 1);
      const animatedX = useScaleAnimation
        ? 100 - progress * 100
        : progress * 100;
      canvasElement.style.backgroundPosition = `${animatedX}% ${backgroundPositionY}%`;

      await new Promise((resolve) => setTimeout(resolve, 0));

      try {
        const dataUrl = await toPng(canvasElement, {
          quality: 1.0,
          width: exportWidth,
          height: exportHeight,
          pixelRatio: 2,
        });
        capturedFrames.push(dataUrl);
      } catch (error) {
        console.error('Error capturing frame:', error);
        setLoading(false);
        return;
      }

      if ((i + 1) % 30 === 0) {
        console.log(`Captured ${i + 1} / ${totalFrames} frames`);
      }
    }
    // Reset the background position after export.
    canvasElement.style.backgroundPosition = useScaleAnimation
      ? `100% ${backgroundPositionY}%`
      : `${originalX}% ${backgroundPositionY}%`;
    console.log('Finished capturing frames.');

    try {
      const { FFmpeg } = await import('@ffmpeg/ffmpeg');
      const { toBlobURL } = await import('@ffmpeg/util');

      const ffmpeg = new FFmpeg();
      const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';

      await ffmpeg.load({
        coreURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.js`,
          'text/javascript'
        ),
        wasmURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.wasm`,
          'application/wasm'
        ),
      });

      console.log('FFmpeg loaded successfully.');
      console.log('Writing frames to FFmpeg virtual FS...');

      for (let i = 0; i < capturedFrames.length; i++) {
        try {
          const response = await fetch(capturedFrames[i]);
          const blob = await response.blob();
          const arrayBuffer = await blob.arrayBuffer();
          await ffmpeg.writeFile(`frame${i}.png`, new Uint8Array(arrayBuffer));

          if ((i + 1) % 30 === 0) {
            console.log(
              `Wrote ${i + 1} / ${capturedFrames.length} frames to FS`
            );
          }
        } catch (error) {
          console.error(`Error writing frame ${i} to FFmpeg FS:`, error);
          setLoading(false);
          return;
        }
      }
      console.log('Encoding video with FFmpeg...');

      if (audioFile) {
        // Write the audio file into FFmpeg’s virtual FS.
        const ext = audioFile.name.substring(audioFile.name.lastIndexOf('.'));
        const audioFileName = 'input_audio' + ext;
        const audioBuffer = await audioFile.arrayBuffer();
        await ffmpeg.writeFile(audioFileName, new Uint8Array(audioBuffer));

        // First encode the video (without audio) into a temporary file.
        await ffmpeg.exec([
          '-framerate',
          `${fps}`,
          '-start_number',
          '0',
          '-i',
          'frame%d.png',
          '-c:v',
          'libx264',
          '-pix_fmt',
          'yuv420p',
          'temp_video.mp4',
        ]);

        // Then combine video with audio.
        await ffmpeg.exec([
          '-i',
          'temp_video.mp4',
          '-ss',
          `${audioStart}`,
          '-t',
          `${duration}`,
          '-i',
          audioFileName,
          '-c:v',
          'copy',
          '-c:a',
          'aac',
          '-shortest',
          'output.mp4',
        ]);
      } else {
        await ffmpeg.exec([
          '-framerate',
          `${fps}`,
          '-start_number',
          '0',
          '-i',
          'frame%d.png',
          '-c:v',
          'libx264',
          '-pix_fmt',
          'yuv420p',
          'output.mp4',
        ]);
      }

      const data = await ffmpeg.readFile('output.mp4');
      const videoBlob = new Blob([data.buffer], { type: 'video/mp4' });
      const videoURL = URL.createObjectURL(videoBlob);

      const link = document.createElement('a');
      link.href = videoURL;
      link.download = 'video.mp4';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(videoURL);

      // Cleanup files from the virtual FS.
      for (let i = 0; i < capturedFrames.length; i++) {
        try {
          await ffmpeg.deleteFile(`frame${i}.png`);
        } catch (error) {
          console.error(`Error cleaning up frame ${i}:`, error);
        }
      }
      if (audioFile) {
        try {
          await ffmpeg.deleteFile('temp_video.mp4');
        } catch (error) {
          console.error('Error cleaning up temp_video.mp4:', error);
        }
        try {
          const ext = audioFile.name.substring(audioFile.name.lastIndexOf('.'));
          const audioFileName = 'input_audio' + ext;
          await ffmpeg.deleteFile(audioFileName);
        } catch (error) {
          console.error('Error cleaning up audio file:', error);
        }
      }
      await ffmpeg.deleteFile('output.mp4');

      console.log('Export complete: video.mp4 downloaded.');
    } catch (error) {
      console.error('Error processing video:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackgroundPositionXChange = (e) => {
    setBackgroundPositionX(Number(e.target.value));
  };

  const handleBackgroundPositionYChange = (e) => {
    setBackgroundPositionY(Number(e.target.value));
  };

  const isXDisabled = isPortrait || isSquare;
  const isYDisabled = isLandscape || isSquare;

  const containerRatio = containerDimensions.height
    ? containerDimensions.width / containerDimensions.height
    : 0;
  const imageRatio = imageNaturalSize.height
    ? imageNaturalSize.width / imageNaturalSize.height
    : 0;
  const scaleAndAlign =
    imageNaturalSize.width > 0 && Math.abs(imageRatio - containerRatio) < 0.01;

  return (
    <Layout navOffset="center" navOnWhite={true}>
      <div className="dn flex-md flex-col flex-row-md container mla mra pv6-md">
        <div className="col-24 col-8-md pa2">
          <div className="mb2 flex flex-wrap">
            <label className="f6 highlight db mb2 w-100">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-24 pa2 bg-transparent ba bc-black black"
            />
          </div>
          <div className="mb2 flex flex-wrap">
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
                {/* <option value="Square">Square (1:1)</option> */}
                {/* <option value="Story">Story (6:19)</option> */}
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
          <div className="mb2 flex flex-wrap">
            <label className="f6 highlight db mb2 w-100">Audio File</label>
            <input
              type="file"
              onChange={handleAudioFileUpload}
              className="col-24 pa2 bg-highlight"
            />
          </div>
          <div className="mb2 flex flex-wrap">
            <label className="f6 highlight db mb2 w-100">
              Audio Start Time (seconds)
            </label>
            <input
              type="number"
              value={audioStart}
              onChange={(e) => setAudioStart(Number(e.target.value))}
              className="col-24 pa2 bg-transparent ba bc-black black"
              min="0"
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
              text="Export to MP4"
              color="black"
              fluid={false}
              icon={null}
              iconFloat={null}
              inverted={false}
              loading={loading}
              disabled={loading}
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
              backgroundSize: scaleAndAlign ? '120% auto' : 'cover',
              backgroundPosition: scaleAndAlign
                ? `100% ${backgroundPositionY}%`
                : `${backgroundPositionX}% ${backgroundPositionY}%`,
            }}
          >
            <div
              className="canvas-content relative pa2"
              style={{
                height: '100%',
                backgroundImage: 'url(/images/bottom-gradient.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'bottom',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <div className="absolute bottom left right mla mra col-24 pa3">
                <div className="flex flex-wrap ph2 pv1 white mb4">
                  <div className="col-24 flex flex-wrap justify-end tar">
                    <div className="w-100 title bold f3 mb3 pl5">{title}</div>
                    <div className="w-100 subtitle f4 mb4 pl5">{subtitle}</div>
                  </div>
                </div>
              </div>
              {/* Premiere text absolutely positioned at bottom center */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '75px',
                  left: '20px',
                }}
                className="website f6 white"
              >
                Premiere
              </div>

              <div
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                }}
                className="website f6 white"
              >
                <img
                  ref={gifRef}
                  src={soundBar}
                  style={{ display: 'none' }}
                  alt="Animated Sound Bar"
                />
              </div>

              {/* Logo absolutely positioned at bottom right */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '105px',
                  left: '20px',
                }}
              >
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
    </Layout>
  );
};

export default Tool;
