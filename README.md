# User Availability Management System

## Overview

This project is a web-based application that allows users to manage their availability slots and for admins to schedule meetings based on those slots. It consists of a React frontend and an Express.js backend, with MongoDB used for data storage.

## System Architecture

- **Frontend**: Developed using React, responsible for user interactions and displaying availability slots.
- **Backend**: Developed using Express.js, responsible for API endpoints and business logic.
- **Database**: MongoDB, used to store user data, availability slots, and scheduled meetings.

## Design Choices

1. **Frontend (React)**:
   - The `UserPanel` component allows users to add, view, and delete their availability slots.
   - The user’s availability is fetched from the backend and displayed in a list.
   - A modal (currently commented out) is used for editing slots.

2. **Backend (Express.js)**:
   - API endpoints are provided for managing availability and scheduling meetings.
   - Middleware is not used for user identification; the `userId` is included directly in the URL.

3. **Database (MongoDB)**:
   - **User Schema**:
     ```js
     import mongoose from "mongoose";

     const availabilitySchema = new mongoose.Schema({
       date: { type: Date, required: true },
       slots: [
         {
           _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
           start: { type: Date, required: true },
           end: { type: Date, required: true },
           duration: { type: Number, required: true }, // in minutes
         },
       ],
     });

     const userSchema = new mongoose.Schema({
       email: { type: String, required: true, unique: true },
       role: { type: String, enum: ["admin", "user"], required: true },
       availability: [availabilitySchema],
       sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Session" }],
     });

     const User = mongoose.model("User", userSchema);
     export default User;
     ```

## Setup Instructions

### Prerequisites

- **Node.js** (v14 or later)
- **MongoDB**

### Installation

1. **Install Node.js**:
   - Download and install Node.js from the [Node.js official website](https://nodejs.org/).

2. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository


# Project Setup

## Backend Setup

1. **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2. **Install backend dependencies:**
    ```bash
    npm install
    ```

   **Backend Dependencies:**
   - `express`: Web framework for Node.js
   - `mongoose`: MongoDB object modeling tool
   - `cors`: Middleware for handling CORS
   - `dotenv`: Loads environment variables from a .env file
   - `body-parser`: Middleware for parsing incoming requests

3. **Create a `.env` file:**

   Inside the `backend` directory, create a `.env` file and add the following variables:
    ```env
    MONGO_URI=mongodb://localhost:27017/your-database
    PORT=5000
    ```
   Replace `mongodb://localhost:27017/your-database` with your MongoDB connection string.

4. **Run the backend server:**
    ```bash
    npm start
    ```
   The backend will run on [http://localhost:5000](http://localhost:5000).

## Frontend Setup

1. **Navigate to the frontend directory:**
    ```bash
    cd ../frontend
    ```

2. **Install frontend dependencies:**
    ```bash
    npm install
    ```

   **Frontend Dependencies:**
   - `react`: JavaScript library for building user interfaces
   - `axios`: Promise-based HTTP client for making HTTP requests
   - `react-dom`: Provides DOM-specific methods for React
   - `react-scripts`: Scripts and configuration used by Create React App

3. **Run the frontend:**
    ```bash
    npm run dev
    ```
   The frontend will be available at [http://localhost:3000](http://localhost:3000).

## Running the Application

To run the full stack:

1. **Start the backend (if not already running):**
    ```bash
    cd backend
    npm start
    ```

2. **Start the frontend:**
    ```bash
    cd ../frontend
    npm run dev
    ```

   You can access the application at:
   - [http://localhost:3000](http://localhost:3000) for the frontend
   - [http://localhost:5000](http://localhost:5000) for the backend API.

## Features

- **Users:** Can manage their availability by adding, viewing, and deleting slots.
- **Admins:** Can schedule meetings for users based on their availability.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

