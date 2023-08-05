const express = require("express");
const app = express();
const redis = require("redis");
const client = redis.createClient();

const initValues = { header: 0, left: 0, right: 0, article: 0, footer: 0 };
const dataKeys = Object.keys(initValues);

// run the database
async function initDB() {
  console.log("Initializing database");
  await client.connect();
  await setInitialDataToDatabase();

  let result = await getDataFromDatabase(dataKeys);
  console.log("result = " + result);
  console.log("Database initialized");
}

async function setInitialDataToDatabase() {
  // construct an flat array for mSet
  // [key1, value1, key2, value]
  const ls = [];
  for (let i = 0; i < dataKeys.length; i++) {
    let key = dataKeys[i];
    ls.push(key); // the key
    ls.push(initValues[key].toString()); // the value
  }

  await client.mSet(ls);
}

async function getDataFromDatabase(keys) {
  let result = await client.mGet(keys);
  return result;
}

function promiseGetDataFromDatabase() {
  return new Promise(async (resolve, reject) => {
    let strValues = await getDataFromDatabase(dataKeys);
    if (strValues) {
      let numberValues = strValues.map((i) => {
        return Number(i);
      });
      // reconstruct the data object
      data = {};
      for (let i = 0; i < dataKeys.length; i++) {
        let key = dataKeys[i];
        let val = numberValues[i];
        data[key] = val;
      }
      resolve(data);
    } else {
      console.log("data not available from database");
      reject(nulll);
    }
  });
}

initDB();

app.use(express.json());

app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/data", (req, res) => {
  promiseGetDataFromDatabase().then((data) => {
    console.log(data);
    res.send(data);
  });
});

app.get("/update/:key/:value", async function (req, res) {
  console.log("req = " + req);
  console.log("req.params = " + JSON.stringify(req.params));
  res.send("update route " + req.params.key + ":" + req.params.value);
  const key = req.params.key;

  // client send http request for the new value
  let newValue = Number(req.params.value);

  // new value
  await client.set(key, newValue);

  // get value from database for testing purpose
  let resultValue = await client.get(key);
  console.log(`newValue is ${newValue}, value from database is ${resultValue}`);

  promiseGetDataFromDatabase().then((data) => {
    res.send(data);
  });
});

const port = 3000;
app.listen(port, () => {
  console.log("listening on port " + port);
});
