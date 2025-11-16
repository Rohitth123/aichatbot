# AI Chat Application

A modern, full-stack AI chat application powered by Google Gemini AI. Built with Next.js, React, and Tailwind CSS.

## Overview

This is a fully-featured AI chat application that allows you to have conversations with Google's Gemini AI model. Features include:

- **Multi-session chat management** - Create, rename, and delete multiple chat sessions
- **Real-time messaging** - Send messages and receive AI responses instantly
- **Chat history** - All conversations are saved locally in your browser
- **Download chats** - Export your chat history as JSON
- **Responsive design** - Works seamlessly on desktop and mobile devices
- **Error handling** - Graceful error messages and timeout detection
- **Modern UI** - Built with shadcn/ui components and Tailwind CSS

## Prerequisites

Before you begin, make sure you have:

- **Node.js** 18+ installed ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- **Google Gemini API key** ([Get one here](https://ai.google.dev/))

## Setup Instructions

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/yourusername/ai-chat-application.git
cd ai-chat-application
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
# or
yarn install
\`\`\`

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

\`\`\`bash
GEMINI_API_KEY=your_gemini_api_key_here
\`\`\`

**How to get your Gemini API Key:**
1. Go to [Google AI Studio](https://ai.google.dev/)
2. Click "Get API key"
3. Create a new API key
4. Copy the key and paste it in `.env.local`

### 4. Run the Development Server

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

The application will be available at `http://localhost:3000`

## Usage

1. **Start chatting** - Open the app and type your message in the input field
2. **Create new chats** - Click the "New Chat" button in the sidebar
3. **Rename chats** - Click the three-dot menu next to a chat name to rename it
4. **Delete chats** - Use the three-dot menu to delete conversations
5. **Download history** - Click the download button to export your chat as JSON
6. **Use keyboard shortcuts**:
   - `Enter` - Send message
   - `Shift + Enter` - New line in message

## Building for Production

### Build the Application

\`\`\`bash
npm run build
\`\`\`

### Start Production Server

\`\`\`bash
npm run start
\`\`\`

## Deployment

### Deploy to Vercel (Recommended)

1. Push your repository to GitHub
2. Go to [Vercel](https://vercel.com/)
3. Click "New Project" and select your repository
4. Add environment variable: `GEMINI_API_KEY`
5. Click "Deploy"

Your app will be live in seconds!

### Deploy to Other Platforms

This is a standard Next.js application, so it can be deployed to:
- Netlify
- Heroku
- AWS Amplify
- Railway
- Digital Ocean

Refer to the [Next.js deployment documentation](https://nextjs.org/docs/deployment/static-exports) for platform-specific instructions.

## Project Structure

\`\`\`
ai-chat-application/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # Gemini API integration
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Main chat page
│   └── globals.css               # Global styles
├── components/
│   ├── chat-context.tsx          # Chat state management
│   ├── message-input.tsx         # Message input component
│   ├── message-list.tsx          # Messages display
│   ├── sidebar.tsx               # Chat sessions sidebar
│   └── ui/                       # shadcn/ui components
├── lib/
│   ├── storage.ts                # localStorage utilities
│   ├── types.ts                  # TypeScript interfaces
│   └── utils.ts                  # Helper functions
├── .env.local                    # Environment variables (create this)
└── package.json                  # Dependencies
\`\`\`

## API Route

### POST `/api/chat`

Sends a message and receives an AI response.

**Request:**
\`\`\`json
{
  "message": "What is the capital of France?",
  "conversationHistory": [
    { "role": "user", "content": "Hello" },
    { "role": "assistant", "content": "Hi there!" }
  ]
}
\`\`\`

**Response:**
\`\`\`json
{
  "response": "Paris is the capital of France."
}
\`\`\`

## Troubleshooting

### Issue: "401 Unauthorized" Error

**Solution:** 
- Check that `GEMINI_API_KEY` is correctly set in `.env.local`
- Make sure the API key is active and hasn't expired
- Regenerate the API key from [Google AI Studio](https://ai.google.dev/)

### Issue: "404 Model Not Found" Error

**Solution:**
- The Gemini model endpoint may have changed
- Check that the API is using `gemini-2.0-flash` model
- Update to the latest version of the code

### Issue: Messages Not Saving

**Solution:**
- Check browser localStorage is enabled
- Clear browser cache and refresh
- Try a different browser

### Issue: Slow Response Times

**Solution:**
- Gemini API responses may take 5-30 seconds
- Check your internet connection
- Verify Gemini API quota limits in Google Cloud Console

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | Yes | Your Google Gemini API key |

## Technologies Used

- **Framework:** [Next.js 16](https://nextjs.org/)
- **UI Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Components:** [shadcn/ui](https://ui.shadcn.com/)
- **AI Model:** [Google Gemini 2.0 Flash](https://ai.google.dev/)
- **State Management:** React Context API
- **Storage:** Browser localStorage

## Features

- ✅ Real-time AI chat with Google Gemini
- ✅ Multiple chat sessions
- ✅ Persistent chat history
- ✅ Download chat exports
- ✅ Responsive mobile design
- ✅ Error handling with user feedback
- ✅ Typing indicators
- ✅ Message timestamps
- ✅ Keyboard shortcuts
- ✅ Clean, modern UI

## Contributing

Contributions are welcome! Here's how to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review existing [GitHub Issues](https://github.com/yourusername/ai-chat-application/issues)
3. Create a new issue with details about your problem

## Resources

- [Google Gemini API Docs](https://ai.google.dev/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Guide](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)

---
