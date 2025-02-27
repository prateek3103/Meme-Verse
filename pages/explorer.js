// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setMemes, setLoading, setError } from '../store/memeSlice';
// import { motion } from 'framer-motion';
// import debounce from 'lodash.debounce';
// import Link from 'next/link';

// export default function Explorer() {
//   const dispatch = useDispatch();
//   const { memes, loading, error } = useSelector((state) => state.memes);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredMemes, setFilteredMemes] = useState([]);
//   const [category, setCategory] = useState('Trending'); // Default category
//   const [sortBy, setSortBy] = useState('likes'); // Default sorting

//   // Fetch memes from the API and localStorage
//   useEffect(() => {
//     const fetchMemes = async () => {
//       dispatch(setLoading(true));
//       try {
//         const response = await fetch('https://api.imgflip.com/get_memes');
//         const data = await response.json();
//         dispatch(setMemes(data.data.memes)); // Save API memes to Redux store
//         localStorage.setItem('memes', JSON.stringify(data.data.memes)); // Save API memes to localStorage
//       } catch (err) {
//         dispatch(setError(err.message));
//       } finally {
//         dispatch(setLoading(false));
//       }
//     };

//     // Check if memes are already saved in localStorage
//     const savedMemes = JSON.parse(localStorage.getItem('memes')) || [];
//     const uploadedMemes = JSON.parse(localStorage.getItem('uploadedMemes')) || [];

//     // Combine API memes and uploaded memes
//     const allMemes = [...savedMemes, ...uploadedMemes];

//     dispatch(setMemes(allMemes)); // Save combined memes to Redux store
//     setFilteredMemes(allMemes); // Initialize filtered memes

//     // Fetch memes from the API if not saved in localStorage
//     if (savedMemes.length === 0) {
//       fetchMemes();
//     }
//   }, [dispatch]);

//   // Debounced search function
//   const handleSearch = debounce((query) => {
//     if (query) {
//       const filtered = memes.filter((meme) =>
//         meme.name?.toLowerCase().includes(query.toLowerCase()) ||
//         meme.caption?.toLowerCase().includes(query.toLowerCase())
//       );
//       setFilteredMemes(filtered);
//     } else {
//       setFilteredMemes(memes); // Show all memes if search query is empty
//     }
//   }, 300);

//   // Handle search input change
//   const handleInputChange = (e) => {
//     const query = e.target.value;
//     setSearchQuery(query);
//     handleSearch(query);
//   };

//   // Filter memes by category
//   const filterByCategory = (memes, category) => {
//     switch (category) {
//       case 'Trending':
//         return memes.sort((a, b) => b.likes - a.likes); // Sort by likes (descending)
//       case 'New':
//         return memes.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // Sort by date (newest first)
//       case 'Classic':
//         return memes.filter((meme) => meme.likes > 1000); // Filter by likes (classic memes)
//       case 'Random':
//         return memes.sort(() => Math.random() - 0.5); // Randomize memes
//       default:
//         return memes;
//     }
//   };

//   // Sort memes by likes, date, or comments
//   const sortMemes = (memes, sortBy) => {
//     switch (sortBy) {
//       case 'likes':
//         return memes.sort((a, b) => b.likes - a.likes); // Sort by likes (descending)
//       case 'date':
//         return memes.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // Sort by date (newest first)
//       case 'comments':
//         return memes.sort((a, b) => b.comments - a.comments); // Sort by comments (descending)
//       default:
//         return memes;
//     }
//   };

//   // Apply filters and sorting
//   useEffect(() => {
//     let updatedMemes = [...memes];

//     // Apply category filter
//     updatedMemes = filterByCategory(updatedMemes, category);

//     // Apply sorting
//     updatedMemes = sortMemes(updatedMemes, sortBy);

//     // Apply search filter
//     if (searchQuery) {
//       updatedMemes = updatedMemes.filter((meme) =>
//         meme.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         meme.caption?.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     setFilteredMemes(updatedMemes);
//   }, [memes, category, sortBy, searchQuery]);

//   if (loading)
//     return (
//       <div className="flex items-center justify-center min-h-screen text-xl font-semibold text-gray-800 dark:text-gray-200">
//         Loading memes...
//       </div>
//     );

//   if (error)
//     return (
//       <div className="flex items-center justify-center min-h-screen text-xl font-semibold text-red-500">
//         Error: {error}
//       </div>
//     );

//   return (
//     <div className="p-8 bg-gray-100 dark:bg-gray-900 min-h-screen transition-all">
//       {/* Title */}
//       <h1 className="text-5xl font-extrabold mb-8 text-gray-900 dark:text-white text-center">
//         Meme Explorer
//       </h1>

//       {/* Category Filter */}
//       <div className="flex flex-wrap justify-center gap-4 mb-8">
//         <button
//           onClick={() => setCategory('Trending')}
//           className={`p-2 rounded-lg shadow-md transition-all ${
//             category === 'Trending'
//               ? 'bg-blue-500 text-white'
//               : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
//           }`}
//         >
//           Trending
//         </button>
//         <button
//           onClick={() => setCategory('New')}
//           className={`p-2 rounded-lg shadow-md transition-all ${
//             category === 'New'
//               ? 'bg-blue-500 text-white'
//               : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
//           }`}
//         >
//           New
//         </button>
//         <button
//           onClick={() => setCategory('Classic')}
//           className={`p-2 rounded-lg shadow-md transition-all ${
//             category === 'Classic'
//               ? 'bg-blue-500 text-white'
//               : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
//           }`}
//         >
//           Classic
//         </button>
//         <button
//           onClick={() => setCategory('Random')}
//           className={`p-2 rounded-lg shadow-md transition-all ${
//             category === 'Random'
//               ? 'bg-blue-500 text-white'
//               : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
//           }`}
//         >
//           Random
//         </button>
//       </div>

//       {/* Sorting Options */}
//       <div className="flex flex-wrap justify-center gap-4 mb-8">
//         <label className="text-gray-800 dark:text-gray-200">Sort By:</label>
//         <select
//           value={sortBy}
//           onChange={(e) => setSortBy(e.target.value)}
//           className="border p-2 rounded-lg shadow-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
//         >
//           <option value="likes">Likes</option>
//           <option value="date">Date</option>
//           <option value="comments">Comments</option>
//         </select>
//       </div>

//       {/* Search Input */}
//       <div className="flex justify-center mb-8">
//         <input
//           type="text"
//           placeholder="Search memes..."
//           value={searchQuery}
//           onChange={handleInputChange}
//           className="border p-2 rounded-lg shadow-md w-full max-w-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
//         />
//       </div>

//       {/* Meme Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {filteredMemes.map((meme) => (
//           <Link key={meme.id} href={`/meme/${meme.id}`} passHref>
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               className="cursor-pointer border rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 transition-transform duration-200 hover:shadow-2xl"
//             >
//               {/* Image Container (Fixed Height: 380px) */}
//               <div className="w-full h-[380px] flex items-center justify-center bg-gray-200 dark:bg-gray-700">
//                 <img
//                   src={meme.imageUrl || meme.url}
//                   alt={meme.name || meme.caption}
//                   className="max-w-[95%] max-h-[95%] object-contain transition-transform duration-200 hover:scale-105"
//                 />
//               </div>

//               {/* Meme Title */}
//               <div className="p-4">
//                 <h2 className="text-xl font-semibold text-gray-900 dark:text-white text-center">
//                   {meme.name || meme.caption}
//                 </h2>
//               </div>
//             </motion.div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }





import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMemes, setLoading, setError } from '../store/memeSlice';
import { motion } from 'framer-motion';
import debounce from 'lodash.debounce';
import Link from 'next/link';

export default function Explorer() {
  const dispatch = useDispatch();
  const { memes, loading, error } = useSelector((state) => state.memes);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMemes, setFilteredMemes] = useState([]);
  const [category, setCategory] = useState('Trending'); // Default category
  const [sortBy, setSortBy] = useState('likes'); // Default sorting

  // Fetch memes from the API and localStorage
  useEffect(() => {
    const fetchMemes = async () => {
      dispatch(setLoading(true));
      try {
        const response = await fetch('https://api.imgflip.com/get_memes');
        const data = await response.json();
        dispatch(setMemes(data.data.memes)); // Save API memes to Redux store
        localStorage.setItem('memes', JSON.stringify(data.data.memes)); // Save API memes to localStorage
      } catch (err) {
        dispatch(setError(err.message));
      } finally {
        dispatch(setLoading(false));
      }
    };

    // Check if memes are already saved in localStorage
    const savedMemes = JSON.parse(localStorage.getItem('memes')) || [];
    const uploadedMemes = JSON.parse(localStorage.getItem('uploadedMemes')) || [];

    // Combine API memes and uploaded memes
    const allMemes = [...savedMemes, ...uploadedMemes];

    dispatch(setMemes(allMemes)); // Save combined memes to Redux store
    setFilteredMemes(allMemes); // Initialize filtered memes

    // Fetch memes from the API if not saved in localStorage
    if (savedMemes.length === 0) {
      fetchMemes();
    }
  }, [dispatch]);

  // Debounced search function
  const handleSearch = debounce((query) => {
    if (query) {
      const filtered = memes.filter((meme) =>
        meme.name?.toLowerCase().includes(query.toLowerCase()) ||
        meme.caption?.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMemes(filtered);
    } else {
      setFilteredMemes(memes); // Show all memes if search query is empty
    }
  }, 300);

  // Handle search input change
  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  // Filter memes by category
  const filterByCategory = (memes, category) => {
    switch (category) {
      case 'Trending':
        return memes.sort((a, b) => (b.likes || 0) - (a.likes || 0)); // Sort by likes (descending)
      case 'New':
        return memes.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // Sort by date (newest first)
      case 'Classic':
        return memes.filter((meme) => (meme.likes || 0) > 1000); // Filter by likes (classic memes)
      case 'Random':
        return memes.sort(() => Math.random() - 0.5); // Randomize memes
      default:
        return memes;
    }
  };

  // Sort memes by likes, date, or comments
  const sortMemes = (memes, sortBy) => {
    switch (sortBy) {
      case 'likes':
        return [...memes].sort((a, b) => (b.likes || 0) - (a.likes || 0)); // Sort by likes (descending)
      case 'date':
        return [...memes].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // Sort by date (newest first)
      case 'comments':
        return [...memes].sort((a, b) => (b.comments || 0) - (a.comments || 0)); // Sort by comments (descending)
      default:
        return memes;
    }
  };

  // Apply filters and sorting
  useEffect(() => {
    let updatedMemes = [...memes];

    // Apply category filter
    updatedMemes = filterByCategory(updatedMemes, category);

    // Apply sorting
    updatedMemes = sortMemes(updatedMemes, sortBy);

    // Apply search filter
    if (searchQuery) {
      updatedMemes = updatedMemes.filter((meme) =>
        meme.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meme.caption?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredMemes(updatedMemes);
  }, [memes, category, sortBy, searchQuery]);

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
        Meme Explorer
      </h1>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button
          onClick={() => setCategory('Trending')}
          className={`p-2 rounded-lg shadow-md transition-all ${
            category === 'Trending'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
          }`}
        >
          Trending
        </button>
        <button
          onClick={() => setCategory('New')}
          className={`p-2 rounded-lg shadow-md transition-all ${
            category === 'New'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
          }`}
        >
          New
        </button>
        <button
          onClick={() => setCategory('Classic')}
          className={`p-2 rounded-lg shadow-md transition-all ${
            category === 'Classic'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
          }`}
        >
          Classic
        </button>
        <button
          onClick={() => setCategory('Random')}
          className={`p-2 rounded-lg shadow-md transition-all ${
            category === 'Random'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
          }`}
        >
          Random
        </button>
      </div>

      {/* Sorting Options */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <label className="text-gray-800 dark:text-gray-200">Sort By:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border p-2 rounded-lg shadow-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
        >
          <option value="likes">Likes</option>
          <option value="date">Date</option>
          <option value="comments">Comments</option>
        </select>
      </div>

      {/* Search Input */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search memes..."
          value={searchQuery}
          onChange={handleInputChange}
          className="border p-2 rounded-lg shadow-md w-full max-w-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
        />
      </div>

      {/* Meme Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMemes.map((meme) => (
          <Link key={meme.id} href={`/meme/${meme.id}`} passHref>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer border rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 transition-transform duration-200 hover:shadow-2xl"
            >
              {/* Image Container (Fixed Height: 380px) */}
              <div className="w-full h-[380px] flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                <img
                  src={meme.imageUrl || meme.url}
                  alt={meme.name || meme.caption}
                  className="max-w-[95%] max-h-[95%] object-contain transition-transform duration-200 hover:scale-105"
                />
              </div>

              {/* Meme Title */}
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white text-center">
                  {meme.name || meme.caption}
                </h2>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}