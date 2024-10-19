# Deployment Guide

## Prerequisites

- A Linux server with the following installed:
  - [Node.js 20 LTS](https://nodejs.org/en/download/)
  - [PM2](https://pm2.keymetrics.io)
- Connection string to a [MongoDB Atlas](https://www.mongodb.com/atlas/database) database.

## Steps

### Initial Deployment
- Clone the repository to the machine.
- Create a copy of the `.sample.env` files located in both the server and client directories, and rename them to `.env`
- Fill in the `.env` files with the appropriate values.
- Run `npm install` in the `client` and `server` directories.
- Run `npm run build` in the `client` directory.
- Run `pm2 start ecosystem.config.js` in the root directory.

### Updating
- Run `git pull` in the root directory of the repository.
- Run `npm install` in the `client` and `server` directories.
- Run `npm run build` in the `client` directory.
- Run `pm2 restart ecosystem.config.js` in the root directory.