# Bolat AI Backend

This connects Bolat Family APP to OpenAI through a private backend.

## Deploy on Render

1. Go to Render.
2. New + → Web Service.
3. Upload/connect this backend project.
4. Build command:
   npm install
5. Start command:
   npm start
6. Add Environment Variable:
   OPENAI_API_KEY = your OpenAI API key
7. Deploy.

After deployment, Render gives you a URL like:

https://bolat-ai-backend.onrender.com

In your phone app, go to:

AI Engine → Private AI Backend

Paste:

https://bolat-ai-backend.onrender.com/chat

Then save it.

## Local test

npm install
npm start

Then open:
http://localhost:3000
