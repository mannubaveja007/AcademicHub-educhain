# 🎓 Academic Hub

<div align="center">

![Academic Hub Logo](https://via.placeholder.com/800x200?text=Academic+Hub)

[![Next.js](https://img.shields.io/badge/Next.js-13.0+-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/Gemini_AI-FF5F1F?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)

**Academic Hub is a revolutionary platform for researchers to create, share, and collaborate on research papers with AI assistance.**

[Features](#-features) • [Getting Started](#-getting-started) • [Usage](#-usage) • [Technologies](#-technologies) • [Roadmap](#-roadmap) • [Contributing](#-contributing)

</div>

## ✨ Features

### 🤖 AI-Powered Paper Builder
- 📝 Step-by-step guided paper creation process
- 🧠 AI assistance for each section of your research paper
- 🔍 Real-time plagiarism detection
- 📊 Multiple export formats (PDF, DOCX, LaTeX)
- 📚 Automatic citations and references

### 🕵️ Plagiarism Detection
- ⚡ Real-time checking of AI-generated content
- 📊 Detailed similarity reports with source matching
- 🔎 Highlighted potentially plagiarized text
- 📈 Similarity score and severity classification
- 🔄 Manual checking option for existing content

### 👥 Academic Community
- 🌐 Connect with researchers in your field
- 📄 Share and discover research papers
- 🪙 Earn coins when others view, download, or cite your work
- 📊 Track paper statistics and impact metrics
- 💼 Academic career opportunities board

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0.0 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/academic-hub.git
cd academic-hub
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:
```env
NEXT_PUBLIC_API_URL=your_api_url
GOOGLE_AI_API_KEY=your_gemini_api_key
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📖 Usage

### 📝 Building a Research Paper
1. Navigate to the Paper Builder from your dashboard
2. Complete each section of your paper in the suggested order
3. Use the AI Assistant to help generate content or improve your writing
4. Check for plagiarism using the built-in detection tool
5. Save your draft regularly
6. Export your completed paper in your preferred format

### 🔍 Plagiarism Detection
The plagiarism detection system works in two ways:

1. **🤖 Automatic Detection**: Whenever AI generates content, it's automatically checked for plagiarism.
2. **👆 Manual Checking**: Use the "Check Plagiarism" button to analyze any section of your paper.

Understanding the results:
- **📊 Similarity Score**: Overall percentage of potentially plagiarized content
- **🚦 Severity Classification**:
  - 🟢 Very Low (<10%)
  - 🟡 Low (10-20%)
  - 🟠 Moderate (20-40%)
  - 🔴 High (40-60%)
  - ⚫ Very High (>60%)
- **📚 Matched Sources**: Specific sources that match your content
- **🖍️ Highlighted Text**: Sentences or passages that may be plagiarized

## 🏗️ Project Structure

```
academic-hub/
├── app/                  # Next.js app directory
│   ├── api/              # API routes
│   │   ├── mcp/          # Model Control Protocol API
│   │   ├── gemini/       # Gemini AI API
│   │   └── papers/       # Papers API
├── app/build-paper/      # Paper builder page
├── app/dashboard/        # User dashboard
├── app/explore/          # Paper exploration page
├── app/...               # Other pages
├── components/           # Reusable React components
├── lib/                  # Utility functions and libraries
├── public/               # Static assets
└── styles/               # Global styles
```

## 🛠️ Technologies

- **🖥️ Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **🧩 UI Components**: shadcn/ui
- **🤖 AI Integration**: Google Gemini AI
- **🔐 Authentication**: (To be implemented)
- **💾 Database**: (To be implemented)

## 🗺️ Roadmap

- [ ] 🔐 Implement user authentication
- [ ] 💾 Connect to a real database
- [ ] 🔍 Integrate with actual plagiarism detection APIs
- [ ] 👥 Add collaborative editing features
- [ ] 📚 Implement citation management system
- [ ] 📁 Add more export formats
- [ ] 📱 Develop mobile application

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Google Gemini AI for powering the AI assistance features
- shadcn/ui for the beautiful UI components
- Next.js team for the amazing framework

---

<div align="center">

© 2023 Academic Hub. All rights reserved.

💡 **Built with AI, for researchers, by researchers** 💡

❤️ **Made with love by Mannu Baveja** ❤️

</div>

