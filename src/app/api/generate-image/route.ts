import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { prompt } = await req.json();
  const apiKey = process.env.STABLE_DIFFUSION_API_KEY;

  if (!prompt) {
    return NextResponse.json({ message: 'Prompt is required' }, { status: 400 });
  }

  try {
    const response = await fetch('https://modelslab.com/api/v6/realtime/text2img', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "key": apiKey,
        "prompt": prompt,
        "negative_prompt": "bad quality",
        "width": "512",
        "height": "512",
        "safety_checker": false,
        "seed": null,
        "samples": 1,
        "base64": false,
        "webhook": null,
        "track_id": null
      }),
    });

    const data = await response.json();

    if (response.ok) {
      const imageUrl = data['output'];
      return NextResponse.json({ imageUrl }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error calling Stable Diffusion API' }, { status: 500 });
  }
}