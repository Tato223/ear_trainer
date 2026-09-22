# EarTrainer

EarTrainer is a web-based ear-training application for musicians who want to
build confidence recognizing pitch, scales, intervals, and intonation. Users
can practice with focused quizzes, continue with an endless challenge, review
high scores, and access the scales and notes library.

## Features

- **Pitch Recognition** - identify a single note from its audio playback.
- **Intonation Test** - determine whether a note is flat, sharp, or in tune.
- **Major Scales** - identify a major scale from a sequence of notes.
- **Intervals** - identify the interval between two notes.
- **Endless Mode** - practice continuously across the available quiz
  categories.
- **Audio playback** - generate notes and musical sequences in the browser with
  Tone.js.
- **Accounts** - sign up, log in with token authentication, and retrieve the
  current user profile.
- **Library** - browse the scales and notes learning section.

## Technology

- **Frontend:** React, React Router, Vite, JavaScript, and TypeScript
- **Audio:** Tone.js
- **Visuals:** VexFlow
- **Backend:** Django and Django REST Framework
- **Authentication:** Django REST Framework token authentication
- **Database:** SQLite for local development

## Project Structure

```text
app/
|-- backend/
|   |-- api/                    # Users, high scores, serializers, and routes
|   |-- api_auth/               # Sign-up, login, and profile endpoints
|   |-- ear_trainer_backend/    # Django project configuration
|   `-- manage.py
|-- public/                     # Static images
|-- src/
|   |-- components/             # Shared UI components
|   |-- pages/                  # Navigation, auth, quiz, and endless pages
|   |-- audio_config.ts         # Tone.js playback helpers
|   |-- quiz_logic.ts           # Quiz question and scoring logic
|   `-- types.ts                # Quiz and music domain types
|-- package.json
`-- vite.config.js
```

## Prerequisites

- Node.js and npm
- Python 3.12 or newer

The frontend expects the Django API to be available at
`http://127.0.0.1:8000`. The development CORS configuration permits the Vite
development server at `http://localhost:5173`.

## Getting Started

### 1. Install frontend dependencies

From the `app/` directory:

```bash
npm ci
```

### 2. Set up the backend

Open a second terminal and change to the backend directory:

```bash
cd backend
python -m venv .venv
```

Activate the virtual environment:

**Windows PowerShell**

```powershell
.\.venv\Scripts\Activate.ps1
```

**macOS/Linux**

```bash
source .venv/bin/activate
```

Install the backend packages used by the project and initialize the local
database:

```bash
python -m pip install Django djangorestframework django-cors-headers
python manage.py migrate
```

Start the API:

```bash
python manage.py runserver 8000
```

### 3. Start the frontend

In the `app/` directory, start Vite:

```bash
npm run dev
```

Open the URL printed by Vite, normally
`http://localhost:5173`.

## Available Commands

Run these commands from `app/`:

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server with hot reload |
| `npm run build` | Create a production frontend build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

For backend database and administration tasks, run Django commands from
`app/backend/`, for example:

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

## API Overview

The Django API is served from port `8000` during local development.

| Method | Endpoint | Purpose | Authentication |
| --- | --- | --- | --- |
| `POST` | `/auth/signup/` | Create an account | Public |
| `POST` | `/auth/login/` | Obtain an authentication token | Public |
| `GET` | `/auth/me/` | Read the signed-in user profile | Token |
| `PATCH` | `/auth/me/` | Update the signed-in user profile | Token |
| `GET` | `/highscores/` | List high scores | Public |
| `POST` | `/highscores/` | Submit a high score | Token |
| `GET` | `/users/` | List users | Public |

For authenticated requests, include the token in the request header:

```http
Authorization: Token <your-token>
```

The Django admin is available at `/admin/` after creating a superuser.

## Development Notes

- The frontend currently uses the local API URL
  `http://127.0.0.1:8000` for authentication and leaderboard requests.
- SQLite files, virtual environments, local environment files, and build
  output are excluded by the project's `.gitignore`.
- Browser audio may require an initial user interaction before playback is
  allowed.

## Contributing

1. Create a feature branch.
2. Make focused changes that match the existing frontend and backend patterns.
3. Run `npm run lint` and `npm run build` from `app/`.
4. Run the relevant Django checks or tests from `app/backend/`.
5. Open a pull request with a clear summary of the change.
