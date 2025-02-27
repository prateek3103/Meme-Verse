import { useState } from "react";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState(""); // Store plain text caption
  const [previewUrl, setPreviewUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile)); // Generate preview URL
    }
  };

  // Handle caption change
  const handleCaptionChange = (e) => {
    setCaption(e.target.value); // Store only plain text
  };

  // Upload meme & store it in localStorage
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const imgbbResponse = await fetch(
        "https://api.imgbb.com/1/upload?key=3d7843d786e337eb5490f66015196412",
        { method: "POST", body: formData }
      );
      const imgbbData = await imgbbResponse.json();

      // Ensure caption is correctly saved
      const cleanCaption = caption.trim();

      if (!cleanCaption) {
        alert("Please add a caption before uploading.");
        setIsUploading(false);
        return;
      }

      // Store uploaded meme in localStorage
      const newMeme = {
        id: Date.now(), // Unique ID
        imageUrl: imgbbData.data.url,
        caption: cleanCaption, // Save only plain text
        likes: 0, // Default like count
        comments: [],
      };

      const storedMemes = JSON.parse(localStorage.getItem("uploadedMemes")) || [];
      const updatedMemes = [...storedMemes, newMeme];
      localStorage.setItem("uploadedMemes", JSON.stringify(updatedMemes));

      alert("Meme uploaded successfully!");

      // Reset form
      setFile(null);
      setCaption("");
      setPreviewUrl("");
    } catch (error) {
      console.error("Error uploading meme:", error);
      alert("Failed to upload meme. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="max-w-lg w-full bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
        {/* Title */}
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-6">
          Upload Your Meme 🚀
        </h1>

        {/* File Input */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
            Select Meme Image 📷
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="w-full border p-2 rounded-lg bg-gray-200 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Image Preview */}
        {previewUrl && (
          <div className="mb-4 flex justify-center">
            <img
              src={previewUrl}
              alt="Meme Preview"
              className="w-full max-h-[300px] object-contain rounded-lg shadow-md border border-gray-300 dark:border-gray-600 p-2"
            />
          </div>
        )}

        {/* Caption Input */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
            Add a Caption ✍️
          </label>
          <textarea
            value={caption}
            onChange={handleCaptionChange}
            placeholder="Write your meme caption here..."
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white text-gray-900 focus:ring-2 focus:ring-blue-500 resize-none h-24"
          />
        </div>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={!file || isUploading}
          className={`w-full py-3 rounded-lg text-white font-semibold transition ${
            !file || isUploading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-500 to-blue-700 hover:opacity-90"
          } flex justify-center items-center`}
        >
          {isUploading ? (
            <span className="animate-spin h-5 w-5 border-4 border-white border-t-transparent rounded-full"></span>
          ) : (
            "⬆️ Upload Meme"
          )}
        </button>
      </div>
    </div>
  );
}
