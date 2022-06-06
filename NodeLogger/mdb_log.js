const { MongoClient, Logger } = require("mongodb");
let MONGO_URI =
  "mongodb+srv://iqrasarwar:amat123@cluster0.nnfcqvj.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function main(client) {
  // Set debug level
  Logger.setLevel("debug");

  const db = client.db("test");

  // Run a sample command to produce logger messages
  await db.command({ hello: 1 });
}
