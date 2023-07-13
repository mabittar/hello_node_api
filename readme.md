# Express NodeJs - Hello API

This is a first try if NodeJS using Express Framework

## Requirements
Ensure you have nodejs, npm and docker available in your test machine.
clone this repo and run:
```
cd hello_node_api && npm i
```

## to init redis server
```
docker run -p 6379:6379 -it redis/redis-stack-server:latest
```

## run de the server
```
npm run dev
```

## Flow
The last command you run app.js file and start the app at localhost on port 4002.

You should use any RESTapi server to make requests against the API.


### POST
endpoint: `/products`
To create a new product you should define in the body content name and price of the product

### GET
endpoint: `/products`
Should return all keys for products created at the POST step


#### GET by Id
endpoint: `/products/:id`
Using the uuid retrieved at the last step, you should retrieve the product name and value for the id used

### PUT
endpoint: `/products/:id`
In this endpoint using the product uuid you should update name and value from the product

