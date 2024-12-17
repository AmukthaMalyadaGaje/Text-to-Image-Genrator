import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const handleGenerateImage = () => {
    // Open localhost:3000 in a new tab/window
    const url = `http://localhost:3000`;
    window.open(url, "_blank");
  };
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-indigo-900 min-h-screen flex flex-col justify-center items-center text-white">
      {/* Header Section */}
      <header className="text-center py-20 px-6 md:px-12">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Welcome to the Text-to-Image Generator
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
          Transform your ideas into stunning visuals with our AI-powered
          text-to-image tool. Just type in a description, and let our AI create
          an image for you in seconds.
        </p>
        <div className="mt-8">
          <Link
            onClick={handleGenerateImage}
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full shadow-md transition duration-300 ease-in-out"
          >
            Try it Now
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="bg-white text-gray-800 py-16 px-6 md:px-12">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Features of the Text-to-Image Generator
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="">
              <img
                src="/ai.jpg"
                alt="AI"
                className="w-24 h-24 mx-auto mb-6 rounded-full"
              />
            </div>
            <h3 className="text-xl font-semibold">AI-Powered</h3>
            <p className="mt-4">
              Our tool uses advanced AI to generate images from any text input,
              ensuring creative and high-quality results.
            </p>
          </div>

          <div className="text-center">
            <div>
              <img
                src="/customize.jpg"
                alt="Customize"
                className="w-24 h-24 mx-auto mb-6 rounded-full"
              />
            </div>
            <h3 className="text-xl font-semibold">Customizable</h3>
            <p className="mt-4">
              You can customize the output by adjusting settings such as seed,
              resolution, and more to match your creative vision.
            </p>
          </div>

          <div className="text-center">
            <div>
              <img
                src="/easytouse.jpeg"
                alt="Easy"
                className="w-24 h-24 mx-auto mb-6 rounded-full"
              />
            </div>
            <h3 className="text-xl font-semibold">Easy to Use</h3>
            <p className="mt-4">
              The interface is simple and intuitive, making it easy for anyone
              to generate images in just a few clicks.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white-800 text-white py-20 px-6 md:px-12 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Ready to See Your Ideas Come to Life?
        </h2>
        <p className="text-lg text-center mb-8">
          Type a prompt and let our AI bring your imagination to life. Start
          creating images now.
        </p>
        <div className="text-center">
          <Link
            onClick={handleGenerateImage}
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full shadow-md transition duration-300 ease-in-out"
          >
            Generate Your Image
          </Link>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-6 px-4 mt-12 w-full text-center">
        <p>&copy; 2024 Text-to-Image Generator. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
