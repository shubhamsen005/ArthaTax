# ArthaTax (TaxFiler AI Assistant)

ArthaTax is an AI-assisted tax document analysis project built with a **FastAPI backend** and a **Next.js frontend**. It allows users to upload financial documents such as Form 16, salary slips, bank statements, and related records, extract text using OCR, generate AI-based tax analysis, and continue asking tax-related follow-up questions in a chat-style interface.

## Features

- Upload financial documents
- Extract text from uploaded images using OCR
- Generate AI-powered tax summaries and analysis
- Continue asking follow-up tax questions in chat format
- Maintain session-based context for each user
- Frontend interface with login, signup, landing page, and tax assistant workspace

## Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- React Markdown
- remark-gfm

### Backend
- FastAPI
- Python
- Pytesseract
- Pillow
- python-dotenv
- Google Gemini API integration

## Project Structure
ArthaTax/
  backend/
    app/
      main.py
    requirements.txt

  frontend/
    app/
      layout.tsx
      page.tsx
      login/
        page.tsx
      signup/
        page.tsx
      taxfiler/
        page.tsx
      styles/
        globals.css
    next-env.d.ts
    package.json
    package-lock.json
    postcss.config.js
    tailwind.config.js
    tsconfig.json

## How It Works

### 1. OCR Extraction

The backend provides an endpoint that accepts an uploaded file and extracts text from the image using Tesseract OCR.

### 2. AI Tax Analysis

After text extraction, the backend sends the extracted content to a Gemini model and requests a structured Markdown-based tax report. The report includes:

* income source identification
* tax deductions and TDS details
* estimated taxable income
* suggested ITR form
* risk and compliance insights
* recommendations and summary tables

### 3. Interactive Chat

After the first analysis, users can continue chatting with the AI assistant. The backend stores session context in memory and uses it to answer follow-up queries.

### 4. Additional Document Uploads

Users can upload more documents later, and the extracted text is added to the ongoing session context.

## Available Backend Endpoints

### `GET /healthz`

Checks whether the backend is running.

### `POST /extract-text`

Uploads a file and returns extracted OCR text.

### `POST /upload-doc`

Uploads an additional document and appends its extracted text to the user session.

### `POST /analyze-text`

Accepts extracted text and returns an AI-generated tax analysis report.

### `POST /chat`

Accepts user follow-up questions and returns contextual AI responses.

## Setup Instructions

## Backend Setup

1. Go to the backend folder:

```bash
cd backend
```

2. Create a virtual environment:

```bash
python -m venv venv
```

3. Activate the environment:

### Windows

```bash
venv\Scripts\activate
```

### Mac/Linux

```bash
source venv/bin/activate
```

4. Install dependencies:

```bash
pip install -r requirements.txt
```

5. Create a `.env` file inside `backend/` and add your Gemini API key:

```env
GEMINI_API_KEY=your_api_key_here
```

6. Run the FastAPI server:

```bash
uvicorn app.main:app --reload
```

The backend should start on:

```text
http://127.0.0.1:8000
```

## Frontend Setup

1. Go to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

The frontend should start on:

```text
http://localhost:3000
```

## Environment Variables

Create a `.env` file in the backend directory and add:

```env
GEMINI_API_KEY=your_api_key_here
```

Do not upload your real `.env` file to GitHub.

## Important Notes

* The backend currently allows CORS for `http://localhost:3000` and `http://127.0.0.1:3000`
* Session memory is stored in a Python dictionary, so it is temporary and resets when the server restarts
* OCR quality depends on image clarity and Tesseract installation
* The project currently uses local browser storage for basic login state on the frontend
* Sensitive files such as `.env`, virtual environments, and build folders should not be committed

## Recommended `.gitignore`

```gitignore
.venv/
venv/
__pycache__/
*.pyc
.env
node_modules/
.next/
```

## Future Improvements

* Replace in-memory sessions with a database
* Add proper authentication
* Support PDF parsing directly
* Improve OCR preprocessing
* Add tax year selection and user profile persistence
* Deploy frontend and backend for production use
* Add better validation and error handling
* Upgrade Gemini integration to the latest maintained SDK if needed

## Author

Built as an AI-powered tax assistance project using FastAPI and Next.js.

👥 Contact

Team ArthaTax

Shubham Sen - shubham.sen2023@vitstudent.ac.in

Anshul Bhartia - anshul.bhartia2023@vitstudent.ac.in
