import React, { useState } from "react";

const ImageGeneration = () => {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateImage = async () => {
    if (!prompt) {
      alert("Please enter a prompt!");
      return;
    }
    setLoading(true);
    setError(null);
    setImage(null);

    try {
      console.log("prompt", prompt);
      const response = await fetch(
        "https://api.openai.com/v1/images/generations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openAiApiKey}`,
          },
          body: JSON.stringify({
            model: "dall-e-3",
            prompt: prompt,
            n: 1, // Number of images to generate
            size: "1024x1024", // Image size
          }),
        }
      );

      const data = await response.json();
      console.log("data", data);

      if (response.ok) {
        // Assuming OpenAI returns the image URL as a response
        const imageUrl = data.data[0].url;
        setImage(imageUrl);
      } else {
        setError("Error generating image");
      }
    } catch (error) {
      setError("Error generating image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Image Generation with OpenAI
      </h1>
      <div className="mb-4">
        <label className="block text-lg font-medium text-gray-700">
          Enter prompt for image generation:
        </label>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., a sunset over the ocean"
          className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-6 text-center">
        <button
          onClick={handleGenerateImage}
          disabled={loading}
          className={`w-full py-3 px-6 text-white font-semibold rounded-lg focus:outline-none ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Generating..." : "Generate Image"}
        </button>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {image && (
        <div className="mt-6 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Generated Image
          </h2>
          <img
            src={image}
            alt="Generated"
            className="w-full max-w-md mx-auto rounded-lg shadow-md"
          />
        </div>
      )}
    </div>
  );
};

export default ImageGeneration;
