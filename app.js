const express = require("express");
const { randomUUID } = require("crypto")
const redis = require('redis');

// create and connect redis client
let redisClient;

(async () => {
    redisClient = redis.createClient();

    redisClient.on("error", (error) => console.error(`Error : ${error}`));

    await redisClient.connect();
})();

// create app instance
const app = express();

app.use(express.json())

app.get("/products", async (request, response) => {
    const productIds = await redisClient.keys('*')
    return response.json(productIds)
})


app.post("/products", async (request, response) => {
    const body = request.body;
    console.log(body);

    const { name, price } = body;
    const productId = randomUUID();
    const product = {
        name,
        price,

    };
    await redisClient.set(`${productId}`, JSON.stringify(product));
    // products.push(product)
    return response.json(product)
});


app.get("/products/:id", async (request, response) => {
    const { id } = request.params;
    let result;
    const product = await redisClient.get(id)
    if (product) {
        result = JSON.parse(product)
    }
    return response.send({
        data: result,
    });
});


app.put("/products/:id", async (request, response) => {
    const { id } = request.params;
    const { name, price } = request.body;
    let result;

    const product = await redisClient.get(id)
    if (product) {
        result = JSON.parse(product);
        product = {
            name,
            price,

        };
        await redisClient.setex(`${id}`, JSON.stringify(product));
    }


    return response.send(product);

});

app.listen(4002, () => console.log("Servidor do node express rodando!"));

