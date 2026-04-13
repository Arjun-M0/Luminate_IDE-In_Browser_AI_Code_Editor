# Luminate IDE (In-Browser AI Code Editor)
Luminate IDE is a cutting-edge, web-based Integrated Development Environment (IDE) that brings the power of full-stack development and local AI directly to your browser. Built with modern web technologies, it features a complete file system, terminal, and intelligent code auto-completion powered by local language models.

## ✨ Features

- **In-Browser Execution Environment:** Run full-stack environments locally in your browser using the [WebContainer API](https://webcontainers.io/).
- **AI-Powered Code Suggestions:** Get intelligent, real-time code auto-completion (ghost text) powered by a local Ollama instance (e.g., Qwen2.5 Coder) as you pause typing.
- **Advanced Code Editor:** Features the powerful Monaco Editor, providing an authentic VS Code-like editing experience with syntax highlighting, formatting, file exploration, and more.
- **Integrated Terminal:** Full-featured terminal built with Xterm.js for running shell commands.
- **Authentication & Database:** Secure user authentication managed with Better Auth and data persistence via Prisma ORM.
- **Modern UI:** A beautiful, responsive, and customizable user interface built with modern dark-mode features using Tailwind CSS, Radix UI, and Shadcn UI components.

## 📸 Screenshots

![Luminate Playground](./public/playground.png)
*Luminate IDE featuring the Monaco Editor, WebContainer terminal, and live application preview.*

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, React 19)
- **Editor Core:** [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- **In-Browser Compute:** [WebContainer API](https://webcontainers.io/)
- **Terminal:** [Xterm.js](https://xtermjs.org/)
- **AI Backend:** Local [Ollama](https://ollama.com/) instance
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Auth & Database:** [Better Auth](https://better-auth.com/) & [Prisma](https://www.prisma.io/)

## 🚀 Getting Started

### Prerequisites

- Node.js (v20+)
- npm, yarn, or pnpm
- A running local instance of [Ollama](https://ollama.com/) with a code generation model installed (e.g., `ollama run qwen2.5-coder:7b`).

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd <project-directory>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or yarn install / pnpm install
   ```

3. **Environment Setup:**
   Create a `.env.local` file in the root directory and configure your environment variables (Database URL, Auth secrets, etc.).

   ```bash
   # Example .env variables
   DATABASE_URL="your-database-url"
   BETTER_AUTH_SECRET="your-auth-secret"
   
   # AI Suggestion Timeout Tuning
   AI_SUGGESTION_TIMEOUT_MS=60000
   NEXT_PUBLIC_AI_SUGGESTION_TIMEOUT_MS=65000
   AI_SUGGESTION_NUM_PREDICT=120
   ```
   *Note: Use higher timeout values for AI (e.g., `90000`) if your local model is slow or cold-starting.*

4. **Database Setup:**
   Generate the Prisma client and push the schema to your database.
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the IDE in action.

## 🧠 AI Configuration

The IDE connects to your local Ollama server to fetch inline code completions. Ensure Ollama is running and accessible (usually on `http://127.0.0.1:11434`). You can optimize the prompt behavior and completion settings in `app/api/code-suggestion/route.ts`.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page or submit a pull request.

## 📄 License

This project is licensed under the MIT License.
