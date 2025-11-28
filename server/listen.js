import { ethers } from "ethers";
import axios from "axios";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();


const contractABI1 = JSON.parse(
    fs.readFileSync(new URL("../blockchain/abi/abi3.json", import.meta.url), "utf8")
);

const contractABI2 = JSON.parse(
    fs.readFileSync(new URL("../blockchain/abi/abi2.json", import.meta.url), "utf8")
);


const WSS_RPC = `wss://sepolia.infura.io/ws/v3/${process.env.SOCKET_KEY}`;
const PRIVATE_KEY = process.env.PRIVATE_KEY_WALLET;

// console.log(WSS_RPC);
// console.log(PRIVATE_KEY);

const CONTRACT_ADDRESS1 = "0x4b22bEF720466f3d9878d3349dcaEAdd46e1dF71";
const CONTRACT_ADDRESS2 = "0xCea32F1Fa3105DcFB31F72003A4b411Fa765a286";

const provider = new ethers.WebSocketProvider(WSS_RPC);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

const contract1 = new ethers.Contract(CONTRACT_ADDRESS1, contractABI1, provider);

function getContract() {
    return new ethers.Contract(CONTRACT_ADDRESS2, contractABI2, wallet);
}



contract1.on("GetIndex", async (id, date, type, area, payoutInRupees) => {
    try {
        console.log(
            `Event received: id=${id}, date=${date}, type=${type}, area=${area}, payout=${payoutInRupees} INR`
        );

        const jsDate = date;

        const { lat, lon } = await getLatLong(area);

        const value = await getWeatherValue(lat, lon, jsDate, type);

        const contract2 = getContract();

        const response = await fetch(
            "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch ETH price from CoinGecko");
        }

        const data = await response.json();
        const ethPriceInINR = data.ethereum.inr;

        console.log("ETH price (INR):", ethPriceInINR);


        const weiPerRupee = BigInt(Math.floor(1e18 / ethPriceInINR));
        const payoutAmountInWei = BigInt(payoutInRupees) * weiPerRupee;

        console.log("Wei per Rupee =", weiPerRupee.toString());
        console.log("Final payout in Wei =", payoutAmountInWei.toString());

        const rndvalue = Math.round(value);

        const tx = await contract2.indexData(
            rndvalue,
            id,
            payoutAmountInWei
        );

        console.log(`Transaction sent: ${tx.hash}`);

    } catch (err) {
        console.error("Error handling event:", err);
    }
});


async function getLatLong(areaName) {
    const response = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
            areaName
        )}&count=1`
    );

    const data = response.data;

    if (!data.results || data.results.length === 0) {
        throw new Error("City not found: " + areaName);
    }

    return {
        lat: data.results[0].latitude,
        lon: data.results[0].longitude
    };
}

async function getWeatherValue(lat, lon, date, type) {
    const response = await axios.get(
        `https://archive-api.open-meteo.com/v1/era5?latitude=${lat}&longitude=${lon}&start_date=${date}&end_date=${date}&daily=temperature_2m_max,rain_sum,snowfall_sum,windspeed_10m_max&timezone=auto`
    );

    const data = response.data;

    const index = data.daily.time.indexOf(date);

    if (index === -1) {
        throw new Error("Date not found in weather data: " + date);
    }

    type = Number(type);

    switch (type) {
        case 1:
            throw new Error("Daily humidity not available in Open-Meteo API");

        case 2:
            return data.daily.rain_sum[index];

        case 3:
            return data.daily.temperature_2m_max[index];

        case 4:
            return data.daily.windspeed_10m_max[index];

        case 5:
            return data.daily.snowfall_sum[index];

        default:
            throw new Error("Unknown type: " + type);
    }
}

console.log("Oracle listener running............");