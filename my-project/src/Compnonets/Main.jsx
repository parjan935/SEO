import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Spinner from "./Spinner";
import LoadingDots from "./LoadingDots";
import Footer from "./Footer";
import Copy from "./Copy";

// import userDetails from "./Navbar";

import { useNavigate } from "react-router-dom";

const Main = () => {
  const token = localStorage.getItem("Token");
  const navigate = useNavigate();

  const [videoFile, setVideoFile] = useState(null);
  const [videoSize, setVideoSize] = useState(null);

  const [status, setStatus] = useState("");
  const [data, setData] = useState(null);
  const [process, setProcess] = useState(false);
  const [isDisable, setIsDisable] = useState(false);

  const handleFileChange = (e) => {
    handleReset()
    setVideoFile(e.target.files[0]);
    const fil = videoFile;
    if (videoFile) {
      const fileSizeInMB = (videoFile.size / (1024 * 1024)).toFixed(2);
      setVideoSize(fileSizeInMB);
    }
  };

  const handleReset=()=>{
    setData(null)
    setStatus("")
    setVideoFile(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setProcess(true);
    setIsDisable(true);

    if (!videoFile) return setStatus("Please select a video file.");

    const formData = new FormData();
    formData.append("video", videoFile);

    try {
      const response = await fetch("http://localhost:5000/process_video", {
        method: "POST",
        body: formData,
      });
      console.log(response);

      if (response.ok) {
        const textResponse = await response.text();
        const parsed = JSON.parse(textResponse);
        console.log(parsed);
        setData(parsed);
        setStatus("Video processed successfully!");
      } else {
        setStatus(`Video processing failed: ${await response.text()}`);
      }
    } catch (error) {
      setStatus("An error occurred during the video processing.");
    }

    setProcess(false);
    setIsDisable(false);
  };

  const [copySuccess, setCopySuccess] = useState("");

  const handleCopyText = () => {
    navigator.clipboard.writeText("textToCopy").then(
      () => setCopySuccess("Text copied!"),
      () => setCopySuccess("Failed to copy!")
    );
  };

  useEffect(() => {
    if (!token) {
      alert("Session Logged Out.\nPlease Login Again.");
      navigate("/signin");
    }
  }, []);

  return (
    <div className="flex flex-col bg-navy2 min-h-screen h-fit">
      <Navbar />
      <div className="mt-32 text-center text-white flex-grow pb-8">
        <input
          className="m-5 text-white w-fit"
          type="file"
          accept="video/mp4"
          onChange={handleFileChange}
          disabled={isDisable}
          name="mp4"
          id="video"
          placeholder=""
        />
        {videoFile && (
          <div className="text-white space-y-5">
            <p>Selected File: {videoFile.name}</p>
            {videoFile && (
              <p className="text-lime-500">
                Video Size: {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            )}
            <button
              disabled={isDisable}
              className={`bg-red-500 p-2 rounded ${
                isDisable ? "bg-blue-100 cursor-not-allowed" : ""
              }`}
              onClick={handleSubmit}
            >
              Upload Video
            </button>
          </div>
        )}
        {process ? (
          <div className="flex justify-center space-x-4">
            <Spinner />
            <h1 className=" text-white text-3xl m-5 ml-3 mr-0 space-x-0">
              Processing video
            </h1>
          </div>
        ) : (
          " "
        )}
        {!process && status != "" ? (
          <div>
            <h1 className="text-white m-5 text-2xl">
              {status}
            </h1>
          </div>
        ) : (
          ""
        )}

        {data && !process && (
          <div className="mt-3 text-white flex flex-col space-y-10 justify-center ">
            <div className="flex justify-center">
              <div className="bg-gray-400 rounded-lg text-black shadow-[0px_0px_30px_rgba(0,0,0,0.5)] w-3/4  p-5  ">
                <h1 className=" flex justify-center text-3xl mb-4 font-medium text-center">
                  Summary : <Copy text={data.Summary} />{" "}
                </h1>
                <p>{data.Summary}</p>
              </div>
            </div>
            <div className="flex justify-center">
              <div
                className="bg-gray-400 rounded-lg text-black shadow-[0px_0px_30px_rgba(0,0,0,0.5)] w-fit p-5 px-10 lg:px-32 
              text-left "
              >
                <h1 className="flex justify-center mb-4 text-3xl font-medium text-center">
                  Titles : <Copy text={data.Titles} />
                </h1>
                <p>
                  {data.Titles.map((key, index) => (
                    <li key={index}>{key}</li>
                  ))}
                </p>
              </div>
            </div>
            <div className="flex flex-col space-y-10 space-x-0 md:flex-row md:space-x-10 md:space-y-0 text-white justify-center mx-auto">
              <div className="bg-gray-400 rounded-lg text-black shadow-[0px_0px_30px_rgba(0,0,0,0.5)] w-fit text-left p-10 pt-0">
                <h1 className="flex justify-center text-3xl font-medium text-center py-5 pb-4">
                  Keywords : <Copy text={data.Keywords} />
                </h1>
                <p>
                  {data.Keywords.map((key, index) => (
                    <li key={index}>{key}</li>
                  ))}
                </p>
              </div>
              <div className="bg-gray-400 rounded-lg text-black shadow-[0px_0px_30px_rgba(0,0,0,0.5)] w-fit text-left p-10 pt-0">
                <h1 className="flex justify-center text-3xl font-medium text-center py-5 pb-4">
                  Hashtags : <Copy text={data.Hashtags} />
                </h1>
                <p>
                  {data.Hashtags.map((tag, index) => (
                    <li key={index}>{tag}</li>
                  ))}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Main;
