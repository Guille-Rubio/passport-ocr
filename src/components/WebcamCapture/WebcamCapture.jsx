import React, { useState, useEffect } from "react";
import Webcam from "react-webcam";
import Tesseract from "tesseract.js";
import { cropMrz } from "../../helpers/mrz/run/getMrz";
import { saveAs } from "file-saver";



//import { Buffer } from "buffer";

const imageMimeType = /image\/(png|jpg|jpeg)/i;

const WebcamCapture = () => {
  // FORM INPUT

  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const [mrz, setMrz] = useState(null);
  const [croppedMrzImage, setCroppedMrzImage] = useState("");


  //HELPERS (TODO remove from this script)

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[arr.length - 1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }


  //Detects new uploaded image
  const changeHandler = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (!file.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
    setFile(file);
  };

  //converts input in base64 and saves as preview
  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          console.log("PREVIEWB64", result);
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  //Crops MRZ from the preview
  useEffect(() => {

    if (fileDataURL) {
      const cropForm = async () => {
        const { crop } = await cropMrz(fileDataURL); //uint8array MOST LIKELY ERROR IS HERE!
        console.log("CROP", crop);
        const mrzUrl = crop.toDataURL()
        console.log("URL", mrzUrl);

        const mrzFile = dataURLtoFile(mrzUrl);
        //        saveAs(mrzFile, "mrz.png");

        setMrz(mrzUrl);
      };
      cropForm();
    }
  }, [fileDataURL]);

  const downloadMzr = () => {
    saveAs(mrz, "mzr.png");
  };
  const downloadPreview = () => {
    saveAs(file, "preview.jpeg");
  };

  useEffect(() => {
    if (mrz) {
      const doOcr = async () => {
        await recognizeImg(mrz);
      };

      doOcr();
    }
  }, [mrz]);

  //CAMERA INPUT

  const [preview, setPreview] = useState("");
  const [mrzPreview, setMrzPreview] = useState(
    "https://developers.innovatrics.com/digital-onboarding/docs/functionalities/document/mrz-parsing/TD3.png"
  );

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user" || { exact: "environment" },
  };

  useEffect(() => {
    if (preview) {
      const setCropPreview = async () => {
        const newHeader = "data:image/jpeg;base64," + preview.split(",")[1];
        const { crop } = await cropMrz(newHeader); //uint8array

        setMrzPreview(crop.toDataURL());
      };
      setCropPreview();
    }
  }, [preview]);



  const recognizeImg = async (image) => {

    console.log(image);

    (async () => {
      try {
        (async () => {
          const worker = await Tesseract.createWorker({
            logger: (m) => console.log(m),
          });

          await worker.loadLanguage("eng");
          await worker.initialize("eng");
          const {
            data: { text },
          } = await worker.recognize(image);
          console.log(text);
          await worker.terminate();

        })();
      } catch (error) {
        console.log(error);
        console.log(error.message);
      }
    })();
  };

  return (
    <>
      <h1>Form Input</h1>
      <label htmlFor="image"> Browse images </label>
      <input
        type="file"
        id="image"
        accept=".png, .jpg, .jpeg"
        onChange={changeHandler}
      />

      {fileDataURL ? (
        <p className="img-preview-wrapper">
          {<img src={fileDataURL} alt="preview" width="200px" />}
          {<img src={mrz} alt="previewMRZ" width="200px" />}
        </p>
      ) : null}
      <button onClick={downloadMzr}>Descargar MRZ</button>
      <button onClick={downloadPreview}>Descargar Vista Previa</button>

      <h1>Camera input</h1>
      <Webcam
        audio={false}
        height={520}
        screenshotFormat="image/jpeg"
        width={720}
        videoConstraints={videoConstraints}
      >
        {({ getScreenshot }) => (
          <button
            onClick={async () => {
              const imageSrc = getScreenshot(); //data:image/jpeg;base64,
              console.log(imageSrc);
              setPreview(imageSrc);
            }}
          >
            Take picture
          </button>
        )}
      </Webcam>
      <h1>Preview</h1>
      <img src={preview} alt="capture" width="200px" />
      <img src={mrzPreview} alt="mzr" width="200px" />
    </>
  );
};

export default WebcamCapture;
