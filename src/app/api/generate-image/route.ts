import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { prompt } = await req.json();
  const apiKey = process.env.API_KEY;

  if (!prompt) {
    return NextResponse.json({ message: 'Prompt is required' }, { status: 400 });
  }

  try {
    const formData = new FormData();
    formData.append('prompt', prompt);
    formData.append('output_format', 'png');

    const response = await fetch('https://api.stability.ai/v2beta/stable-image/generate/core', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'image/*',
      },
      body: formData,
    });

    if (response.ok) {
      const buffer = await response.arrayBuffer();
      const base64Image = Buffer.from(buffer).toString('base64');
      const imageUrl = `data:image/png;base64,${base64Image}`;
      return NextResponse.json({ imageUrl }, { status: 200 });
    } else {
      const errorText = await response.text();
      return NextResponse.json({ error: `Failed to generate image: ${errorText}` }, { status: 500 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error calling Stable Diffusion API' }, { status: 500 });
  }
}