import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function MemeDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [meme, setMeme] = useState(null);

  // Load meme details and likes from localStorage
  useEffect(() => {
    if (!id) return;

    const storedMemes = JSON.parse(localStorage.getItem("memes")) || [];
    const selectedMeme = storedMemes.find((m) => m.id === id);
    setMeme(selectedMeme);

    const storedLikes = localStorage.getItem(`meme-${id}-likes`);
    setLikes(storedLikes ? parseInt(storedLikes, 10) : 0);

    const storedLikedMemes = JSON.parse(localStorage.getItem("likedMemes")) || [];
    setIsLiked(storedLikedMemes.some((m) => m.id === id));

    const storedComments = JSON.parse(localStorage.getItem(`meme-${id}-comments`)) || [];
    setComments(storedComments);
  }, [id]);

  // Handle Like button click
  const handleLike = () => {
    if (!isLiked) {
      const newLikes = likes + 1;
      setLikes(newLikes);
      setIsLiked(true);
      localStorage.setItem(`meme-${id}-likes`, newLikes);

      // Store liked memes
      const likedMemes = JSON.parse(localStorage.getItem("likedMemes")) || [];
      if (!likedMemes.some((m) => m.id === id)) {
        const newLikedMeme = { id, imageUrl: meme?.url, name: meme?.name, likes: newLikes };
        localStorage.setItem("likedMemes", JSON.stringify([...likedMemes, newLikedMeme]));
      }
    }
  };

  // Handle Comment submission
  const handleComment = () => {
    if (!newComment.trim()) return;
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    localStorage.setItem(`meme-${id}-comments`, JSON.stringify(updatedComments));
    setNewComment("");
  };

  if (!meme) return <div className="text-center p-6 text-xl">Meme not found</div>;

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center">
        Meme Details
      </h1>
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        {/* <img src={meme.url} alt={meme.name} className="w-full mb-4 rounded-lg" /> */}
        <img 
  src={meme.url} 
  alt={meme.name} 
  className="w-full h-[400px] object-contain mb-4 rounded-lg bg-gray-200"
/>
        
        {/* Like Button */}
        <div className="flex items-center mb-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleLike}
            disabled={isLiked}
            className={`p-2 rounded text-white font-semibold transition ${
              isLiked ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
            }`}
          >
            👍 Like ({likes})
          </motion.button>
        </div>

        {/* Comments Section */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Comments</h2>
          <ul className="mt-2">
            {comments.map((comment, index) => (
              <li key={index} className="border-b py-2 text-gray-900 dark:text-gray-300">
                {comment}
              </li>
            ))}
          </ul>
        </div>

        {/* Add Comment Section */}
        <textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="border p-2 rounded w-full mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        <button
          onClick={handleComment}
          className="w-full p-2 rounded text-white bg-blue-500 hover:bg-blue-600 transition font-semibold"
        >
          💬 Add Comment
        </button>
      </div>
    </div>
  );
}

