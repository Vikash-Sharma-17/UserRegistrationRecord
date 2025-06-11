# 🎮 Gamer Landing Platform

A full-stack web app for early user pre-registration, featuring:

- A **Next.js 14 + Tailwind CSS** frontend
- A **Django REST Framework** backend

Users can sign up with their email and Discord ID, and backend stores the data securely. Ideal for pre-launch campaigns or beta registrations.

---

## 🌐 Live Demo

> _Coming Soon_ — Stay tuned!

---

## 🧱 Tech Stack

### Frontend
- [Next.js 14](https://nextjs.org/)
- [React 18](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [PostCSS](https://postcss.org/)

### Backend
- [Django](https://www.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [CORS Headers](https://pypi.org/project/django-cors-headers/)

---

## 📦 Features

- ✅ User pre-registration form
- ✉️ Email validation
- 🎮 Collect Discord ID and referral source
- 🔐 API error handling with visual feedback
- 📈 Display total registered users (real-time from backend)

---


---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/gamer-landing.git
cd gamer-landing
```

### 2. Backend Setup (Django)
```
cd backend
python3 -m venv env
source env/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### 3. Frontend Setup (Next.js)

``` bash
cd frontend
npm install
```
Create .env.local file (if not Created):

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

then Run: 
```bash
npm run dev
```

Open http://localhost:3000

## 🔄 API Endpoints (Backend)

POST /api/register/ — Register user

GET /api/users/count/ — Get total registered user count



## 📤 Output

### Frontend 

#### Before Registration

![Screenshot 2025-06-12 001703](https://github.com/user-attachments/assets/b1e42ef6-77df-4138-bfd3-062c96967749)
![Screenshot 2025-06-12 001754](https://github.com/user-attachments/assets/34e88788-374b-41ce-86a0-3155d17aca72)

#### After Registration

![Screenshot 2025-06-12 001850](https://github.com/user-attachments/assets/277ca844-d0d3-4262-8717-35e4b0c59536)

#### Data Stored

![Screenshot 2025-06-12 002009](https://github.com/user-attachments/assets/54995f32-1735-4aa9-a976-6a0867e16a99)

