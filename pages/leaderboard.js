import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Leaderboard() {
  const router = useRouter();
  const [topMemes, setTopMemes] = useState([]);
  const [userRankings, setUserRankings] = useState([]);

  useEffect(() => {
    // Load memes from localStorage (uploaded + fetched)
    const savedMemes = JSON.parse(localStorage.getItem("memes")) || [];
    const sortedMemes = [...savedMemes].sort((a, b) => b.likes - a.likes); // Sort by likes (descending)
    setTopMemes(sortedMemes.slice(0, 10)); // Top 10 most liked memes

    // Calculate user rankings based on engagement (likes + comments)
    const userEngagement = {};
    savedMemes.forEach((meme) => {
      if (meme.uploadedBy) {
        if (!userEngagement[meme.uploadedBy]) {
          userEngagement[meme.uploadedBy] = { likes: 0, comments: 0 };
        }
        userEngagement[meme.uploadedBy].likes += meme.likes || 0;
        userEngagement[meme.uploadedBy].comments += meme.comments ? meme.comments.length : 0;
      }
    });

    // Convert to sorted array
    const sortedUsers = Object.entries(userEngagement)
      .map(([username, data]) => ({
        username,
        totalEngagement: data.likes + data.comments,
      }))
      .sort((a, b) => b.totalEngagement - a.totalEngagement); // Sort by engagement

    setUserRankings(sortedUsers);
  }, []);

  // Navigate to Meme Details Page
  const handleMemeClick = (meme) => {
    router.push({
      pathname: "/meme/[id]",
      query: { id: meme.id, url: meme.url, name: meme.name, likes: meme.likes || 0 },
    });
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white text-center">
        🏆 Leaderboard
      </h1>

      {/* Top 10 Most Liked Memes */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">🔥 Top 10 Memes</h2>
        {topMemes.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">No memes available yet.</p>
        ) : (
          <ul className="space-y-3">
            {topMemes.map((meme, index) => (
              <li
                key={index}
                onClick={() => handleMemeClick(meme)}
                className="flex justify-between border-b py-2 text-gray-800 dark:text-gray-200 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded"
              >
                <span>{index + 1}. {meme.name || "Untitled Meme"}</span>
                <span className="font-semibold">👍 {meme.likes} Likes</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* User Rankings Based on Engagement */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">📊 User Rankings</h2>
        {userRankings.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">No user rankings yet.</p>
        ) : (
          <ul className="space-y-3">
            {userRankings.map((user, index) => (
              <li key={index} className="flex justify-between border-b py-2 text-gray-800 dark:text-gray-200">
                <span>{index + 1}. {user.username}</span>
                <span className="font-semibold">🔥 {user.totalEngagement} Engagement</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
