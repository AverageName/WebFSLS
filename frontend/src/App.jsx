import "./App.css";
import { useState, useRef } from "react";
import { sendVideo } from "./middleware";
import { DrawDesk } from "./components/DrawDesk/DrawDesk";

function App() {
  const videoRef = useRef(null);
  const [isVideoPlaying, setVideoPlaying] = useState(false);
  const [isVideoLoaded, setVideoLoaded] = useState(false);
  let videoFile = null;

  function onVideoInput(event) {
    const file = event.target.files[0];
    if (file.type !== "video/mp4") {
      alert("File type is not .mp4");
      return;
    }
    videoRef.current.src = window.URL.createObjectURL(file);
    videoFile = file;
    setVideoLoaded(true);
  }

  function toggleVideo() {
    setVideoPlaying(!isVideoPlaying);
    if (isVideoPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  }

  async function send() {
    const result = await sendVideo(videoFile);
    if (!result) {
      alert("error");
      return;
    }
    alert("success :)");
  }

  return (
    <div className="app">
      <div className="controller">
        <input type="file" onInput={onVideoInput} />
        <button onClick={send}>Send</button>
      </div>

      <video ref={videoRef} className="video" type="video/mp4" />
      {isVideoLoaded && <button onClick={toggleVideo}>{isVideoPlaying ? "Pause" : "Play"}</button>}

      <DrawDesk />
    </div>
  );
}

export default App;
