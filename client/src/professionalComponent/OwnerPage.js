import React, { useState } from "react";
// import Details from "../clientComponent/Details";
// import Home from "../publicComponent/jsP/Home";
import HomeClient from "../clientComponent/HomeClient";
export default function ImageUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  function fileSelectedHandler(event) {
    setSelectedFile(event.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  function fileUploadHandler() {
    // Replace the URL with your own endpoint
    const url = "https://example.com/upload";
    const formData = new FormData();
    formData.append("image", selectedFile);
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        // Handle successful uploads
      })
      .catch((error) => {
        // Handle errors
      });
  }

  return (
    <div>
      <input type="file" onChange={fileSelectedHandler} />
      {previewUrl && (
        <img src={previewUrl} alt="Preview" style={{ maxWidth: "10%" }} />
      )}
      {selectedFile && <button onClick={fileUploadHandler}>Upload</button>}
      <HomeClient/>
    </div>
  );
}
