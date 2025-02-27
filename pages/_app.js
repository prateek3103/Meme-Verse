// import { useEffect, useState } from 'react';
// import { Provider } from 'react-redux';
// import { store } from '../store/store';
// import '../styles/globals.css';

// function MyApp({ Component, pageProps }) {
//   const [darkMode, setDarkMode] = useState(false);

//   useEffect(() => {
//     // Check local storage for dark mode preference
//     const savedDarkMode = localStorage.getItem('darkMode') === 'true';
//     setDarkMode(savedDarkMode);

//     // Apply dark mode class to the <html> element
//     if (savedDarkMode) {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//   }, []);

//   const toggleDarkMode = () => {
//     const newDarkMode = !darkMode;
//     setDarkMode(newDarkMode);
//     localStorage.setItem('darkMode', newDarkMode);

//     // Toggle dark mode class on the <html> element
//     if (newDarkMode) {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//   };

//   return (
//     <Provider store={store}>
//       <button
//         onClick={toggleDarkMode}
//         className="fixed top-4 right-4 p-2 bg-gray-800 text-white rounded dark:bg-gray-200 dark:text-gray-800"
//       >
//         {darkMode ? 'Toggle Light Mode' : 'Toggle Dark Mode'}
//       </button>
//       <Component {...pageProps} />
//     </Provider>
//   );
// }

// export default MyApp;


import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check local storage for dark mode preference
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);

    // Apply dark mode class to the <html> element
    if (savedDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode);

    // Toggle dark mode class on the <html> element
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <Provider store={store}>
      {/* Dark Mode Toggle Button */}
      <button
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 p-3 flex items-center justify-center w-12 h-12 rounded-full shadow-lg bg-gray-900 dark:bg-gray-200 text-white dark:text-gray-900 transition-all duration-300 hover:scale-105"
        title="Toggle Dark Mode"
      >
        {darkMode ? "☀️" : "🌙"}
      </button>

      {/* Main Component */}
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
