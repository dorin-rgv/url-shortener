# url-shortener

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
