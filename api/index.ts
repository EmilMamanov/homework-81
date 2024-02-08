import express from 'express';
import cors from 'cors';
import mongoDb from "./mongoDb";

const app = express();
const port = 8000;

app.use(express.json());

app.use(cors());




const run = async () => {
    await mongoDb.connect();

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
};

void run();

