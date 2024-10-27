"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Footer } from "../components/Footer";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useRouter } from "next/navigation"; 

export default function HomePage() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

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

  const handleVisitHistory = () => {
    router.push("/history"); // Navigate to the dashboard page
  };

  return (
    <>
      <div className="min-h-screen flex flex-col bg-black text-white p-4">
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-6xl flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="w-full max-w-md space-y-8">
            <header className="text-center md:text-left">
              <div className="mb-4">
                <svg
                  className="w-12 h-12 mx-auto md:mx-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">
                Unleash your Creativity
              </h1>
              <p className="text-sm text-gray-400">
                with the power of Stable Diffusion
              </p>
            </header>

            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Enter your image prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <Button onClick={handleGenerate} disabled={isLoading || !prompt}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Image"
                )}
              </Button>
            </div>

            <Button variant="outline" onClick={handleVisitHistory}>Visit Your Magical History</Button>
          </div>

          <div className="w-full max-w-md self-start md:self-auto ml-auto">
            <div className="aspect-square rounded-lg overflow-hidden shadow-lg border border-gray-700">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Generated"
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                src="/demo-ai-image.png"
                alt="demo-ai-image"
                className="w-full h-full object-cover"
                />
              )}
            </div>
            <p className="text-center mt-2 text-sm text-gray-400">
              AI Generated Magic is Here!
            </p>
          </div>
        </div>
      </div>
      <Footer />
      </div>
    </>
  );
}