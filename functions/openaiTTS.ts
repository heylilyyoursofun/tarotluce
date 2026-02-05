import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';
import OpenAI from 'npm:openai';

const openai = new OpenAI({
    apiKey: Deno.env.get("OPENAI_API_KEY"),
});

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        const user = await base44.auth.me();
        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { text, voice = "alloy", model = "tts-1" } = await req.json();

        if (!text) {
            return Response.json({ error: 'Text is required' }, { status: 400 });
        }

        const mp3 = await openai.audio.speech.create({
            model: model,
            voice: voice,
            input: text,
        });

        const buffer = await mp3.arrayBuffer();
        
        // Upload to Base44 storage
        const blob = new Blob([buffer], { type: 'audio/mpeg' });
        const file = new File([blob], `speech-${Date.now()}.mp3`, { type: 'audio/mpeg' });
        
        const { file_url } = await base44.asServiceRole.integrations.Core.UploadFile({ file });

        return Response.json({ audio_url: file_url });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
});