"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Loader2,
  Sparkles,
  WandSparkles,
  Sparkle,
  Image as ImageIcon,
  RefreshCw,
  Zap,
  Eye,
  History,

} from "lucide-react";
import { Footer } from "../components/Footer";
import { FeatureCard } from "../components/FeatureCard";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export default function HomePage() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedPrompts] = useState([
    "A futuristic cityscape with flying cars and neon lights",
    "A serene forest landscape with a hidden treehouse",
  ]);

  const router = useRouter();

  const handleVisitHistory = () => {
    router.push("/history");
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setImageUrl(data.imageUrl);
      } else {
        console.error("Error generating image:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const elements = document.querySelectorAll(".animate-pulse");
      elements.forEach((element) => {
        element.classList.remove("animate-pulse");
        setTimeout(() => {
          element.classList.add("animate-pulse");
        }, 100);
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col bg-black text-white pb-4">
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center p-4">
        <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center lg:items-start gap-12">
          <div className="w-full lg:w-1/2 space-y-8">
            <header className="text-center lg:text-left">
              <div className="mb-4 inline-block relative">
                <Sparkles className="w-12 h-12 text-blue-500 animate-pulse" />
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Unleash your Creativity
              </h1>
              <p className="text-xl text-blue-400">
                with the power of Stable Diffusion
              </p>
            </header>

            <div className="space-y-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Enter your image prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="pr-12"
                />
                <ImageIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
              <Button
                onClick={handleGenerate}
                disabled={isLoading || !prompt}
                className="w-full text-lg font-semibold"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-5 w-5 text-yellow-400" />
                    Generate Image
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                className="w-full text-lg"
                onClick={() => handleVisitHistory()}
              >
                <Eye className="mr-2 h-5 w-5" />
                Visit your Magical History!
              </Button>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold flex items-center mb-4">
                <History className="mr-2 h-5 w-5 text-blue-500" />
                Example Prompts
              </h2>
              <ul className="space-y-2">
                {suggestedPrompts.map((prevPrompt, index) => (
                  <li
                    key={index}
                    className="bg-gray-700 p-3 rounded-md hover:bg-gray-600 transition-colors duration-300 cursor-pointer"
                    onClick={() => setPrompt(prevPrompt)}
                  >
                    {prevPrompt}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {imageUrl ? (
            <div className="w-full lg:w-1/2 space-y-8 mt-8 bg-gray-800 p-4 rounded-lg shadow-lg transition-all duration-500 ease-in-out transform hover:scale-105">
              <img
                src={imageUrl}
                alt="Generated"
                className="w-full h-auto rounded-md"
              />
              <Button
                variant="outline"
                className="mt-4 w-full"
                onClick={() => handleGenerate()}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Generate New Image
              </Button>
            </div>
          ) : (
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <Eye className="mr-2 h-6 w-6 text-blue-500" />
                  How It Works
                </h2>
                <ol className="space-y-4">
                  <li className="flex items-start">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white font-bold mr-3">
                      1
                    </span>
                    <p>
                      Enter a detailed description of the image you want to
                      generate.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white font-bold mr-3">
                      2
                    </span>
                    <p>
                      Click the "Generate Image" button and wait for the AI Magic!
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white font-bold mr-3">
                      3
                    </span>
                    <p>
                      View your generated image and generate new ones as
                      desired.
                    </p>
                  </li>
                </ol>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                <FeatureCard
                  icon={Zap}
                  title="Lightning Fast"
                  description="Generate images in seconds with our optimized AI model."
                />
                <FeatureCard
                  icon={RefreshCw}
                  title="Unlimited Creations"
                  description="Create as many images as you want, anytime you want."
                />
                <FeatureCard
                  icon={Sparkle}
                  title="High Resolution Output"
                  description="Produce high-quality images with stunning detail and clarity."
                />
                <FeatureCard
                  icon={WandSparkles}
                  title="Customizable Styles"
                  description="Tailor the generated images to match your preferred artistic style."
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
