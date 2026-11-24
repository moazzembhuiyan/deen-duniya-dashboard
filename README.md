<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0F172A,50:1E3A8A,100:38BDF8&height=180&section=header&text=Deen%20in%20Dunya%20Admin&fontSize=40&fontColor=ffffff&fontAlignY=36&desc=Content%20%26%20user%20management%20dashboard&descAlignY=58&descSize=16" alt="Deen in Dunya Admin" />

<p><b>📊 Admin Dashboard</b></p>

<p>
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white" alt="shadcn/ui" />
  <img src="https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white" alt="Redux Toolkit" />
  <img src="https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white" alt="React Hook Form" />
  <img src="https://img.shields.io/badge/Recharts-22B5BF?style=for-the-badge&logo=chartdotjs&logoColor=white" alt="Recharts" />
</p>

</div>

## 📖 Overview

The admin dashboard behind the **Deen in Dunya** Islamic lifestyle & wellness app. Admins manage users and all in-app spiritual content — duas, sunnah, affirmations, moods and events — and send notifications. See also the [marketing website](https://github.com/moazzembhuiyan/deen-duniya-website).

## ✨ Key Features

### 📈 Dashboard

- Overview stats & charts
- User management

### 🕌 Content Management

- Duas
- Sunnah
- Affirmations
- Moods
- Events

### ⚙️ Admin

- Push notifications
- Settings & admin profile
- Login, forgot password, OTP verification & reset password
- JWT-based authentication

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router) · React 19 |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 · shadcn/ui (Radix UI) |
| **State & API** | Redux Toolkit · Redux Persist |
| **Forms** | React Hook Form · Zod |
| **Charts** | Recharts |
| **UI** | Lucide · Sonner · cmdk · Vaul · Embla |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
git clone https://github.com/moazzembhuiyan/deen-duniya-dashboard.git
cd deen-duniya-dashboard
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_BASE_URL=
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_BASE_URL` | Backend API base URL |

### Run

```bash
npm run dev
# open http://localhost:3000
```

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |

## 📁 Project Structure

```text
src/
├── app/
│   ├── (auth)/     # Login, OTP, password recovery
│   └── admin/      # dashboard, users, dua, sunnah, affirmations, moods, events...
├── components/     # shadcn/ui & custom components
├── redux/          # Store & APIs
└── lib/
```

---

<div align="center">

### 👨‍💻 Developed by [Moazzem Hossen Bhuiyan](https://github.com/moazzembhuiyan)

<sub>Mobile App Developer (React Native) • Web Developer</sub>

<p>
  <a href="https://github.com/moazzembhuiyan"><img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white" alt="GitHub" /></a>
  <a href="https://www.linkedin.com/in/moazzem-hossen-bhuiyan-325432331/"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
  <a href="mailto:moazzembhuiyan394@gmail.com"><img src="https://img.shields.io/badge/Email-EA4335?style=flat-square&logo=gmail&logoColor=white" alt="Email" /></a>
</p>

<sub>⭐ If you like this project, consider giving it a star!</sub>

</div>
