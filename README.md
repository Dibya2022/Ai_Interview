# NexaHire.AI

NexaHire.AI is a full-stack AI interview preparation platform that helps users practice role-based mock interviews, upload resumes for context-aware question generation, track progress, and review detailed performance reports.

The app focuses on a premium practice flow: pick a role, start an AI-guided interview, answer with voice or text, get feedback, and revisit your history and reports anytime.

## What The App Does

- Generates technical and HR mock interviews powered by AI.
- Uses uploaded resume content to create more relevant questions.
- Supports both typed and voice-based interview practice.
- Tracks interview history, scores, and recent activity.
- Provides performance reports with feedback, strengths, and areas to improve.
- Includes a credit-based pricing system for premium interview attempts.
- Offers exportable insights and downloadable PDF reports.

## Features

### Interview Experience
- Role and experience-based interview setup.
- Technical and HR interview modes.
- Resume upload and analysis before starting.
- Live interview flow with question progression.
- Draft auto-save and quick resume on the interview screen.
- Keyboard shortcut support for faster submission.

### Reports And Analytics
- Final score and performance breakdown.
- Skill-wise evaluation and feedback cards.
- Copy summary and PDF download actions.
- History tracking with filters and sorting.
- Recent activity and progress visibility.

### Product And UI
- Premium glassmorphism-inspired interface.
- Coral and teal brand palette.
- Responsive layout for desktop and mobile.
- Attractive footer, navbar, and reusable design system.
- Lazy-loaded pages for better performance.

## Tech Stack

| Layer | Tools |
| --- | --- |
| Frontend | React 19, Vite, React Router DOM, Redux Toolkit, Motion, Tailwind CSS 4, Axios |
| UI And Charts | React Icons, Recharts, react-circular-progressbar |
| Reports | jsPDF, jspdf-autotable, html2canvas |
| Backend | Node.js, Express, MongoDB, Mongoose |
| Auth And Security | JWT, Cookie Parser, CORS, dotenv |
| Payments | Razorpay |
| Uploads | Multer |
| AI And Data | OpenRouter API, Firebase |

## Screenshots

The screenshots below are included from the project assets in the client app.

### Home And Landing

<img src="client/src/assets/img1.png" alt="Home page screenshot" width="100%" />

### Interview Flow And Resume Context

<img src="client/src/assets/MM.png" alt="Mock interview preview" width="100%" />

<img src="client/src/assets/resume.png" alt="Resume upload and analysis screenshot" width="100%" />

<img src="client/src/assets/confi.png" alt="Confidence and interview coaching screenshot" width="100%" />

### Interview Modes

<img src="client/src/assets/tech.png" alt="Technical interview screenshot" width="100%" />

<img src="client/src/assets/HR.png" alt="HR interview screenshot" width="100%" />

### Reports, History, And Pricing

<img src="client/src/assets/ai-ans.png" alt="AI answer evaluation screenshot" width="100%" />

<img src="client/src/assets/pdf.png" alt="PDF report screenshot" width="100%" />

<img src="client/src/assets/history.png" alt="Interview history screenshot" width="100%" />

<img src="client/src/assets/credit.png" alt="Credits and pricing screenshot" width="100%" />

## Project Structure

```text
.
├── client
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── redux
│   │   ├── utils
│   │   └── assets
│   └── package.json
└── server
	├── controllers
	├── middlewares
	├── models
	├── routes
	├── services
	└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18 or later.
- MongoDB database.
- Razorpay account for payments.
- OpenRouter API key for AI question generation.

### Install Dependencies

```bash
cd client
npm install

cd ../server
npm install
```

### Environment Variables

Create a `.env` file in the `server` folder with:

```env
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
OPENROUTER_API_KEY=your_openrouter_api_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
PORT=8000
```

Create a `.env` file in the `client` folder with:

```env
VITE_SERVER_URL=http://localhost:8000
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
VITE_FIREBASE_APIKEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

### Run The App

Open two terminals and run:

```bash
cd server
npm run dev
```

```bash
cd client
npm run dev
```

## Available Scripts

### Client
- `npm run dev` - start the Vite dev server.
- `npm run build` - create a production build.
- `npm run lint` - run ESLint checks.
- `npm run preview` - preview the built app.

### Server
- `npm run dev` - start the Express server with nodemon.

## Key Highlights

- Interview flow designed around practice, feedback, and iteration.
- Credit and pricing system for controlled usage.
- Lazy loading used to keep the initial experience fast.
- Centralized brand styling for consistent visual identity.

## License

This project is part of the InterviewIQ / NexaHire.AI workspace. Add your preferred license here if you plan to publish it publicly.
