This Story Telling App uses Text-Generation-WebUI as API.

Text-Generation-WebUI

1. Download Text-Generation-WebUI.
2. Start WebUI with API Mode : ./start_linux.sh --api
3. Select for example, openai-community-gpt2 in Model and Transformers in Model loader of Model page.
4. Check "openai" in Toggle and "api" in Save UI defaults to settings.yaml in Session page.

Story-Telling-App

1. start App : npm run dev

This React (Next.js) frontend uses the useChat hook from ai/react, which is a wrapper for Vercel AI SDK. The useChat hook internally sends requests to a backend API route when append() is called.
