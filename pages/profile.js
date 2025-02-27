import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../store/userSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user) || {};

  // State variables
  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [profilePicture, setProfilePicture] = useState(user?.profilePicture || "/default-profile.png");
  const [uploadedMemes, setUploadedMemes] = useState([]);
  const [likedMemes, setLikedMemes] = useState([]);

  // Load profile and memes from localStorage
  useEffect(() => {
    try {
      const savedProfile = JSON.parse(localStorage.getItem("profile"));
      if (savedProfile) {
        setName(savedProfile.name || "");
        setBio(savedProfile.bio || "");
        setProfilePicture(savedProfile.profilePicture || "/default-profile.png");
      }

      const savedMemes = JSON.parse(localStorage.getItem("uploadedMemes")) || [];
      setUploadedMemes(savedMemes);

      const savedLikes = JSON.parse(localStorage.getItem("likedMemes")) || [];
      setLikedMemes(savedLikes);
    } catch (error) {
      console.error("Error loading data from local storage:", error);
    }
  }, []);

  // Save profile to localStorage and Redux
  const handleSave = () => {
    const updatedProfile = { name, bio, profilePicture };
    dispatch(updateProfile(updatedProfile));
    localStorage.setItem("profile", JSON.stringify(updatedProfile));
    alert("Profile Updated!");
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white text-center">Profile</h1>

      {/* Profile Info Section */}
      <div className="border rounded-lg p-6 max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-lg">
        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={profilePicture}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-gray-300 dark:border-gray-600 shadow-lg object-cover"
            onError={(e) => (e.target.src = "/default-profile.png")} // Fallback if image fails to load
          />
        </div>

        {/* Name Input */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        {/* Bio Input */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Bio</label>
          <textarea
            placeholder="Tell us about yourself"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="border p-2 rounded w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        {/* Profile Picture Input */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Profile Picture URL</label>
          <input
            type="text"
            placeholder="Enter profile picture URL"
            value={profilePicture}
            onChange={(e) => setProfilePicture(e.target.value)}
            className="border p-2 rounded w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition"
        >
          Save Profile
        </button>
      </div>

      {/* Uploaded & Liked Memes Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your Uploaded Memes</h2>
        {uploadedMemes.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400 text-center">You have not uploaded any memes yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {uploadedMemes.map((meme, index) => (
              <div key={index} className="border rounded-lg overflow-hidden shadow-md">
                <img src={meme.imageUrl} alt={meme.caption} className="w-full h-auto object-contain" />
                <div className="p-3">
                  <p className="text-gray-900 dark:text-white text-sm">{meme.caption}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Liked Memes Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Liked Memes</h2>
        {likedMemes.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400 text-center">You haven&apost liked any memes yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {likedMemes.map((meme, index) => (
              <div key={index} className="border rounded-lg overflow-hidden shadow-md">
                <img src={meme.imageUrl} alt={meme.caption} className="w-full h-auto object-contain" />
                <div className="p-3">
                  <p className="text-gray-900 dark:text-white text-sm">{meme.caption}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
