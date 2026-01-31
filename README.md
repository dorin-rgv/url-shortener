# url-shortener

## URL Shortener

### LIve Demo
-Frontend Application: https://url-shortener-opal-nine.vercel.app/
-Backend API: https://shortlink-drs.up.railway.app/api/urls
-GitHub Repository: https://github.com/dorin-rgv/url-shortener

A full-stack URL shortening application built with Node.js, Express, MongoDB, and React for a technical assessment.

## Features
-Shorten long URLs into 7-charactes alphanumeric codes
-Click tracking (counts how many times each shorts URL is accessed)
-Simple React UI for creating and managing shortened URLs
-URL validation to ensure only valid URLs are shortened
-MongoDB for persistent storage
-Auto-reuse existing short URLs for duplicate submissions

## Tech Stack

Backend:
-Node.js & Express.js
-nanoid for short code generation
-MongoDB  with Mongoose ODM
-valid-url for URL validation
-CORS enabled for cross-origin requests

Frontend:
-Axios for API requests
-React (functional components with hooks)
-Responsive table-based UI

Database:
-MongoDB Atlas (cloud-hosted)

##API Endpoints
POST | `/api/shorten` | Create a short URL | `{"originalUrl" : "https://..."}` |
GET | `/api/urls` | Get all shortened URLs | 
GET | `/:shortCode` | Redirect to original URL | 
DELETE | `/api/urls/:id` | Delete a shortened URL | 

## How to Run Locally

###Prerequisities
-Node.js (v14 or higher)
-MongoDB Atlas account (or MongoDB)

### Backend Setup

```bash
cd backend
npm install

# Create .env file with:
# PORT=5000
# MONGO_URI=your_mongodb_connection_string
# BASE_URL=http://localhost:5000

npm run dev

Backend will run on http://localhost:5000

##Frontend Setup

cd frontend
npm install
npm start

Frontend will run on http://localhost:3000

##The Project Structure

url-shortener/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                 # MongoDB connection
│   │   ├── models/
│   │   │   └── Url.js                # URL schema
│   │   ├── controllers/
│   │   │   └── urlController.js      # Business logic
│   │   ├── routes/
│   │   │   └── urlRoutes.js          # API routes
│   │   ├── utils/
│   │   │   └── generateCode.js       # Short code generator
│   │   └── index.js                  # Server entry point
│   ├── .env
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── App.js                    # Main React component
    │   └── index.js
    ├── public/
    └── package.json


## Key Design Decisions
1. Short Code Generation:
-Use nanoid with custom 62-character alphabet ( 0-9, a-z, A-Z ) to generate 7-character codes, which provides ~3.5 trillion possible combinations.
2. Collision Handling:
-Before creating a new URL, it is very important to check if the short codes already exists and regenerates if required.
3. URL Reuse:
-If the same original URL is submitted multiple times, then the existing short URL will be returned instead of creating duolicates to reduce redundancy.
4.Click Tracking:
-Increments click counter on each redirect to track URL popolarity.
5.Validation:
-Uses valid-url library to ensure only properly formatted URLs are accepted.
6.RESTful API:
-Clean separation between frontend and backend with standard HTTP methods.

## Testing the API
(Using Thunder Client, Postman, or curl)
###Shorten a URL
POST http://localhost:5000/api/shorten
Content-Type: application/json

{
  "originalUrl": "https://www.google.com"
}


### Get all URLs
GET http://localhost:5000/api/urls


### Test redirect
GET http://localhost:5000/{shortCode}


### Sample Response
{
  "id": "697b015d7907c1bdb538f790",
  "originalUrl": "https://www.google.com",
  "shortUrl": "http://localhost:5000/TsN1H7a",
  "clicks": 0,
  "createdAt": "2026-01-29T06:42:37.327Z"
}


### Enviroment Variables
( Create an .env file in the backend folder)
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/url-shortener
BASE_URL=http://localhost:5000

## Dependencies

### Backend
1. express - Web framework
2. mongoose - MongoDB ODM
3. nanoid - Unique ID generator
4. valid-url - URL validation
5. cors - cross-origin resource sharing
6. dotenv - Enviroment variables
7. morgan - HTTP request logger

### Frontend
1. react - UI library
2. axios - HTTP client

##Author
Dorina Sharlene
GitHub: @dorin-rgv

