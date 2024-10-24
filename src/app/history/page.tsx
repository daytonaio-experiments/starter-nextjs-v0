'use client'

import { useState } from 'react'
import { Footer } from '../components/Footer'
import { Modal } from '../components/ImagePopUp'

export default function ImageDashboard() {

  const defaultImageUrl = "https://files.oaiusercontent.com/file-mqS1lxXQCkJ5fXaShLtx9siA?se=2024-10-24T10%3A31%3A02Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D76e38b96-8167-4e35-9a93-21535bb10884.webp&sig=4eoXycJHiyjQxz4sLJu1GGXK5lKnThT5hQWwn/gRdd8%3D";
  const [images] = useState([
    { id: 1, url: defaultImageUrl, prompt: 'A futuristic cityscape' },
    { id: 2, url: defaultImageUrl, prompt: 'A serene forest landscape' },
    { id: 3, url: defaultImageUrl, prompt: 'An abstract representation of AI' },
    { id: 4, url: defaultImageUrl, prompt: 'A portrait of a cyberpunk character' },
    { id: 5, url: defaultImageUrl, prompt: 'A surreal underwater scene' },
    { id: 6, url: defaultImageUrl, prompt: 'A steampunk-inspired machine' },
  ])

  const [selectedImage, setSelectedImage] = useState<{ id: number, url: string, prompt: string } | null>(null)

  return (
    <div className="min-h-screen flex flex-col bg-black text-white p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Your AI Image History</h1>
        <p className="text-gray-400">Click on an image to view it in full size</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image) => (
          <div 
            key={image.id} 
            className="bg-gray-900 rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105"
            onClick={() => setSelectedImage(image)}
          >
            <img src={image.url} alt={image.prompt} className="w-full h-48 object-cover" />
            <div className="p-4">
              <p className="text-sm text-gray-300 truncate">{image.prompt}</p>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={!!selectedImage} onClose={() => setSelectedImage(null)}>
        {selectedImage && (
          <div>
            <img src={selectedImage.url} alt={selectedImage.prompt} className="w-full h-auto rounded-lg" />
            <p className="mt-4 text-center text-gray-300">{selectedImage.prompt}</p>
          </div>
        )}
      </Modal>
      <Footer />
    </div>
  )
}