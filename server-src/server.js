import express from "express";
import cors from "cors";
import upload from "./upload";

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};

const server = express();
server.use(cors(corsOptions));

server.post('/upload', upload);

const port = 3000;

server.listen(port, () => {
    console.log("Server is listening...")
});