# 🚀 Deployment

This project is deployed using:

- Frontend: Vercel  
- Backend: Railway  
- Database: MongoDB Atlas  

---

## 🔧 Backend Deployment (Railway)

**Platform:** Railway  

### Steps:
1. Push the project to GitHub  
2. Create a new project in Railway  
3. Connect your GitHub repository  
4. Set the root directory to:
   ```
   server
   ```
5. Add environment variables  
6. Deploy the backend  

---

## 🎨 Frontend Deployment (Vercel)

**Platform:** Vercel  

### Steps:
1. Import your GitHub repository into Vercel  
2. Set the root directory to:
   ```
   frontend
   ```
3. Add environment variables  
4. Deploy the frontend  

---

## 🔐 Environment Variables

### Backend (server)

| Variable | Required | Purpose |
|----------|------------|---------|
| `JWT_SECRET` | Yes | Secret for signing JWTs. |
| `MONGO_URI` | Yes | MongoDB connection string (e.g. Atlas or Railway Mongo plugin). |
| `PORT` | Optional | HTTP port; Railway often sets `PORT` automatically—use it if your app reads `process.env.PORT`. |
| `NODE_ENV` | Recommended | Set to `production` for production. |
| `CLOUDINARY_CLOUD_NAME` | Yes (if uploads used) | Cloudinary cloud name. |
| `CLOUDINARY_API_KEY` | Yes (if uploads used) | Cloudinary API key. |
| `CLOUDINARY_API_SECRET` | Yes (if uploads used) | Cloudinary API secret. |

---

### Frontend (frontend)

| Variable | Required | Purpose |
|----------|------------|---------|
| `VITE_API_URL` | Often yes in production | Public base URL of the **Railway** API

⚠️ Do not include real values in this file.

---

## 🔗 Live URLs

- Frontend Application:  
  https://your-frontend.vercel.app  

- Backend API:  
  https://your-backend.railway.app  

---

## 📸 Deployment Screenshots

### Frontend (Live Application)
![Frontend](./screenshots/frontend.png)

### Backend API Response
![Backend](./screenshots/backend.png)

### Database (MongoDB Atlas)
![Database](./screenshots/database.png)

### Deployment Dashboard
![Deployment](./screenshots/deployment.png)
