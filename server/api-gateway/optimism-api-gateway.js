const express = require("express");
const { OptimismClient } = require("@optimism/core");

const app = express();

const apiKey = process.env.API_KEY;
const contractAddress = process.env.CONTRACT_ADDRESS;

const client = new OptimismClient({ apiKey });

app.get("/getCarDetails", async (req, res) => {
    const tokenId = req.query.tokenId;

    const carDetails = await client.contract(contractAddress).methods.getCarDetails(tokenId).call();

    res.json(carDetails);
});

app.post("/setForSale", async (req, res) => {
    const tokenId = req.body.tokenId;
    const isForSale = req.body.isForSale;
    const price = req.body.price;

    await client.contract(contractAddress).methods.setForSale(tokenId, isForSale, price).send();

    res.json({ success: true });
});

app.post("/updateCarDetails", async (req, res) => {
    const tokenId = req.body.tokenId;
    const VIN = req.body.VIN;
    const make = req.body.make;
    const model = req.body.model;
    const year = req.body.year;

    await client.contract(contractAddress).methods.updateCarDetails(tokenId, VIN, make, model, year).send();

    res.json({ success: true });
});

app.post("/purchaseCar", async (req, res) => {
    const tokenId = req.body.tokenId;

    await client.contract(contractAddress).methods.purchaseCar(tokenId).send();

    res.json({ success: true });
});

app.listen(3000);