# AI Productivity Copilot 🚀

A full-stack generative AI assistant built for high-performance productivity, powered by **Amazon Nova models on AWS Bedrock**.

## 🌟 Key Features

*   **AI Chat & Reasoning**: Intelligent task planning and conversation using **Nova 2 Lite**.
*   **Voice Assistant**: Hands-free productivity commands using Web Speech API and **Nova 2 Sonic**.
*   **Document Intelligence**: Deep analysis and summary of PDF/Text files using **Nova Multimodal Embeddings**.
*   **Workflow Automation**: Simulated UI workflow execution (Nova Act style) for multi-step task handling.
*   **Modern UI**: Sleek, glassmorphic dashboard built with React, Tailwind CSS, and Framer Motion.

## 🛠️ Tech Stack

*   **Frontend**: React (Vite), Tailwind CSS, Lucide Icons, Axios.
*   **Backend**: Node.js, Express, AWS SDK (@aws-sdk/client-bedrock-runtime).
*   **Database**: MongoDB (Mongoose).
*   **AI**: Amazon Nova (Lite, Sonic, Embeddings/Act simulation).

---

## 🚀 Getting Started

### 1. Prerequisites
*   Node.js (v18+)
*   MongoDB installed and running
*   AWS Account with Bedrock access (Amazon Nova models enabled)

### 2. AWS Setup
Ensure you have access to the following Nova model IDs in Bedrock:
- `amazon.nova-lite-v1`
- `amazon.nova-sonic-v1`
- `amazon.nova-embeddings-v1`

### 3. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ai-productivity-copilot
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
NOVA_MODEL_LITE=amazon.nova-lite-v1
NOVA_MODEL_SONIC=amazon.nova-sonic-v1
NOVA_MODEL_EMBEDDING=amazon.nova-embeddings-v1
```
Start the server:
```bash
npm start
```

### 4. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 📂 Project Structure

```text
├── backend/
│   ├── controllers/    # Route controllers
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API endpoints
│   ├── services/       # Nova/AWS Bedrock logic
│   └── index.js        # Entry point
└── frontend/
    ├── src/
    │   ├── components/ # Reusable UI components
    │   ├── pages/      # Application views
    │   ├── services/   # API interaction logic
    │   └── App.jsx     # Routing & Layout
    └── tailwind.config.js
```

---

## 📝 Example Commands to Try

*   "Analyze the document and create a list of all action items."
*   "Create a study schedule for my upcoming exam based on these notes."
*   "Draft a follow-up email for the meeting we just summarized."
*   "Plan my schedule for tomorrow starting at 9 AM."

---

## 🏆 Hackathon Project
Developed for exploring the capabilities of Amazon Nova models on AWS Bedrock.
