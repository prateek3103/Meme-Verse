import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMemes, setLoading, setError } from "../store/memeSlice";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  const dispatch = useDispatch();
  const { memes, loading, error } = useSelector((state) => state.memes);

  useEffect(() => {
    const fetchMemes = async () => {
      dispatch(setLoading(true));
      try {
        const response = await fetch("https://api.imgflip.com/get_memes");
        const data = await response.json();
        dispatch(setMemes(data.data.memes));
      } catch (err) {
        dispatch(setError(err.message));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchMemes();
  }, [dispatch]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-xl font-semibold text-gray-800 dark:text-gray-200">
        Loading memes...
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen text-xl font-semibold text-red-500">
        Error: {error}
      </div>
    );

  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-900 min-h-screen transition-all">
      {/* Title */}
      <h1 className="text-5xl font-extrabold mb-8 text-gray-900 dark:text-white text-center">
        Welcome to <span className="text-blue-600 dark:text-yellow-300">MemeVerse</span>
      </h1>

      {/* Navigation Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <Link href="/explorer">
          <button className="bg-blue-500 text-white px-5 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all">
            🔍 Explore Memes
          </button>
        </Link>
        <Link href="/upload">
          <button className="bg-green-500 text-white px-5 py-3 rounded-lg shadow-md hover:bg-green-600 transition-all">
            ⬆️ Upload Meme
          </button>
        </Link>
        <Link href="/profile">
          <button className="bg-purple-500 text-white px-5 py-3 rounded-lg shadow-md hover:bg-purple-600 transition-all">
            👤 Profile
          </button>
        </Link>
        <Link href="/leaderboard">
          <button className="bg-yellow-500 text-white px-5 py-3 rounded-lg shadow-md hover:bg-yellow-600 transition-all">
            🏆 Leaderboard
          </button>
        </Link>
      </div>

      {/* Trending Memes Section */}
      <div className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md transition-all">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white text-center">
          🎉 Trending Memes
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {memes.map((meme) => (
            <motion.div
              key={meme.id}
              whileHover={{ scale: 1.05 }}
              className="border rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 transition-transform duration-200 hover:shadow-2xl"
            >
              {/* Wrap meme in Link for navigation */}
              <Link href={`/meme/${meme.id}`} passHref>
                <div className="cursor-pointer">
                  <div className="w-full h-[380px] flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                    <img
                      src={meme.url}
                      alt={meme.name}
                      className="max-w-[95%] max-h-[95%] object-contain transition-transform duration-200 hover:scale-105"
                    />
                  </div>

                  {/* Meme Title */}
                  <div className="p-4 text-center">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {meme.name}
                    </h2>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}



// import { useEffect } from 'react'; 