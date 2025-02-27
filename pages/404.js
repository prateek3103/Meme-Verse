export default function Custom404() {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white">404</h1>
        <p className="text-2xl text-gray-700 dark:text-gray-300">Oops! This page doesn&apost exist.</p>
        <img
          src="https://i.imgflip.com/7w7k5s.jpg"
          alt="Funny Meme"
          className="mt-4 rounded-lg shadow-lg"
        />
      </div>
    );
  }
