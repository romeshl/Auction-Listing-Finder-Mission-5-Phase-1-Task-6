# Intro

This app was built as the **Task 6** of **Mission 5 - Phase 1** at **Mission Ready HQ**. 

### Objective of the task
Create an API that will retrieve items that match a specified search criteria from your MongoDB instance.  You may use keyword search or optionally use generative AI to assist the search.

### Database details

* MongoDB database named **Trademe**
* Colleciton is named **Listings**.
* Fields in the **Listings** collection are: 
```
{ title: text, description: text, start_price: number, reserve_price: number }
```
* There is an **text** index in the **Listings** collection:
```
{ title: "text", description: "text" }
```
### Seed data

Seed data for the database can be added using the CLI app in the below link.

https://github.com/romeshl/CLI-for-MongoDB-Mission-5-Phase-1-Version2

### Approach
After a bit of playing around I used the **Text Search (With Text Index)** feature of **MongoDB** to complete this project. I have used React as the frontend and Express as the backend.

## Build with

* [NodeJS](https://nodejs.org/en)
* [Mongoose](https://www.npmjs.com/package/mongoose)
* [ExpressJS](https://expressjs.com/)
* [React Vite](https://vitejs.dev/)
* [Typescript](https://www.typescriptlang.org/)
* [TailWindCSS](https://tailwindcss.com/)
* [dotenv](https://www.npmjs.com/package/dotenv)


# Instructions

Use the following command to clone the repository. 
``` 
git clone https://github.com/romeshl/Auction-Listing-Finder-Mission-5-Phase-1-Task-6.git
```

### Backend

You will need to create a **.env** file inside the **Backend** folder to hold the MongoDB connection string. (Example below)

```
MONGODB_CONNECTION_STRING=mongodb://localhost:27017/trademe
PORT=3000
```

and then the following command to install backend dependencies. 
```
cd backend
npm install
```

and then the following command to start the backend server. 
```
npm start
```
### Frontend
Run the following command to install front dependencies. 
```
cd frontend
npm install
```

and then the following command to start the frontend. 
```
npm run dev
```
### Docker Compose

Alternatively you can run *docker compose* after cloning the repo to run the app.

```
docker compose up --build
```
You will need the .env file in the backend folder. Please refer [backend](#backend) seciton for more info.

Also note that you might have to modify the below section of **Compose.yml** depending on where you have your MongoDB database. The code below is used when you have your MongoDB database in your local machine.

```
    environment:
      # Use 'host.docker.internal' for Windows/Mac or the local machine IP for Linux
      - MONGODB_CONNECTION_STRING=mongodb://host.docker.internal:27017/trademe
```