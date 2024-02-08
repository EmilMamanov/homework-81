import { Db, MongoClient } from "mongodb";

let db: Db;
let client: MongoClient;

const connect = async () => {
    client = await MongoClient.connect('mongodb://127.0.0.1:27017');
    db = client.db('newdb');
};


const disconnect = async () => {
    await client.close();
}

const mongoDb = {
    connect,
    disconnect,
    getDb: () => db
};

export default mongoDb;