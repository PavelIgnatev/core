import { MongoClient, Db } from "mongodb";
import { sendToBot } from "../helpers/sendToBot";

let db: Db;

export const DB = async () => {
  if (!db) {
    while (true) {
      try {
        const client = new MongoClient(process.env.DATABASE_URI || "");
        const connect = await client.connect();
        db = connect.db("core");
        break;
      } catch (e) {
        await sendToBot("DB not inited. Dangerous mistake. Retry.");
      }
    }
  }

  return db;
};
