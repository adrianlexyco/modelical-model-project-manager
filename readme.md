# Rest-API for 3d models management

This is a simple Node.js microservice application written in TypeScript and uses Express with Mongoose for MongoDB.

## Getting Started

Pre-requisites:

- Node.js v14.0.0 or later
- Yarn
- Docker and Docker Compose

## Installation

```shell
docker-compose up
```

The application will then be available at `localhost:3001`.

## Testing

Tests are written using Jest. To start tests, simply execute:

```shell
yarn test
```

## Environment Variables

The `.env` file is attached, the variables are:
 
- `PORT` - The port number that will be used to access the application.
- `DATABASE_URI` - The URI to connect to your MongoDB database.

## Sample requests

In the  `requests` folder you will find a postman exported collection to interact with the API.
